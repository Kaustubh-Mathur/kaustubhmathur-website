(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Nav ---------- */
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const links = $('#navLinks');

  const closeMenu = () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('a', links).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Active link ---------- */
  const sections = ['about', 'experience', 'skills', 'projects', 'contact']
    .map(id => document.getElementById(id));
  const navAnchors = $$('a', links);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => s && spy.observe(s));

  /* ---------- Scroll-driven bits (one rAF loop) ---------- */
  const photo = $('#heroPhoto');
  const story = $('#story');
  const lit = $('#lit');

  // split statement into words
  const words = lit.textContent.trim().split(/\s+/);
  lit.textContent = '';
  const spans = words.map((w, i) => {
    const s = document.createElement('span');
    s.className = 'w';
    s.textContent = w;
    lit.appendChild(s);
    if (i < words.length - 1) lit.appendChild(document.createTextNode(' '));
    return s;
  });

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;

    nav.classList.toggle('is-scrolled', y > 8);

    if (!reduce) {
      // hero photo grows into place as you scroll
      const p = clamp(y / (vh * 0.55));
      photo.style.setProperty('--p', p.toFixed(3));

      // statement lights up word by word
      const r = story.getBoundingClientRect();
      const total = r.height - vh;
      const prog = clamp(-r.top / total);
      const upTo = Math.floor(prog * 1.15 * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < upTo));
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();

  /* ---------- Count-up numbers ---------- */
  const fmt = (n, dec) => n.toFixed(dec);
  const runCount = el => {
    const to = parseFloat(el.dataset.to);
    const dec = parseInt(el.dataset.dec || '0', 10);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + fmt(to, dec) + suf; return; }
    const dur = 1600;
    const t0 = performance.now();
    const tick = t => {
      const k = clamp((t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + fmt(to * eased, dec) + suf;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counter = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { runCount(en.target); counter.unobserve(en.target); }
    });
  }, { threshold: 0.6 });
  $$('.count').forEach(el => {
    if (!reduce) el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
    counter.observe(el);
  });

  /* ---------- Project cards: tilt on pointer, draw wave when seen ---------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    $$('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (x * 3.2).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 3.2).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }
  const seen = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); seen.unobserve(en.target); } });
  }, { threshold: 0.4 });
  $$('.project--neural').forEach(el => seen.observe(el));

  /* ---------- Contact background drifts slowly ---------- */
  const bg = $('.contact__bg');
  if (bg && !reduce) {
    const contact = $('#contact');
    addEventListener('scroll', () => {
      const r = contact.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const k = clamp(1 - r.top / innerHeight);
      bg.style.transform = `translateY(${(k * -40).toFixed(1)}px) scale(1.06)`;
    }, { passive: true });
  }

  /* ---------- Liquid glass: pointer specular + refraction on Chromium ---------- */
  document.addEventListener('pointermove', e => {
    const g = e.target.closest && e.target.closest('.glass');
    if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    g.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  const brands = (navigator.userAgentData && navigator.userAgentData.brands) || [];
  if (brands.some(b => /Chromium/i.test(b.brand))) document.documentElement.classList.add('lg-refract');

  $('#year').textContent = new Date().getFullYear();
})();
