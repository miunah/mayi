/**
 * Shared i18n for Mayinab subpages.
 *
 * Usage (pages that update title/description):
 *   <script src="js/lang.js"></script>
 *   <script>
 *     initLang({
 *       pt: { title: 'Título – Mayinab', description: '...' },
 *       en: { title: 'Title – Mayinab', description: '...' }
 *     });
 *   </script>
 *
 * Usage (pages without meta changes):
 *   <script src="js/lang.js"></script>
 *   <script>initLang();</script>
 */

function setLang(lang) {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  // Toggle data-lang content blocks
  document.querySelectorAll('[data-lang]').forEach(function (el) {
    el.classList.toggle('active', el.getAttribute('data-lang') === lang);
  });

  // Toggle lang-switcher buttons
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.textContent.trim() === lang.toUpperCase());
  });

  // Back link
  var backLink = document.getElementById('backLink');
  if (backLink) {
    backLink.textContent = lang === 'pt' ? '← Voltar ao site' : '← Back to site';
  }

  // Footer home link
  var footerHome = document.getElementById('footerHome');
  if (footerHome) {
    footerHome.textContent = lang === 'pt' ? 'Voltar ao site' : 'Back to site';
  }

  // Page-specific title & meta description
  if (window._langMeta && window._langMeta[lang]) {
    var meta = window._langMeta[lang];
    if (meta.title) document.title = meta.title;
    if (meta.description) {
      var desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', meta.description);
    }
  }

  localStorage.setItem('mayinab-lang', lang);
}

function initLang(meta) {
  if (meta) window._langMeta = meta;
  var saved = localStorage.getItem('mayinab-lang');
  if (saved) {
    setLang(saved);
  } else {
    var browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
    setLang(browserLang === 'pt' ? 'pt' : 'en');
  }
}
