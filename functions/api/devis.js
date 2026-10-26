// Demandes de devis : envoi depuis le domaine du site (Resend, domaine authentifié SPF/DKIM).
// Variables Cloudflare Pages : RESEND_API_KEY (secret), DEVIS_TO (destinataire), DEVIS_FROM (optionnel).
// Si l'envoi échoue, on répond 503 et le navigateur bascule sur l'envoi de secours (FormSubmit).

const FIELDS = [
  ["Profil", "Profil"],
  ["Demande", "Demande"],
  ["Appareil", "Appareil"],
  ["Marque", "Marque"],
  ["Modèle", "Modèle / référence"],
  ["Description", "Panne / besoin"],
  ["Lieu", "Lieu d'intervention"],
  ["Urgence", "Urgence"],
  ["Nom", "Nom"],
  ["Établissement", "Établissement"],
  ["Téléphone", "Téléphone"],
  ["email", "E-mail"],
  ["Commune", "Commune"],
];
const MAX_PHOTO = 5 * 1024 * 1024;

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, error: "format" }, 400);
  }
  if (data.get("_honey")) return json({ ok: true }); // robot : on ignore sans rien dire

  const v = Object.fromEntries(FIELDS.map(([k]) => [k, String(data.get(k) || "").trim().slice(0, 2000)]));
  if (!v.Nom || !v.Description || !v.Commune || v["Téléphone"].replace(/\D/g, "").length < 9) {
    return json({ ok: false, error: "champs" }, 400);
  }
  if (!env.RESEND_API_KEY || !env.DEVIS_TO) return json({ ok: false, error: "config" }, 503);

  const rows = FIELDS.filter(([k]) => v[k]).map(([k, label]) => [label, v[k]]);
  const tel = v["Téléphone"].replace(/[^\d+]/g, "");
  const urgent = /^urgente/i.test(v.Urgence);
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
<p>${urgent ? '<strong style="color:#e30613">DEMANDE URGENTE</strong><br>' : ""}Nouvelle demande reçue sur le site EDM.</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([l, val]) => `<tr><td style="color:#666;vertical-align:top">${esc(l)}</td><td><strong>${esc(val).replace(/\n/g, "<br>")}</strong></td></tr>`)
    .join("")}</table>
<p><a href="tel:${esc(tel)}">Appeler ${esc(v.Nom)}</a></p></div>`;
  const text = (urgent ? "DEMANDE URGENTE\n" : "") + rows.map(([l, val]) => `${l} : ${val}`).join("\n");

  const subject = `${urgent ? "URGENT · " : ""}Devis ${v.Profil || ""} · ${v.Appareil || v.Demande || "demande"} · ${v.Commune} (${v.Nom})`;
  const payload = {
    from: env.DEVIS_FROM || "EDM Electro Dépannage Ménager <devis@edm66.fr>",
    to: env.DEVIS_TO.split(",").map((s) => s.trim()).filter(Boolean),
    subject,
    html,
    text,
  };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) payload.reply_to = v.email;

  const photo = data.get("attachment");
  if (photo && typeof photo === "object" && photo.size > 0 && photo.size <= MAX_PHOTO && /^image\//.test(photo.type)) {
    const name = String(photo.name || "photo.jpg").replace(/[^\p{L}\p{N}._\- ]/gu, "_").slice(0, 80);
    payload.attachments = [{ filename: name, content: toBase64(await photo.arrayBuffer()) }];
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) return json({ ok: false, error: "envoi", status: r.status }, 503);
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "reseau" }, 503);
  }
}
