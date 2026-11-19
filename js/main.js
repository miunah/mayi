// ═══════════════════════════════════════════════════════════════
// MAYINAB · Interactive Landing Engine
// Strict CSP safe · Zero inline scripts
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── State ───────────────────────────────────────────────────
  let currentLang = 'en';
  let heroTheme = 'light';
  let tourTab = 'chat';
  let tourDevice = 'desktop';
  let tourTheme = 'light';

  const tourScreens = {
    chat:     { desktop: '02_chat',           mobile: '02_chat' },
    study:    { desktop: '03_study',          mobile: '03_study' },
    ai:       { desktop: '04_ai_assistant',   mobile: '04_ai_assistant' },
    scribble: { desktop: '05_scribble',       mobile: '05_scribble' },
    search:   { desktop: '06_search_palette', mobile: '06_search' },
    explore:  { desktop: '07_explore',        mobile: '07_explore' },
    stats:    { desktop: '08_stats_drawer',   mobile: '08_stats_drawer' }
  };

  function getShotPath(lang, theme, device, slug, ext) {
    return `screenshots/${lang}/${theme}/${device}/${slug}.${ext}`;
  }

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
           (translations.en && translations.en[key]) || '';
  }

  const KAOMOJI_RE = /(\(ﾉ◕ヮ◕\)ﾉ\*:･ﾟ✧|\(ﾉ´ヮ`\)ﾉ\*:･ﾟ✧|ヽ\(>∀<☆\)ノ|ヽ\(◕‿◕\)ノ|o\(≧▽≦\)o|\(\^_~\)✧|\(・ω・\)ﾉ|\(´∀｀\)♡|\(´∀｀\*\)|\(☆▽☆\)|\(☆ω☆\)|\(´･ω･`\)|\(≧◡≦\)|\(｡･ω･｡\)|\(・ω・\))/g;

  function setTextWithKaomoji(el, text) {
    if (!el) return;
    if (!KAOMOJI_RE.test(text)) {
      el.textContent = text;
      return;
    }
    KAOMOJI_RE.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0;
    let m;
    while ((m = KAOMOJI_RE.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement('span');
      span.className = 'kaomoji';
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    el.textContent = '';
    el.appendChild(frag);
  }

  // ── OS Detection for Conversion Optimization ────────────────
  function detectOS() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const platform = (navigator.platform || '').toLowerCase();
    if (/android/.test(ua)) return 'android';
    if (/iphone|ipad|ipod/.test(ua)) return 'ios';
    if (/win/.test(platform) || /windows/.test(ua)) return 'windows';
    if (/mac/.test(platform) && !/iphone|ipad/.test(ua)) return 'macos';
    if (/linux/.test(platform) || /linux/.test(ua)) return 'linux';
    return 'other';
  }

  const detectedOS = detectOS();

  function applyOSPersonalization() {
    const heroPrimary = document.getElementById('heroPrimaryCta');
    const heroPrimaryLabel = document.getElementById('heroPrimaryCtaLabel');

    // Highlight matching download card
    document.querySelectorAll('.download-card[data-os]').forEach(card => {
      card.classList.toggle('recommended', card.getAttribute('data-os') === detectedOS);
    });

    if (!heroPrimary || !heroPrimaryLabel) return;

    if (detectedOS === 'android') {
      heroPrimary.href = 'https://play.google.com/store/apps/details?id=com.hamasaki.mayinab';
      heroPrimary.target = '_blank';
      heroPrimary.rel = 'noopener noreferrer';
      heroPrimary.removeAttribute('download');
      heroPrimaryLabel.textContent = t('hero.ctaAndroid');
    } else if (detectedOS === 'windows') {
      heroPrimary.href = 'https://get.microsoft.com/installer/download/9p24b4wksr2z?referrer=appbadge';
      heroPrimary.target = '_blank';
      heroPrimary.rel = 'noopener noreferrer';
      heroPrimary.removeAttribute('download');
      heroPrimaryLabel.textContent = t('hero.ctaWindows');
    } else if (detectedOS === 'linux') {
      heroPrimary.href = 'https://download.mayinab.com/Mayinab-x86_64.AppImage';
      heroPrimary.removeAttribute('target');
      heroPrimary.removeAttribute('rel');
      heroPrimary.setAttribute('download', '');
      heroPrimaryLabel.textContent = t('hero.ctaLinux');
    } else {
      heroPrimary.href = '#download';
      heroPrimary.removeAttribute('target');
      heroPrimary.removeAttribute('rel');
      heroPrimary.removeAttribute('download');
      heroPrimaryLabel.textContent = t('hero.ctaPrimary');
    }
  }

  // ── Hero Real Screenshot Updater ────────────────────────────
  function updateHeroVisuals() {
    const desktopWin = document.getElementById('heroDesktopWindow');
    const desktopSrc = document.getElementById('heroDesktopWebp');
    const desktopImg = document.getElementById('heroDesktopImg');
    const mobileSrc  = document.getElementById('heroMobileWebp');
    const mobileImg  = document.getElementById('heroMobileImg');

    if (desktopWin) {
      desktopWin.classList.toggle('is-dark', heroTheme === 'dark');
    }
    if (desktopSrc && desktopImg) {
      desktopSrc.srcset = getShotPath(currentLang, heroTheme, 'desktop', '01_home', 'webp');
      desktopImg.src    = getShotPath(currentLang, heroTheme, 'desktop', '01_home', 'png');
      desktopImg.dataset.full = getShotPath(currentLang, heroTheme, 'desktop', '01_home', 'png');
    }
    if (mobileSrc && mobileImg) {
      mobileSrc.srcset = getShotPath(currentLang, heroTheme, 'mobile', '02_chat', 'webp');
      mobileImg.src    = getShotPath(currentLang, heroTheme, 'mobile', '02_chat', 'png');
      mobileImg.dataset.full = getShotPath(currentLang, heroTheme, 'mobile', '02_chat', 'png');
    }

    document.querySelectorAll('[data-hero-theme]').forEach(btn => {
      const active = btn.getAttribute('data-hero-theme') === heroTheme;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  // ── Interactive Product Tour Updater ────────────────────────
  function updateTour() {
    const screen = tourScreens[tourTab] || tourScreens.chat;
    const slug = screen[tourDevice];

    const wrap   = document.getElementById('tourFrameWrap');
    const srcEl  = document.getElementById('tourWebp');
    const imgEl  = document.getElementById('tourImg');
    const badge  = document.getElementById('tourBadge');
    const title  = document.getElementById('tourTitle');
    const desc   = document.getElementById('tourDesc');
    const b1     = document.getElementById('tourB1');
    const b2     = document.getElementById('tourB2');
    const b3     = document.getElementById('tourB3');

    if (wrap) {
      wrap.classList.toggle('is-mobile', tourDevice === 'mobile');
    }

    if (srcEl && imgEl) {
      const pngPath  = getShotPath(currentLang, tourTheme, tourDevice, slug, 'png');
      const webpPath = getShotPath(currentLang, tourTheme, tourDevice, slug, 'webp');
      srcEl.srcset = webpPath;
      imgEl.src    = pngPath;
      imgEl.dataset.full = pngPath;
      imgEl.alt    = `${t('brand')} · ${t(`tour.${tourTab}.title`)}`;
    }

    if (badge) setTextWithKaomoji(badge, t(`tour.${tourTab}.badge`));
    if (title) setTextWithKaomoji(title, t(`tour.${tourTab}.title`));
    if (desc)  setTextWithKaomoji(desc,  t(`tour.${tourTab}.desc`));
    if (b1)    setTextWithKaomoji(b1,    t(`tour.${tourTab}.b1`));
    if (b2)    setTextWithKaomoji(b2,    t(`tour.${tourTab}.b2`));
    if (b3)    setTextWithKaomoji(b3,    t(`tour.${tourTab}.b3`));

    document.querySelectorAll('[data-tour-tab]').forEach(btn => {
      const active = btn.getAttribute('data-tour-tab') === tourTab;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    document.querySelectorAll('[data-tour-device]').forEach(btn => {
      const active = btn.getAttribute('data-tour-device') === tourDevice;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-tour-theme]').forEach(btn => {
      const active = btn.getAttribute('data-tour-theme') === tourTheme;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  // ── Language Switcher ───────────────────────────────────────
  function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isMatch = btn.textContent.trim().toLowerCase() === lang;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (!val) return;
      if (val.includes('<a ')) {
        KAOMOJI_RE.lastIndex = 0;
        el.innerHTML = val.replace(KAOMOJI_RE, '<span class="kaomoji">$1</span>');
      } else {
        setTextWithKaomoji(el, val);
      }
    });

    // Store badges
    document.querySelectorAll('.lang-img').forEach(img => {
      const src = img.getAttribute('data-img-' + lang);
      if (src) img.setAttribute('src', src);
    });

    // SEO metadata
    document.title = t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.desc'));

    updateHeroVisuals();
    updateTour();
    applyOSPersonalization();

    try {
      localStorage.setItem('mayinab-lang', lang);
    } catch (_) {}
  }

  // ── Lightbox Modal ──────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Mayinab screenshot';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  function bindActivate(el, handler) {
    if (!el) return;
    el.addEventListener('click', handler);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  // Bind zoom triggers
  const heroDesktopScreen = document.getElementById('heroDesktopScreen');
  const heroZoomBtn = document.getElementById('heroZoomBtn');
  const heroMobileOverlay = document.getElementById('heroMobileOverlay');
  const tourFrameBtn = document.getElementById('tourFrame');

  function zoomHeroDesktop() {
    const img = document.getElementById('heroDesktopImg');
    if (img) openLightbox(img.dataset.full || img.src, `Mayinab Desktop (${heroTheme})`);
  }

  bindActivate(heroDesktopScreen, zoomHeroDesktop);
  if (heroZoomBtn) heroZoomBtn.addEventListener('click', zoomHeroDesktop);
  bindActivate(heroMobileOverlay, () => {
    const img = document.getElementById('heroMobileImg');
    if (img) openLightbox(img.dataset.full || img.src, `Mayinab Mobile (${heroTheme})`);
  });
  bindActivate(tourFrameBtn, () => {
    const img = document.getElementById('tourImg');
    if (img) openLightbox(img.dataset.full || img.src, t(`tour.${tourTab}.title`));
  });

  // ── Theme & Tour Event Listeners ────────────────────────────
  document.querySelectorAll('[data-hero-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      heroTheme = btn.getAttribute('data-hero-theme');
      updateHeroVisuals();
    });
  });

  document.querySelectorAll('[data-tour-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      tourTab = btn.getAttribute('data-tour-tab');
      updateTour();
    });
  });

  document.querySelectorAll('[data-tour-device]').forEach(btn => {
    btn.addEventListener('click', () => {
      tourDevice = btn.getAttribute('data-tour-device');
      updateTour();
    });
  });

  document.querySelectorAll('[data-tour-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      tourTheme = btn.getAttribute('data-tour-theme');
      updateTour();
    });
  });

  // ── Language Switcher Buttons ───────────────────────────────
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.textContent.trim().toLowerCase());
    });
  });

  // ── Navigation Scroll, Sticky Mobile Bar & Back to Top ──────
  const nav = document.querySelector('.nav');
  const backToTop = document.getElementById('backToTop');
  const mobileStickyCta = document.getElementById('mobileStickyCta');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 16);
    if (backToTop) backToTop.classList.toggle('visible', y > 650);
    if (mobileStickyCta) mobileStickyCta.classList.toggle('visible', y > 520);
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile Menu Drawer ──────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Scroll Spy ──────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-84px 0px -55% 0px' });

    sections.forEach(s => spy.observe(s));
  }

  // ── Scroll Reveal ───────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ── FAQ Accordion ───────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── iOS & macOS Waitlist AJAX Form ──────────────────────────
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
        const res = await fetch(notifyForm.action, {
          method: 'POST',
          body: new FormData(notifyForm),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          notifyForm.classList.add('submitted');
          if (notifySuccess) notifySuccess.hidden = false;
        } else {
          btn.textContent = '✕';
          setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
        }
      } catch (_) {
        btn.textContent = '✕';
        setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 2000);
      }
    });
  }

  // ── Initialize Language & Visuals ───────────────────────────
  let initialLang = 'en';
  try {
    const saved = localStorage.getItem('mayinab-lang');
    if (saved && translations[saved]) {
      initialLang = saved;
    } else if ((navigator.language || '').toLowerCase().startsWith('pt')) {
      initialLang = 'pt';
    }
  } catch (_) {}

  setLang(initialLang);
})();
