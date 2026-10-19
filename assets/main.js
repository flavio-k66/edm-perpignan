(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';

  /* ---------- Loader ---------- */
  let introDone = false;
  const finishLoad = () => {
    if (introDone) return;
    introDone = true;
    document.body.classList.add('loaded');
    heroIntro();
  };
  window.addEventListener('load', finishLoad);
  setTimeout(finishLoad, 1600);

  /* ---------- Hero intro ---------- */
  function heroIntro() {
    if (!hasGsap || reduced) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero__title .line > span', { yPercent: 110, duration: 1.4, stagger: .12 })
      .from('.hero .eyebrow', { opacity: 0, y: 20, duration: 1 }, '-=1.1')
      .from('.hero__lead', { opacity: 0, y: 24, duration: 1 }, '-=.9')
      .from('.hero__actions > *', { opacity: 0, y: 24, duration: 1, stagger: .08 }, '-=.8')
      .from('.hero__chips li', { opacity: 0, y: 16, duration: .8, stagger: .06 }, '-=.8')
      .from('.hero__photo', { clipPath: 'inset(100% 0 0 0 round 28px)', duration: 1.6, ease: 'expo.inOut' }, 0)
      .from('.hero__award', { opacity: 0, x: -30, duration: 1 }, '-=.6')
      .from('.hero__stamp', { scale: 0, rotate: -90, duration: 1.2, ease: 'back.out(1.6)' }, '-=.9');
  }

  /* ---------- Nav ---------- */
  const nav = $('.nav');
  const bar = $('.sticky-bar');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > lastY && y > 600 && !document.body.classList.contains('menu-open'));
    lastY = y;
    if (bar) bar.classList.toggle('is-visible', y > innerHeight * .7);
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

  /* ---------- Parallax (GSAP) ---------- */
  if (hasGsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.hero__photo img', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo('.shop__float', { y: 80 }, { y: -40, ease: 'none', scrollTrigger: { trigger: '.shop', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.expert__second', { y: 60 }, { y: -30, ease: 'none', scrollTrigger: { trigger: '.expert', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.zone__bg', { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.zone', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.footer__giant', { xPercent: 8 }, { xPercent: -8, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }

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
    $$('.chips[data-group]', form).forEach(g => {
      const on = g.dataset.group === (pro ? 'pro' : 'part');
      g.hidden = !on;
      $$('input', g).forEach(i => { i.disabled = !on; if (!on) i.checked = false; });
    });
  };
  $$('input[name="Profil"]', form).forEach(r => r.addEventListener('change', () => setProfile(r.value)));
  setProfile('Particulier');

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

  form.addEventListener('submit', e => {
    if (!validate()) { e.preventDefault(); return; }
    if (form.action.includes('REMPLACER_PAR_EMAIL')) {
      // Fallback until the receiving e-mail is configured: open the visitor's mail app.
      e.preventDefault();
      const data = new FormData(form);
      const lines = [];
      for (const [k, v] of data) if (!k.startsWith('_') && typeof v === 'string' && v) lines.push(`${k} : ${v}`);
      alert('Formulaire en cours de configuration. Votre demande va s\'ouvrir dans votre messagerie, vous pouvez aussi nous appeler au 04 68 59 77 81.');
      location.href = 'mailto:?subject=' + encodeURIComponent('Demande de devis EDM') + '&body=' + encodeURIComponent(lines.join('\n'));
      return;
    }
    form.classList.add('is-sending');
    btnSubmit.firstChild.textContent = 'Envoi en cours… ';
  });
})();
