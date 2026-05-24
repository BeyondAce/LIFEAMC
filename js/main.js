/* ═══════════════════════════════════════════════════════════
   LIFEA MC - PART 1 JAVASCRIPT
   Navbar, Drawer, Particles, Server Status, Animations
   ═══════════════════════════════════════════════════════════ */

// ── SMOOTH SCROLL ENHANCEMENT ──
document.documentElement.style.scrollBehavior = 'smooth';

// Enhanced smooth scrolling for all browsers
if (CSS.supports('scroll-behavior', 'smooth')) {
  document.documentElement.style.scrollBehavior = 'smooth';
} else {
  // Polyfill for browsers that don't support smooth scroll
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 800);
});

// ── NAVBAR SCROLL WITH SMOOTH TRANSITION ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// ── MOBILE DRAWER ──
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  if (drawer.classList.contains('open')) {
    closeDrawer();
  } else {
    openDrawer();
  }
});

drawerClose?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);

// Close drawer on link click
document.querySelectorAll('.drawer a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// ── NAV SLIDING INDICATOR (Cursor-style pill) ──
function initNavIndicator() {
  const navLinksEl = document.querySelector('.nav-links');
  if (!navLinksEl) return;

  const isMobile = () => window.matchMedia('(max-width: 1024px)').matches;

  let indicator = navLinksEl.querySelector('.nav-indicator');
  if (!indicator) {
    indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    navLinksEl.prepend(indicator);
  }

  const getTrackableLinks = () =>
    [...navLinksEl.querySelectorAll('.nav-link')].filter(
      (link) => !link.classList.contains('store-link')
    );

  function moveIndicator(target) {
    if (!target || isMobile()) {
      indicator.style.opacity = '0';
      return;
    }
    const navRect = navLinksEl.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.left = `${linkRect.left - navRect.left}px`;
    indicator.style.opacity = '1';
  }

  function getActiveLink() {
    return (
      navLinksEl.querySelector('.nav-link.active:not(.store-link)') ||
      getTrackableLinks()[0]
    );
  }

  moveIndicator(getActiveLink());

  if (navLinksEl.dataset.indicatorInit === '1') return;
  navLinksEl.dataset.indicatorInit = '1';

  const trackable = getTrackableLinks();
  if (!trackable.length) return;

  trackable.forEach((link) => {
    link.addEventListener('mouseenter', () => moveIndicator(link));
    link.addEventListener('focus', () => moveIndicator(link));
  });

  navLinksEl.addEventListener('mouseleave', () => moveIndicator(getActiveLink()));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => moveIndicator(getActiveLink()), 120);
  });
}

