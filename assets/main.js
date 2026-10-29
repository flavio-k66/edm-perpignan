(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader (the hero intro is pure CSS, triggered by body.loaded) ---------- */
  const finishLoad = () => document.body.classList.add('loaded');
  window.addEventListener('load', finishLoad);
  setTimeout(finishLoad, 1600);

  /* ---------- Nav ---------- */
  const nav = $('.nav');
  const bar = $('.sticky-bar');
  let lastY = 0;
  // Viewport height measured once (see the inline --vh script in <head>); only a width change
  // (rotation, desktop resize) updates it, so the mobile address bar never causes jumps.
  let vh = innerHeight / 100;
  let lastW = innerWidth;
  const onWidthChange = () => {
    if (innerWidth === lastW) return;
    lastW = innerWidth;
    vh = innerHeight / 100;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    updateParallax();
  };
  addEventListener('resize', onWidthChange);
  addEventListener('orientationchange', () => setTimeout(onWidthChange, 250));
  // Phones/tablets: the header never hides, so nothing moves while the browser
  // toolbar collapses or reappears. Desktop: hide on scroll down past a threshold.
  const touchLayout = matchMedia('(max-width: 860px), (hover: none)');
  const onScroll = () => {
    const y = Math.max(0, scrollY);
    nav.classList.toggle('is-scrolled', y > 40);
    if (touchLayout.matches) {
      nav.classList.remove('is-hidden');
    } else if (Math.abs(y - lastY) > 12) {
      nav.classList.toggle('is-hidden', y > lastY && y > 600 && !document.body.classList.contains('menu-open'));
      lastY = y;
    }
    if (bar) bar.classList.toggle('is-visible', y > vh * 70);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = $('.burger');
  const toggleMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    $('.mobile-menu').setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Lazy autoplay videos ---------- */
  const vio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); }
      else v.pause();
    });
  }, { rootMargin: '200px 0px' });
  $$('video[data-autoplay]').forEach(v => vio.observe(v));

  /* ---------- Reveal ---------- */
  const rio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.transitionDelay = (idx % 4) * 90 + 'ms';
      el.classList.add('is-in');
      rio.unobserve(el);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => rio.observe(el));

  /* ---------- Counters ---------- */
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, t0 = performance.now(), d = 1600;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / d);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ---------- Parallax (desktop with a mouse only) ---------- */
  // On phones, iOS momentum scrolling feeds JS in bursts and the images would jump,
  // so nothing here runs below 861px or on touch screens.
  const desktop = matchMedia('(min-width: 861px) and (hover: hover)');
  const clamp01 = v => Math.min(1, Math.max(0, v));
  // progress of `trigger` from "its top hits the viewport bottom" (0) to "its bottom leaves the top" (1)
  const through = el => { const r = el.getBoundingClientRect(); return clamp01((innerHeight - r.top) / (innerHeight + r.height)); };
  const fx = [
    ['.hero__photo img', '.hero', (el, t) => { const r = t.getBoundingClientRect(); el.style.transform = `translate3d(0,${-12 * clamp01(-r.top / r.height)}%,0)`; }],
    ['.shop__float', '.shop', (el, t) => { el.style.transform = `translate3d(0,${80 - 120 * through(t)}px,0)`; }],
    ['.expert__second', '.expert', (el, t) => { el.style.transform = `translate3d(0,${60 - 90 * through(t)}px,0)`; }],
    ['.zone__bg', '.zone', (el, t) => { el.style.transform = `scale(${1.18 - .18 * through(t)})`; }],
    ['.footer__giant', '.footer', (el, t) => { el.style.transform = `translate3d(${8 - 16 * through(t)}%,0,0)`; }]
  ].map(([sel, trig, fn]) => [$(sel), $(trig), fn]).filter(([el, t]) => el && t);
  let pxQueued = false;
  function updateParallax() {
    pxQueued = false;
    if (reduced || !desktop.matches) { fx.forEach(([el]) => (el.style.transform = '')); return; }
    fx.forEach(([el, t, fn]) => fn(el, t));
  }
  addEventListener('scroll', () => { if (!pxQueued && desktop.matches && !reduced) { pxQueued = true; requestAnimationFrame(updateParallax); } }, { passive: true });
  desktop.addEventListener('change', updateParallax);
  updateParallax();

  /* ---------- Open now ---------- */
  const openEl = $('[data-open]');
  if (openEl) {
    const parts = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const get = k => parts.find(p => p.type === k)?.value;
    const day = get('weekday'), mins = (+get('hour')) * 60 + (+get('minute'));
    const weekday = !/^(sam|dim)/i.test(day);
    const open = weekday && ((mins >= 480 && mins < 720) || (mins >= 840 && mins < 1080));
    openEl.textContent = open ? 'Ouvert en ce moment' : 'Fermé actuellement · laissez-nous une demande';
    openEl.classList.toggle('is-open', open);
  }
  $$('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- Quote form ---------- */
  const form = $('#devis-form');
  if (!form) return;
  const steps = $$('.fstep', form);
  const prog = $('.form__progress span', form);
  const count = $('.form__count b', form);
  const btnPrev = $('[data-prev]', form), btnNext = $('[data-next]', form), btnSubmit = $('[data-submit]', form);
  const err = $('.form__err', form);
  let s = 0;

  const setProfile = (val) => {
    const pro = val === 'Professionnel';
    $$('[data-group]', form).forEach(g => {
      const on = g.dataset.group === (pro ? 'pro' : 'part');
      g.hidden = !on;
      $$('input', g).forEach(i => { i.disabled = !on; if (!on) i.checked = false; });
    });
    // Demande : toujours un choix coché dans le groupe visible
    const dem = $$('input[name="Demande"]', form).filter(i => !i.disabled);
    if (!dem.some(i => i.checked)) dem[0].checked = true;
  };
  $$('input[name="Profil"]', form).forEach(r => r.addEventListener('change', () => setProfile(r.value)));
  setProfile('Particulier');

  const qs = new URLSearchParams(location.search);
  const pick = (name, test) => {
    const r = $$(`input[name="${name}"]`, form).find(i => !i.disabled && test(i.value));
    if (r) r.checked = true;
  };
  if (qs.get('profil')) {
    pick('Profil', v => v === qs.get('profil'));
    setProfile(qs.get('profil'));
  }
  if (/^(projet|installation)$/.test(qs.get('demande') || '')) pick('Demande', v => v === 'Projet');
  if (qs.get('appareil')) pick('Appareil', v => v === qs.get('appareil'));
  if (qs.get('produit')) $('#f-desc').value = 'Demande de prix : ' + qs.get('produit');

  // Clicking a pro card pre-selects "Professionnel"
  $$('[data-type="pro"]').forEach(a => a.addEventListener('click', () => {
    const r = $('input[name="Profil"][value="Professionnel"]', form);
    r.checked = true; setProfile('Professionnel');
  }));

  const go = (n) => {
    steps[s].classList.remove('is-active');
    s = n;
    steps[s].classList.add('is-active');
    prog.style.width = ((s + 1) / steps.length * 100) + '%';
    count.textContent = s + 1;
    btnPrev.hidden = s === 0;
    btnNext.hidden = s === steps.length - 1;
    btnSubmit.hidden = s !== steps.length - 1;
    err.hidden = true;
    const top = form.getBoundingClientRect().top + scrollY - 100;
    if (scrollY > top) scrollTo({ top, behavior: 'smooth' });
  };

  const validate = () => {
    let ok = true, msg = '';
    $$('.is-error', steps[s]).forEach(e => e.classList.remove('is-error'));
    if (s === 1 && !$('input[name="Appareil"]:checked', form)) { ok = false; msg = 'Choisissez le type d\'appareil.'; }
    $$('[required]', steps[s]).forEach(f => {
      if (f.type === 'radio') return;
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim();
      if (bad) { ok = false; (f.closest('.field') || f.closest('.consent'))?.classList.add('is-error'); }
    });
    const tel = $('#f-tel', steps[s]);
    if (tel && tel.value.trim() && tel.value.replace(/\D/g, '').length < 9) { ok = false; tel.closest('.field').classList.add('is-error'); msg = 'Vérifiez votre numéro de téléphone.'; }
    if (!ok) { err.textContent = msg || 'Merci de compléter les champs obligatoires.'; err.hidden = false; }
    return ok;
  };

  btnNext.addEventListener('click', () => { if (validate()) go(s + 1); });
  btnPrev.addEventListener('click', () => go(s - 1));
  form.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && s < steps.length - 1) { e.preventDefault(); btnNext.click(); }
  });

  const file = $('.upload input', form);
  file.addEventListener('change', () => {
    const up = file.closest('.upload');
    const f = file.files[0];
    if (f && f.size > 5 * 1024 * 1024) { file.value = ''; err.textContent = 'Photo trop lourde (5 Mo max).'; err.hidden = false; return; }
    up.classList.toggle('has-file', !!f);
    $('.upload__txt b', up).textContent = f ? f.name : 'Ajouter une photo';
  });

  $('input[name="_next"]', form).value = new URL('merci.html', location.href).href;

  // Sending: first through the site's own /api/devis function (Resend, Cloudflare Pages).
  // If it is unavailable (static hosting) or fails, the form is posted to FormSubmit instead.
  let sending = false;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (sending || !validate()) return;
    sending = true;
    form.classList.add('is-sending');
    btnSubmit.firstChild.textContent = 'Envoi en cours… ';
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch('api/devis', { method: 'POST', body: new FormData(form), signal: ctrl.signal });
      const out = res.headers.get('content-type')?.includes('application/json') ? await res.json() : null;
      clearTimeout(timer);
      if (res.ok && out?.ok) { location.href = 'merci.html'; return; }
      if (res.status === 400 && out?.error === 'champs') {
        err.textContent = 'Merci de vérifier votre nom, votre téléphone, votre commune et la description.';
        err.hidden = false; sending = false; form.classList.remove('is-sending');
        btnSubmit.firstChild.textContent = 'Envoyer ma demande ';
        return;
      }
    } catch { clearTimeout(timer); }
    form.submit(); // backup sender (FormSubmit), redirects to merci.html
  });
})();
