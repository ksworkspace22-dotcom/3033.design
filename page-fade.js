/* ── Page fade transition ───────────────────────────────
   Adds a smooth fade-in on load and fade-out on navigation
   between local HTML pages. No framework dependency.
   ======================================================= */
(function () {
  const DURATION = 280; // ms
  const body = document.body;
  const html = document.documentElement;

  // ── Inject styles once ────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    html.page-fade body {
      opacity: 0;
      transition: opacity ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    html.page-fade.ready body { opacity: 1; }
    html.page-fade.leaving body { opacity: 0; }
  `;
  document.head.appendChild(style);
  html.classList.add('page-fade');

  // ── Fade in on load ──────────────────────────────────
  // Two rafs: let the browser commit the initial 0 opacity before flipping
  requestAnimationFrame(() => {
    requestAnimationFrame(() => html.classList.add('ready'));
  });

  // ── Intercept internal link clicks ───────────────────
  function isInternalHtmlLink(a) {
    if (!a || a.target === '_blank') return false;
    const href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#')) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (/^https?:/i.test(href)) {
      try {
        const u = new URL(href);
        if (u.origin !== location.origin) return false;
      } catch (e) { return false; }
    }
    // must resolve to an .html path (or end with /)
    const path = a.pathname || href.split('?')[0].split('#')[0];
    return /\.html?$/i.test(path) || path.endsWith('/');
  }

  document.addEventListener('click', function (e) {
    // ignore modified clicks (open-in-new-tab etc.)
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const a = e.target.closest && e.target.closest('a');
    if (!isInternalHtmlLink(a)) return;

    const href = a.getAttribute('href');
    // same page? don't fade
    if (a.href === location.href) return;

    e.preventDefault();
    html.classList.add('leaving');
    html.classList.remove('ready');
    setTimeout(() => { window.location.href = href; }, DURATION);
  }, true);

  // ── Back/forward cache: reset state when restored ───
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      html.classList.remove('leaving');
      html.classList.add('ready');
    }
  });
})();