// ── HEART PARTICLES (Canvas) ──
const canvas = document.getElementById('heartCanvas');
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = [];
  const heartSymbols = ['❤️', '💗', '💖', '💓', '💝', '🩷'];

  class Heart {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 50;
      this.size = 12 + Math.random() * 20;
      this.speed = 0.5 + Math.random() * 1.5;
      this.opacity = 0.3 + Math.random() * 0.4;
      this.symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      this.drift = (Math.random() - 0.5) * 0.5;
    }

    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -50) {
        this.y = canvas.height + 50;
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.font = `${this.size}px Arial`;
      ctx.fillText(this.symbol, this.x, this.y);
    }
  }

  // Create hearts
  for (let i = 0; i < 30; i++) {
    hearts.push(new Heart());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  // Resize canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ── MINECRAFT FLOATING SPRITES ──
(function () {
  const canvas = document.getElementById('mcCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const _ = null; // transparent

  const sprites = [
    { // Hardcore Heart (8x8)
      pixels: [
        [_,      '#dc143c','#dc143c',_,      _,      '#dc143c','#dc143c',_      ],
        ['#dc143c','#ff1744','#ff1744','#dc143c','#dc143c','#ff1744','#ff1744','#dc143c'],
        ['#dc143c','#ff1744','#ff1744','#ff1744','#ff1744','#ff1744','#ff1744','#dc143c'],
        ['#dc143c','#ff1744','#ff1744','#ff1744','#ff1744','#ff1744','#ff1744','#dc143c'],
        [_,      '#dc143c','#ff1744','#ff1744','#ff1744','#ff1744','#dc143c',_      ],
        [_,      _,      '#dc143c','#ff1744','#ff1744','#dc143c',_,      _      ],
        [_,      _,      _,      '#dc143c','#dc143c',_,      _,      _      ],
        [_,      _,      _,      _,      _,      _,      _,      _      ],
      ]
    },
    { // Creeper Face (8x8)
      pixels: [
        [_,      '#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a',_      ],
        ['#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a'],
        ['#3a9e3a','#000',   '#000',   '#3a9e3a','#3a9e3a','#000',   '#000',   '#3a9e3a'],
        ['#3a9e3a','#000',   '#000',   '#3a9e3a','#3a9e3a','#000',   '#000',   '#3a9e3a'],
        ['#3a9e3a','#3a9e3a','#3a9e3a','#000',   '#000',   '#3a9e3a','#3a9e3a','#3a9e3a'],
        ['#3a9e3a','#3a9e3a','#000',   '#000',   '#000',   '#000',   '#3a9e3a','#3a9e3a'],
        ['#3a9e3a','#3a9e3a','#000',   '#3a9e3a','#3a9e3a','#000',   '#3a9e3a','#3a9e3a'],
        [_,      '#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a','#3a9e3a',_      ],
      ]
    },
    { // Steve Face (8x8)
      pixels: [
        ['#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882'],
        ['#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882'],
        ['#c8a882','#3a2e1e','#3a2e1e','#c8a882','#c8a882','#3a2e1e','#3a2e1e','#c8a882'],
        ['#c8a882','#3a2e1e','#3a2e1e','#c8a882','#c8a882','#3a2e1e','#3a2e1e','#c8a882'],
        ['#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882'],
        ['#c8a882','#b07840','#b07840','#b07840','#b07840','#b07840','#b07840','#c8a882'],
        ['#c8a882','#c8a882','#b07840','#b07840','#b07840','#b07840','#c8a882','#c8a882'],
        ['#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882','#c8a882'],
      ]
    },
    { // Diamond Sword (8x8)
      pixels: [
        [_,      _,      _,      _,      _,      _,      '#4dd0e1',_      ],
        [_,      _,      _,      _,      _,      '#4dd0e1','#80deea',_      ],
        [_,      _,      _,      _,      '#4dd0e1','#80deea',_,      _      ],
        [_,      _,      _,      '#4dd0e1','#80deea',_,      _,      _      ],
        [_,      _,      '#4dd0e1','#80deea',_,      _,      _,      _      ],
        [_,      '#8b6914','#4dd0e1',_,      _,      _,      _,      _      ],
        ['#8b6914','#6b4710',_,      _,      _,      _,      _,      _      ],
        [_,      _,      _,      _,      _,      _,      _,      _      ],
      ]
    },
    { // TNT (8x8)
      pixels: [
        ['#e53935','#e53935','#e53935','#e53935','#e53935','#e53935','#e53935','#e53935'],
        ['#e53935','#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#e53935'],
        ['#e53935','#fff',   '#e53935','#fff',   '#e53935','#fff',   '#e53935','#e53935'],
        ['#e53935','#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#e53935'],
        ['#e53935','#fff',   '#e53935','#fff',   '#e53935','#fff',   '#e53935','#e53935'],
        ['#e53935','#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#fff',   '#e53935'],
        ['#e53935','#e53935','#e53935','#e53935','#e53935','#e53935','#e53935','#e53935'],
        ['#e53935','#e53935','#e53935','#e53935','#e53935','#e53935','#e53935','#e53935'],
      ]
    },
    { // Grass Block (8x8)
      pixels: [
        ['#5d9e3f','#6ab04c','#5d9e3f','#6ab04c','#5d9e3f','#6ab04c','#5d9e3f','#6ab04c'],
        ['#6ab04c','#5d9e3f','#6ab04c','#5d9e3f','#6ab04c','#5d9e3f','#6ab04c','#5d9e3f'],
        ['#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10'],
        ['#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914'],
        ['#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10'],
        ['#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914'],
        ['#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10'],
        ['#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914','#7a5c10','#8b6914'],
      ]
    },
  ];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawSprite(x, y, size, sprite, alpha, rotation) {
    const px = size / 8;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.imageSmoothingEnabled = false;
    sprite.pixels.forEach((row, ri) => {
      row.forEach((color, ci) => {
        if (!color) return;
        ctx.fillStyle = color;
        ctx.fillRect(
          Math.round((ci - 4) * px),
          Math.round((ri - 4) * px),
          Math.ceil(px), Math.ceil(px)
        );
      });
    });
    ctx.restore();
  }

  const items = Array.from({ length: 20 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 24 + Math.random() * 32,
    sprite: sprites[Math.floor(Math.random() * sprites.length)],
    vy: 0.2 + Math.random() * 0.45,
    vx: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.007,
    alpha: 0.13 + Math.random() * 0.17,
  }));

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    items.forEach(b => {
      b.y -= b.vy;
      b.x += b.vx;
      b.rotation += b.vr;
      if (b.y < -60) { b.y = canvas.height + 60; b.x = Math.random() * canvas.width; }
      if (b.x < -60) b.x = canvas.width + 60;
      if (b.x > canvas.width + 60) b.x = -60;
      drawSprite(b.x, b.y, b.size, b.sprite, b.alpha, b.rotation);
    });
    requestAnimationFrame(tick);
  }
  tick();
})();


