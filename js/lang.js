/**
 * Shared i18n for Mayinab subpages.
 * Self-initialises — no inline JS required.
 *
 * Usage (pages that update title/description):
 *   <script src="js/lang.js"
 *     data-meta-en-title="Title – Mayinab"
 *     data-meta-en-desc="English description"
 *     data-meta-pt-title="Título – Mayinab"
 *     data-meta-pt-desc="Portuguese description"></script>
 *
 * Usage (pages without meta changes):
 *   <script src="js/lang.js"></script>
 */
(function () {
  var scriptEl = document.currentScript;

  var langMeta = null;
  if (scriptEl) {
    var enTitle = scriptEl.getAttribute('data-meta-en-title');
    var enDesc  = scriptEl.getAttribute('data-meta-en-desc');
    var ptTitle = scriptEl.getAttribute('data-meta-pt-title');
    var ptDesc  = scriptEl.getAttribute('data-meta-pt-desc');
    if (enTitle || ptTitle) {
      langMeta = {
        en: { title: enTitle || '', description: enDesc || '' },
        pt: { title: ptTitle || '', description: ptDesc || '' }
      };
    }
  }

  function setLang(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // Toggle data-lang content blocks
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var isActive = el.getAttribute('data-lang') === lang;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    // Inline data-en / data-pt translations (back links, footer, blog cards, etc.)
    document.querySelectorAll('[data-en][data-pt]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Toggle lang-switcher buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.textContent.trim() === lang.toUpperCase());
    });

    // Page-specific title & meta description
    if (langMeta && langMeta[lang]) {
      var m = langMeta[lang];
      if (m.title) document.title = m.title;
      if (m.description) {
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', m.description);
      }
    }

    localStorage.setItem('mayinab-lang', lang);
  }

  // Bind click handlers on lang-switcher buttons
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.textContent.trim().toLowerCase());
    });
  });

  // Auto-initialise
  var saved = localStorage.getItem('mayinab-lang');
  if (saved) {
    setLang(saved);
  } else {
    var browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
    setLang(browserLang === 'pt' ? 'pt' : 'en');
  }
})();
