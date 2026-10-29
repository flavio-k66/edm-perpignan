// Showroom : pages catégories, fiches produits et demande de devis multi-produits
// (la demande reste dans le showroom, la sélection est gardée d'une page à l'autre).
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const data = window.EDM_CATALOGUE || { categories: [], produits: [] };
  const esc = t => String(t ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const bySlug = Object.fromEntries(data.produits.map(p => [p.slug, p]));
  const count = id => data.produits.filter(p => p.cat === id).length;

  /* ---------- Sélection (localStorage, facultatif) ---------- */
  const KEY = 'edm-demande';
  let sel = [];
  try { sel = (JSON.parse(localStorage.getItem(KEY)) || []).filter(i => bySlug[i.slug] && i.qty > 0); } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(sel)); } catch {} };

  /* ---------- Tuiles du showroom ---------- */
  $$('[data-cat-count]').forEach(el => {
    const n = count(el.dataset.catCount);
    el.textContent = n ? `${n} produit${n > 1 ? 's' : ''}` : 'Bientôt';
  });

  /* ---------- Page catégorie ---------- */
  const grid = $('#cat-produits');
  if (grid) {
    const id = new URLSearchParams(location.search).get('c');
    const cat = data.categories.find(c => c.id === id);
    if (!cat) { location.replace('showroom.html#catalogue'); return; }
    document.title = `${cat.nom} · Catalogue showroom EDM Perpignan`;
    $('#cat-title').textContent = cat.nom;
    $('#cat-crumb').textContent = cat.nom;
    $('#cat-intro').textContent = cat.intro;
    $('#cat-nav').innerHTML = data.categories.map(c =>
      `<a href="categorie.html?c=${c.id}"${c.id === id ? ' aria-current="page"' : ''}>${esc(c.nom)}</a>`).join('');
    const items = data.produits.filter(p => p.cat === id);
    grid.innerHTML = items.map(p => `
      <article class="cp${p.prix ? ' cp--prix' : ''}">
        <figure class="cp__img">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.nom)}" loading="lazy">` : `<span class="cp__noimg">${esc(p.marque)}</span>`}</figure>
        <div class="cp__body">
          <p class="cp__brand">${esc(p.marque)} · ${esc(p.reference)}</p>
          <h2 class="cp__name">${esc(p.nom)}</h2>
          <ul class="cp__points">${p.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="cp__desc">${esc(p.description)}</p>
          <div class="cp__foot">
            ${p.prix ? `<b class="cp__prix">${esc(p.prix)}</b>` : ''}
            <a class="cp__pdf" href="${esc(p.pdf)}" target="_blank" rel="noopener">Fiche technique <small>PDF</small></a>
            <button type="button" class="btn btn--red btn--sm cp__add" data-add="${esc(p.slug)}">${p.prix ? 'Demander ce produit' : 'Demander un devis'}</button>
          </div>
        </div>
      </article>`).join('');
    $('#cat-note').textContent = !items.length ? 'Les produits de cette catégorie arrivent bientôt. Appelez-nous au 04 68 59 77 81.'
      : id === 'destockage' ? 'Prix HT, dans la limite des stocks disponibles.' : '';
  }

  /* ---------- Fenêtre « Ma demande de devis » ---------- */
  const dq = document.createElement('div');
  dq.className = 'dq';
  dq.id = 'demande';
  dq.hidden = true;
  dq.innerHTML = `
    <div class="dq__backdrop" data-close></div>
    <div class="dq__panel" role="dialog" aria-modal="true" aria-labelledby="dq-title">
      <div class="dq__head">
        <h2 id="dq-title">Ma demande de devis</h2>
        <button type="button" class="dq__x" data-close aria-label="Fermer">×</button>
      </div>
      <form class="dq__form" action="https://formsubmit.co/contact@edm66.fr" method="POST" novalidate>
        <input type="hidden" name="_subject" value="Demande showroom · site EDM">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="${esc(new URL('merci.html', location.href).href)}">
        <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off">
        <input type="hidden" name="Profil" value="Professionnel">
        <input type="hidden" name="Demande" value="Showroom">
        <input type="hidden" name="Appareil">
        <input type="hidden" name="Description">
        <div class="dq__list"></div>
        <div class="dq__more">
          <span>Ajouter un autre appareil&nbsp;:</span>
          ${data.categories.map(c => `<a href="categorie.html?c=${c.id}">${esc(c.nom)}</a>`).join('')}
        </div>
        <div class="field"><textarea id="dq-msg" rows="3" placeholder=" "></textarea><label for="dq-msg">Précisions (autre appareil, quantité, délai…)</label></div>
        <div class="grid2">
          <div class="field"><input type="text" name="Nom" id="dq-nom" placeholder=" " required autocomplete="name"><label for="dq-nom">Nom et prénom *</label></div>
          <div class="field"><input type="text" name="Établissement" id="dq-etab" placeholder=" " autocomplete="organization"><label for="dq-etab">Établissement</label></div>
          <div class="field"><input type="tel" name="Téléphone" id="dq-tel" placeholder=" " required autocomplete="tel"><label for="dq-tel">Téléphone *</label></div>
          <div class="field"><input type="email" name="email" id="dq-mail" placeholder=" " autocomplete="email"><label for="dq-mail">E-mail</label></div>
          <div class="field field--full"><input type="text" name="Commune" id="dq-ville" placeholder=" " required autocomplete="address-level2"><label for="dq-ville">Commune *</label></div>
        </div>
        <label class="consent"><input type="checkbox" name="Consentement" value="Oui" required><span>J'accepte que mes données soient utilisées pour traiter ma demande. Elles ne sont jamais revendues.</span></label>
        <p class="form__err dq__err" role="alert" hidden></p>
        <button type="submit" class="btn btn--red btn--lg dq__send">Envoyer ma demande</button>
      </form>
    </div>`;
  document.body.append(dq);

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'dq-fab';
  fab.setAttribute('data-demande', '');
  document.body.append(fab);

  const list = $('.dq__list', dq);
  const form = $('form', dq);
  const err = $('.dq__err', dq);
  const label = p => `${p.nom} (réf. ${p.reference})${p.prix ? ' · ' + p.prix : ''}`;

  const render = () => {
    list.innerHTML = sel.length ? sel.map(i => {
      const p = bySlug[i.slug];
      return `<div class="dq__item">
        ${p.image ? `<img src="${esc(p.image)}" alt="">` : '<span></span>'}
        <div><b>${esc(p.nom)}</b><small>${esc(p.marque)} · ${esc(p.reference)}${p.prix ? ' · ' + esc(p.prix) : ''}</small></div>
        <div class="dq__qty" role="group" aria-label="Quantité">
          <button type="button" data-q="-1" data-slug="${esc(i.slug)}" aria-label="Retirer un">−</button>
          <span>${i.qty}</span>
          <button type="button" data-q="1" data-slug="${esc(i.slug)}" aria-label="Ajouter un">+</button>
        </div>
      </div>`;
    }).join('') : '<p class="dq__empty">Aucun appareil pour l\'instant. Choisissez des produits dans le catalogue, ou décrivez votre besoin ci-dessous.</p>';
    $('.dq__more span', dq).textContent = sel.length ? 'Ajouter un autre appareil :' : 'Parcourir le catalogue :';
    const n = sel.reduce((a, i) => a + i.qty, 0);
    fab.innerHTML = `Ma demande <b>${n}</b>`;
    fab.hidden = !n;
    $$('[data-add]').forEach(b => b.classList.toggle('is-added', sel.some(i => i.slug === b.dataset.add)));
  };

  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    dq.hidden = false;
    document.documentElement.classList.add('dq-open');
    requestAnimationFrame(() => dq.classList.add('is-open'));
    $('.dq__x', dq).focus();
  };
  const close = () => {
    dq.classList.remove('is-open');
    document.documentElement.classList.remove('dq-open');
    setTimeout(() => { dq.hidden = true; }, 300);
    lastFocus?.focus?.();
  };

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const it = sel.find(i => i.slug === add.dataset.add);
      if (!it) sel.push({ slug: add.dataset.add, qty: 1 });
      save(); render(); open();
      return;
    }
    if (e.target.closest('[data-demande]')) { e.preventDefault(); open(); return; }
    if (e.target.closest('[data-close]')) { close(); return; }
    const q = e.target.closest('[data-q]');
    if (q) {
      const it = sel.find(i => i.slug === q.dataset.slug);
      it.qty += +q.dataset.q;
      if (it.qty < 1) sel = sel.filter(i => i !== it);
      save(); render();
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !dq.hidden) close(); });
  if (location.hash === '#demande') open();

  /* ---------- Envoi : /api/devis (Resend), sinon FormSubmit ---------- */
  let sending = false;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending) return;
    const msg = $('#dq-msg', form).value.trim();
    $$('.is-error', form).forEach(el => el.classList.remove('is-error'));
    let ok = true, why = '';
    $$('[required]', form).forEach(f => {
      if (f.type === 'checkbox' ? !f.checked : !f.value.trim()) { ok = false; (f.closest('.field') || f.closest('.consent')).classList.add('is-error'); }
    });
    const tel = $('#dq-tel', form);
    if (tel.value.trim() && tel.value.replace(/\D/g, '').length < 9) { ok = false; tel.closest('.field').classList.add('is-error'); why = 'Vérifiez votre numéro de téléphone.'; }
    if (!sel.length && !msg) { ok = false; why = 'Ajoutez au moins un appareil ou décrivez votre besoin.'; }
    if (!ok) { err.textContent = why || 'Merci de compléter les champs obligatoires.'; err.hidden = false; return; }
    err.hidden = true;

    const lines = sel.map(i => `${i.qty} × ${label(bySlug[i.slug])}`);
    form.Description.value = [lines.join('\n'), msg && 'Précisions : ' + msg].filter(Boolean).join('\n\n');
    form.Appareil.value = sel.length ? bySlug[sel[0].slug].nom + (sel.length > 1 ? ` + ${sel.length - 1} autre${sel.length > 2 ? 's' : ''}` : '') : 'Showroom';

    sending = true;
    const btn = $('.dq__send', form);
    btn.textContent = 'Envoi en cours…';
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    const done = () => { sel = []; save(); };
    try {
      const res = await fetch('api/devis', { method: 'POST', body: new FormData(form), signal: ctrl.signal });
      const out = res.headers.get('content-type')?.includes('application/json') ? await res.json() : null;
      clearTimeout(timer);
      if (res.ok && out?.ok) { done(); location.href = 'merci.html'; return; }
      if (res.status === 400 && out?.error === 'champs') {
        err.textContent = 'Merci de vérifier votre nom, votre téléphone et votre commune.';
        err.hidden = false; sending = false; btn.textContent = 'Envoyer ma demande';
        return;
      }
    } catch { clearTimeout(timer); }
    done();
    form.submit(); // envoi de secours (FormSubmit), redirige vers merci.html
  });

  render();
})();