function copyIP() {
  const ip = 'play.lifeamc.net';
  navigator.clipboard.writeText(ip).then(() => {
    showToast();
  }).catch(() => {
    // Fallback
    const temp = document.createElement('textarea');
    temp.value = ip;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ── SERVER STATUS ──
async function fetchServerStatus() {
  const ip = 'play.lifeamc.net';
  const statusDot = document.getElementById('statusDot');
  const statusLabel = document.getElementById('statusLabel');
  const playerCount = document.getElementById('playerCount');

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
    const data = await response.json();

    if (data.online) {
      statusDot.classList.remove('offline');
      statusLabel.textContent = 'Online';
      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? '?';
      playerCount.textContent = `${online} / ${max} players online`;
    } else {
      statusDot.classList.add('offline');
      statusLabel.textContent = 'Offline';
      playerCount.textContent = 'Server is offline';
    }
  } catch (error) {
    statusLabel.textContent = 'Unknown';
    playerCount.textContent = 'Unable to fetch status';
  }
}

// Fetch on load
fetchServerStatus();
// Refresh every 30 seconds
setInterval(fetchServerStatus, 30000);

// ── STATS COUNTER ANIMATION ──
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-num');
      counters.forEach(counter => {
        if (!counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      });
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  statsObserver.observe(statsBar);
}

// ── SMOOTH SCROLL FOR ANCHORS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ── SMOOTH SCROLL ON PAGE LOAD ──
window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
});

console.log('%c❤️ Lifea MC', 'color: #e8365d; font-size: 24px; font-weight: bold;');
console.log('%cYour heart beats here.', 'color: #888; font-size: 14px;');


// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

function updateThemeIcon(theme) {
  const icon = themeToggle?.querySelector('i');
  if (!icon) return;

  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}


// ── SCROLL ANIMATIONS WITH SMOOTH REVEAL ──
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 50);
      
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.gamemode-card, .news-card, .staff-card');
  cards.forEach(card => {
    observer.observe(card);
  });
  
  // Initialize gamemode tabs if on homepage
  initGamemodeTabs();
  initNavIndicator();
  requestAnimationFrame(() => initNavIndicator());
});

// ── GAMEMODE TABS (Homepage) ──
function initGamemodeTabs() {
  const gamemodeTabs = document.querySelectorAll('#gamemodes .store-tab');
  const gamemodeCategories = document.querySelectorAll('#gamemodes .store-category');
  
  if (gamemodeTabs.length === 0) return;
  
  gamemodeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      
      // Remove active class from all tabs
      gamemodeTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all categories
      gamemodeCategories.forEach(cat => cat.classList.remove('active'));
      
      // Show selected category
      const targetCategory = document.getElementById(category);
      if (targetCategory) {
        targetCategory.classList.add('active');
      }
    });
  });
}
