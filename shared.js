/* 3033 — shared chrome JS (hi-fi) */
(function () {
  const WIPE_MS = 500;
  const STORAGE_WIPE = '3033_wipein';
  const STORAGE_THEME = '3033_theme';

  /* ── Theme ──────────────────────────────────────────── */
  const savedTheme = localStorage.getItem(STORAGE_THEME) || 'light';
  document.documentElement.dataset.theme = savedTheme;

  function bindTheme() {
    const tog = document.getElementById('theme-toggle');
    if (!tog) return;
    tog.addEventListener('click', () => {
      const cur = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem(STORAGE_THEME, next);
    });
  }

  /* ── Clock ─────────────────────────────────────────── */
  let clockPaused = false;
  let frozen = '';
  function tick() {
    const c = document.getElementById('ist-clock');
    if (!c) return;
    if (clockPaused) { c.textContent = frozen; return; }
    c.textContent = new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
  }
  tick();
  setInterval(tick, 1000);
  window.pauseClock = function () {
    if (clockPaused) return;
    const c = document.getElementById('ist-clock');
    if (c) frozen = c.textContent;
    clockPaused = true;
  };
  window.resumeClock = function () { clockPaused = false; tick(); };

  /* ── Wipe ─────────────────────────────────────────── */
  const wipe = document.createElement('div');
  wipe.className = 'wipe';
  wipe.id = '__wipe';
  document.body.appendChild(wipe);

  function playExit() {
    wipe.style.transition = 'none';
    wipe.style.transform = 'translateY(0)';
    void wipe.offsetWidth;
    wipe.style.transition = '';
    wipe.classList.add('exiting');
    setTimeout(() => {
      wipe.classList.remove('exiting');
      wipe.style.transform = 'translateY(-100%)';
    }, WIPE_MS);
  }
  function playEnter(then) {
    wipe.classList.add('entering');
    setTimeout(then, WIPE_MS);
  }

  function isInternal(href) {
    if (!href) return false;
    if (href.startsWith('mailto') || href.startsWith('tel') ||
        href.startsWith('http') || href.startsWith('//') ||
        href.startsWith('#')) return false;
    return true;
  }

  function navigateWithWipe(dest) {
    sessionStorage.setItem(STORAGE_WIPE, '1');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
    playEnter(() => { window.location.href = dest; });
  }
  window.routeTo = navigateWithWipe;

  function bindLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      if (link.__wipeBound) return;
      const h = link.getAttribute('href');
      if (!isInternal(h)) return;
      link.__wipeBound = true;
      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        navigateWithWipe(this.href);
      });
    });
  }

  /* ── Cursor label ─────────────────────────────────── */
  function bindCursor() {
    if (matchMedia('(hover: none)').matches) return;
    const label = document.createElement('div');
    label.className = 'cursor-label';
    document.body.appendChild(label);
    document.addEventListener('mousemove', (e) => {
      label.style.left = e.clientX + 'px';
      label.style.top = e.clientY + 'px';
    });
    function scan() {
      document.querySelectorAll('[data-cursor]').forEach(el => {
        if (el.__cb) return;
        el.__cb = true;
        el.addEventListener('mouseenter', () => {
          label.textContent = el.dataset.cursor;
          label.classList.add('visible');
        });
        el.addEventListener('mouseleave', () => label.classList.remove('visible'));
      });
    }
    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  }

  /* ── Fade in page ─────────────────────────────────── */
  function fadeIn() {
    document.querySelectorAll('.page').forEach(p => {
      requestAnimationFrame(() => setTimeout(() => p.classList.add('visible'), 40));
    });
  }

  /* ── Global keys ──────────────────────────────────── */
  function bindKeys() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (document.activeElement.isContentEditable) return;
      if (e.key === 'Escape') {
        const here = location.pathname.split('/').pop();
        if (here !== 'index.html' && here !== '') navigateWithWipe('index.html');
      } else if (e.key === '/') {
        e.preventDefault();
        navigateWithWipe('connect.html');
      }
    });
  }

  /* ── Boot ─────────────────────────────────────────── */
  function boot() {
    bindTheme();
    bindLinks();
    bindCursor();
    bindKeys();
    if (sessionStorage.getItem(STORAGE_WIPE) === '1') {
      sessionStorage.removeItem(STORAGE_WIPE);
      playExit();
    }
    fadeIn();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
