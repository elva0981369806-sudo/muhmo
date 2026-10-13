// Interactive features for Meifang (AF)'s personal page

document.addEventListener('DOMContentLoaded', () => {
  // 1. Horizontal Brightness / Tone Slider (淺色粉白 ↔ 深色紅黑)
  const themeSlider = document.getElementById('theme-slider');
  const toneLightBtn = document.getElementById('tone-light-btn');
  const toneDarkBtn = document.getElementById('tone-dark-btn');
  const brandIcon = document.getElementById('brand-dynamic-icon');

  const THEME_PINK_BLACK = {
    // 淺/粉端：粉黑 (Cyber Neon Pink & Obsidian Black)
    bgGradStart: [26, 4, 18],
    bgGradMid: [12, 3, 9],
    bgGradEnd: [5, 2, 4],
    blob1: [255, 42, 133],
    blob2: [131, 24, 67],
    blob3: [244, 114, 182],
    cardBg: [18, 8, 16, 0.85],
    cardBorder: [255, 42, 133, 0.35],
    textPrimary: [255, 255, 255],
    textSecondary: [255, 77, 148],
    textMuted: [161, 161, 170],
    textLight: [226, 232, 240],
    primary: [255, 42, 133],
    primaryLight: [255, 42, 133, 0.18],
    badgeBg: [28, 8, 22, 0.92],
    badgeBorder: [255, 42, 133, 0.42],
    polaroidBg: [20, 8, 16],
    polaroidText: [241, 245, 249],
    tapeBg: [255, 42, 133, 0.72]
  };

  const THEME_RED_BLACK = {
    // 深/紅端：紅黑 (Obsidian Black & Cyber Crimson)
    bgGradStart: [30, 5, 12],
    bgGradMid: [12, 4, 7],
    bgGradEnd: [5, 2, 4],
    blob1: [225, 29, 72],
    blob2: [136, 19, 55],
    blob3: [255, 42, 95],
    cardBg: [16, 8, 12, 0.84],
    cardBorder: [225, 29, 72, 0.32],
    textPrimary: [255, 255, 255],
    textSecondary: [255, 51, 102],
    textMuted: [161, 161, 170],
    textLight: [226, 232, 240],
    primary: [255, 30, 66],
    primaryLight: [255, 30, 66, 0.16],
    badgeBg: [24, 8, 14, 0.92],
    badgeBorder: [255, 30, 66, 0.38],
    polaroidBg: [20, 8, 14],
    polaroidText: [241, 245, 249],
    tapeBg: [225, 29, 72, 0.65]
  };

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(c1, c2, t) {
    const r = Math.round(lerp(c1[0], c2[0], t));
    const g = Math.round(lerp(c1[1], c2[1], t));
    const b = Math.round(lerp(c1[2], c2[2], t));
    if (c1.length === 4 || c2.length === 4) {
      const a1 = c1[3] !== undefined ? c1[3] : 1;
      const a2 = c2[3] !== undefined ? c2[3] : 1;
      const a = (lerp(a1, a2, t)).toFixed(2);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  function applyThemeTone(percent) {
    const t = Math.max(0, Math.min(100, percent)) / 100;
    const root = document.documentElement;

    // Background Gradient
    const cStart = lerpColor(THEME_PINK_BLACK.bgGradStart, THEME_RED_BLACK.bgGradStart, t);
    const cMid = lerpColor(THEME_PINK_BLACK.bgGradMid, THEME_RED_BLACK.bgGradMid, t);
    const cEnd = lerpColor(THEME_PINK_BLACK.bgGradEnd, THEME_RED_BLACK.bgGradEnd, t);
    root.style.setProperty('--bg-gradient', `radial-gradient(circle at 50% 0%, ${cStart} 0%, ${cMid} 45%, ${cEnd} 100%)`);
    root.style.backgroundColor = cEnd;

    // Ambient Blobs
    root.style.setProperty('--bg-blob-1', lerpColor(THEME_PINK_BLACK.blob1, THEME_RED_BLACK.blob1, t));
    root.style.setProperty('--bg-blob-2', lerpColor(THEME_PINK_BLACK.blob2, THEME_RED_BLACK.blob2, t));
    root.style.setProperty('--bg-blob-3', lerpColor(THEME_PINK_BLACK.blob3, THEME_RED_BLACK.blob3, t));

    // Cards & Borders
    root.style.setProperty('--card-bg', lerpColor(THEME_PINK_BLACK.cardBg, THEME_RED_BLACK.cardBg, t));
    root.style.setProperty('--card-border', lerpColor(THEME_PINK_BLACK.cardBorder, THEME_RED_BLACK.cardBorder, t));

    // Text hierarchy
    root.style.setProperty('--text-primary', lerpColor(THEME_PINK_BLACK.textPrimary, THEME_RED_BLACK.textPrimary, t));
    root.style.setProperty('--text-secondary', lerpColor(THEME_PINK_BLACK.textSecondary, THEME_RED_BLACK.textSecondary, t));
    root.style.setProperty('--text-muted', lerpColor(THEME_PINK_BLACK.textMuted, THEME_RED_BLACK.textMuted, t));
    root.style.setProperty('--text-light', lerpColor(THEME_PINK_BLACK.textLight, THEME_RED_BLACK.textLight, t));

    // Accents & Badges
    root.style.setProperty('--primary', lerpColor(THEME_PINK_BLACK.primary, THEME_RED_BLACK.primary, t));
    root.style.setProperty('--primary-light', lerpColor(THEME_PINK_BLACK.primaryLight, THEME_RED_BLACK.primaryLight, t));
    root.style.setProperty('--badge-bg', lerpColor(THEME_PINK_BLACK.badgeBg, THEME_RED_BLACK.badgeBg, t));
    root.style.setProperty('--badge-border', lerpColor(THEME_PINK_BLACK.badgeBorder, THEME_RED_BLACK.badgeBorder, t));

    // Polaroid card
    root.style.setProperty('--polaroid-bg', lerpColor(THEME_PINK_BLACK.polaroidBg, THEME_RED_BLACK.polaroidBg, t));
    root.style.setProperty('--polaroid-text', lerpColor(THEME_PINK_BLACK.polaroidText, THEME_RED_BLACK.polaroidText, t));
    root.style.setProperty('--tape-bg', lerpColor(THEME_PINK_BLACK.tapeBg, THEME_RED_BLACK.tapeBg, t));

    // Dynamic brand icon
    if (brandIcon) {
      brandIcon.textContent = t < 0.5 ? '🌸' : '🔥';
    }

    localStorage.setItem('mf_brightness_slider', percent.toString());
  }

  // Load saved slider tone (default to 100 for Red & Black)
  const savedSliderVal = localStorage.getItem('mf_brightness_slider');
  const initialVal = savedSliderVal !== null ? parseInt(savedSliderVal, 10) : 100;
  
  if (themeSlider) {
    themeSlider.value = initialVal;
    applyThemeTone(initialVal);

    themeSlider.addEventListener('input', (e) => {
      applyThemeTone(parseInt(e.target.value, 10));
    });
  } else {
    applyThemeTone(initialVal);
  }

  // Click labels to jump directly
  if (toneLightBtn) {
    toneLightBtn.addEventListener('click', () => {
      if (themeSlider) themeSlider.value = 0;
      applyThemeTone(0);
      const rect = toneLightBtn.getBoundingClientRect();
      createFloatingEffect(rect.left + rect.width / 2, rect.top, '🌸');
    });
  }

  if (toneDarkBtn) {
    toneDarkBtn.addEventListener('click', () => {
      if (themeSlider) themeSlider.value = 100;
      applyThemeTone(100);
      const rect = toneDarkBtn.getBoundingClientRect();
      createFloatingEffect(rect.left + rect.width / 2, rect.top, '🔥');
    });
  }

  // 2. Interactive Heart Count Button
  const heartBtn = document.getElementById('heart-btn');
  const heartCountSpan = document.getElementById('heart-count');
  let count = parseInt(localStorage.getItem('mf_likes') || '52', 10);
  if (heartCountSpan) heartCountSpan.textContent = count;

  // 專屬代表圖案：骨頭 🦴、紅色愛心 ❤️、狼 🐺、火焰 🔥
  const customIcons = ['🦴', '❤️', '🐺', '🔥'];
  let iconSequenceIndex = 0;

  function getNextCustomIcon() {
    const icon = customIcons[iconSequenceIndex % customIcons.length];
    iconSequenceIndex++;
    return icon;
  }

  function getRandomCustomIcon() {
    return customIcons[Math.floor(Math.random() * customIcons.length)];
  }

  if (heartBtn) {
    heartBtn.addEventListener('click', (e) => {
      count++;
      if (heartCountSpan) heartCountSpan.textContent = count;
      localStorage.setItem('mf_likes', count.toString());

      // 點擊按鈕時噴發四種專屬圖案：紅色愛心、狼、火焰、骨頭
      const rect = heartBtn.getBoundingClientRect();
      const burstList = ['❤️', '🐺', '🔥', '🦴'];
      burstList.forEach((icon, i) => {
        setTimeout(() => {
          const offsetX = (Math.random() - 0.5) * 50;
          createFloatingEffect(rect.left + rect.width / 2 + offsetX, rect.top, icon);
        }, i * 80);
      });
    });
  }

  // 3. 點擊頁面任意位置出現：骨頭、紅色愛心、狼、火焰
  document.addEventListener('click', (e) => {
    // 避免與功能按鈕重複觸發
    if (e.target.closest('#heart-btn') || e.target.closest('.tone-slider-wrapper')) return;
    
    // 輪流產生骨頭、紅色愛心、狼、火焰
    const icon = getNextCustomIcon();
    createFloatingEffect(e.clientX, e.clientY, icon);

    // 偶爾伴隨第二顆圖案飄起
    if (Math.random() > 0.45) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 36;
        const offsetY = (Math.random() - 0.5) * 20;
        createFloatingEffect(e.clientX + offsetX, e.clientY + offsetY, getRandomCustomIcon());
      }, 70);
    }
  });

  function createFloatingEffect(x, y, icon) {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = icon;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    
    // 隨機微微傾斜，增添自然飄動感
    const randomRotate = (Math.random() - 0.5) * 36;
    el.style.setProperty('--rot', `${randomRotate}deg`);
    
    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1200);
  }
});
