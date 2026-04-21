/* ─────────────────────────────────────────────────────────
   theme-toggle.js
   - Reads saved theme from localStorage (default: light)
   - Applies [data-theme="light|dark"] to <html> BEFORE paint
     (inline <script src> in <head> is enough since this file
      is tiny and synchronous)
   - Injects the bottom-center Sun | Moon toggle
   ───────────────────────────────────────────────────────── */

(function () {
  var KEY = '3033_theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var theme = (saved === 'dark' || saved === 'light') ? saved : 'light';
  document.documentElement.setAttribute('data-theme', theme);

  function set(next) {
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  }

  function mount() {
    if (document.querySelector('.theme-toggle')) return;
    var wrap = document.createElement('div');
    wrap.className = 'theme-toggle';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Theme');
    wrap.innerHTML = [
      '<button type="button" class="tt-sun" aria-label="Light mode" title="Light">',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">',
          '<circle cx="12" cy="12" r="4"></circle>',
          '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>',
        '</svg>',
      '</button>',
      '<span class="tt-sep" aria-hidden="true"></span>',
      '<button type="button" class="tt-moon" aria-label="Dark mode" title="Dark">',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">',
          '<path d="M20 14.5A8 8 0 0 1 9.5 4a7.5 7.5 0 1 0 10.5 10.5z"></path>',
        '</svg>',
      '</button>'
    ].join('');
    wrap.querySelector('.tt-sun').addEventListener('click', function () { set('light'); });
    wrap.querySelector('.tt-moon').addEventListener('click', function () { set('dark'); });
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
