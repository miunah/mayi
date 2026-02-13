// ── i18n — translations loaded from translations.js ─────────
// (translations.js must be loaded before this file)

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === lang.toUpperCase());
  });

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const t = translations[lang];
    if (t && t[key]) {
      if ((key.includes('.price') && key.includes('free')) || t[key].includes('<a ')) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update language-specific images (PNG fallback inside <picture>)
  document.querySelectorAll('.lang-img').forEach(img => {
    const src = img.getAttribute('data-img-' + lang);
    if (src) img.setAttribute('src', src);
  });

  // Update language-specific WebP sources inside <picture>
  document.querySelectorAll('.lang-source').forEach(source => {
    const srcset = source.getAttribute('data-srcset-' + lang);
    if (srcset) source.setAttribute('srcset', srcset);
  });

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (lang === 'pt') {
    metaDesc.setAttribute('content', 'Mayinab: Anotações de estudo reinventadas como chat. Flashcards com repetição espaçada, Markdown + LaTeX, 100% offline, sem anúncios. Grátis para Android, iOS, Linux, macOS e Windows.');
  } else {
    metaDesc.setAttribute('content', 'Mayinab: Study notes reimagined as chat. Flashcards with spaced repetition, Markdown + LaTeX, 100% offline, no ads. Free for Android, iOS, Linux, macOS & Windows.');
  }

  localStorage.setItem('mayinab-lang', lang);
}

// ── Navigation scroll effect ─────────────────────────────────
const nav = document.querySelector('.nav');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 600);
});

// ── Back to top button ───────────────────────────────────────────
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Mobile navigation toggle ─────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Scroll reveal animations ─────────────────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const hash = href.includes('#') ? '#' + href.split('#')[1] : href;
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Screenshot skeleton loading ─────────────────────────────────
document.querySelectorAll('.screenshot-item picture').forEach(pic => {
  const img = pic.querySelector('img');
  if (img && img.complete && img.naturalWidth > 0) {
    pic.classList.add('loaded');
  } else if (img) {
    img.addEventListener('load', () => pic.classList.add('loaded'));
  }
});

// ── Initialize language from storage ─────────────────────────
const savedLang = localStorage.getItem('mayinab-lang');
if (savedLang && translations[savedLang]) {
  setLang(savedLang);
} else {
  // Auto-detect browser language
  const browserLang = navigator.language.slice(0, 2);
  if (browserLang === 'pt') {
    setLang('pt');
  }
}

// ── Scroll spy — highlight active nav link ───────────────────
const navSections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (navSections.length && navAnchors.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          const href = a.getAttribute('href');
          a.classList.toggle('active', href === '#' + id);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

  navSections.forEach(sec => spyObserver.observe(sec));
}

// ── Table scroll hint ────────────────────────────────────────
const tableWrapper = document.querySelector('.comparison-table-wrapper');
if (tableWrapper) {
  const checkScroll = () => {
    const canScroll = tableWrapper.scrollWidth > tableWrapper.clientWidth;
    const scrolledToEnd = tableWrapper.scrollLeft + tableWrapper.clientWidth >= tableWrapper.scrollWidth - 2;
    tableWrapper.classList.toggle('can-scroll', canScroll && !scrolledToEnd);
  };
  checkScroll();
  tableWrapper.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('resize', checkScroll, { passive: true });
}

// ── Notify Me form (AJAX submit) ─────────────────────────────
const notifyForm = document.getElementById('notifyForm');
const notifySuccess = document.getElementById('notifySuccess');

if (notifyForm) {
  notifyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = notifyForm.querySelector('.notify-btn');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '...';

    try {
      const data = new FormData(notifyForm);
      const res = await fetch(notifyForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        notifyForm.classList.add('submitted');
        notifySuccess.hidden = false;
      } else {
        btn.textContent = '❌';
        setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
      }
    } catch {
      btn.textContent = '❌';
      setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
    }
  });
}
