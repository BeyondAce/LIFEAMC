/* ═══════════════════════════════════════════════════════════
   LIFEA MC - PART 1 JAVASCRIPT
   Navbar, Drawer, Particles, Server Status, Animations
   ═══════════════════════════════════════════════════════════ */

// ── ULTRA-SMOOTH SCROLLING ENGINE ──
// Custom smooth scroll with eased animation for all browsers
(function() {
  // Check if native smooth scroll is supported
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  
  if (!supportsNativeSmoothScroll) {
    // Polyfill for browsers without native smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          smoothScrollTo(target, 800);
        }
      });
    });
  }

  // Smooth scroll animation function
  function smoothScrollTo(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 72;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
  }
})();

// ── SMOOTH SCROLL FOR ANCHORS (with native enhancement) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 72;
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
    }, 150);
  }
});

// ── PERFORMANCE-OPTIMIZED SCROLL LISTENER ──
const navbar = document.getElementById('navbar');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, 800);
});

// ── MOBILE DRAWER ──
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

hamburger?.setAttribute('aria-expanded', 'false');
hamburger?.setAttribute('aria-controls', 'drawer');
drawer?.setAttribute('aria-hidden', 'true');

function openDrawer() {
  if (!drawer || !drawerOverlay || !hamburger) return;
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
  hamburger?.setAttribute('aria-expanded', 'true');
  drawer?.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  if (!drawer || !drawerOverlay || !hamburger) return;
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
  hamburger?.setAttribute('aria-expanded', 'false');
  drawer?.setAttribute('aria-hidden', 'true');
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
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && drawer?.classList.contains('open')) closeDrawer();
});

// Close drawer on link click
document.querySelectorAll('.drawer a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// ── NAVIGATION DROPDOWNS ──
// Works with a mouse, touch, and keyboard instead of relying on hover alone.
const navDropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');

function closeNavDropdowns(except = null) {
  navDropdownTriggers.forEach(trigger => {
    const item = trigger.closest('.nav-item');
    if (item && item !== except) {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

navDropdownTriggers.forEach((trigger, index) => {
  const item = trigger.closest('.nav-item');
  const menu = item?.querySelector('.dropdown-menu');
  if (!item || !menu) return;
  menu.id ||= `nav-dropdown-${index + 1}`;
  trigger.setAttribute('aria-controls', menu.id);

  trigger.addEventListener('click', event => {
    event.stopPropagation();
    const willOpen = !item.classList.contains('is-open');
    closeNavDropdowns(item);
    item.classList.toggle('is-open', willOpen);
    trigger.setAttribute('aria-expanded', String(willOpen));
  });

  trigger.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeNavDropdowns();
      trigger.focus();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      menu.querySelector('a, button')?.focus();
    }
  });

  item.addEventListener('mouseleave', () => {
    if (window.matchMedia('(hover: hover)').matches) closeNavDropdowns();
  });
});

document.addEventListener('click', () => closeNavDropdowns());
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeNavDropdowns();
});

// ── NAV SLIDING INDICATOR (Cursor-style pill) ──
// DISABLED: This was causing nav links to tilt/shift on hover
function initNavIndicator() {
  // Commented out to prevent tilting issue
}

// ── BACKGROUND EFFECTS ──
// Using lightweight CSS-only floating particles (#bgParticles)
// Minecraft sprites canvas kept for atmosphere

// ── MINECRAFT FLOATING SPRITES ──
(function () {
  const canvas = document.getElementById('mcCanvas');
  // The site now uses the CSS background, so never spend a frame on a hidden canvas.
  if (!canvas || getComputedStyle(canvas).display === 'none') return;
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

  const items = Array.from({ length: 12 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 20 + Math.random() * 24,
    sprite: sprites[Math.floor(Math.random() * sprites.length)],
    vy: 0.12 + Math.random() * 0.25,
    vx: (Math.random() - 0.5) * 0.15,
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.003,
    alpha: 0.08 + Math.random() * 0.1,
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
  const ip = 'play.lifeamc.fun';
  const copy = navigator.clipboard?.writeText
    ? navigator.clipboard.writeText(ip)
    : Promise.reject(new Error('Clipboard API unavailable'));
  copy.then(() => {
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
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ── SERVER STATUS & UPTIME TRACKING ──
const UPTIME_STORAGE_KEY = 'lifeamc_uptime_data';

function getUptimeData() {
  try {
    const stored = localStorage.getItem(UPTIME_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Validate data structure
      if (data && typeof data.total === 'number' && typeof data.up === 'number') {
        return data;
      }
    }
  } catch (e) {}
  return { total: 0, up: 0 };
}

function saveUptimeData(data) {
  try {
    localStorage.setItem(UPTIME_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function updateUptimeDisplay() {
  const uptimeEl = document.querySelector('.stat-num[data-target="99"]');
  if (!uptimeEl) return;
  
  const data = getUptimeData();
  const percentage = data.total > 0 ? Math.round((data.up / data.total) * 100) : 99;
  uptimeEl.textContent = percentage;
  uptimeEl.setAttribute('data-target', percentage);
}

async function fetchServerStatus() {
  const ip = 'play.lifeamc.fun';
  const statusDot = document.getElementById('statusDot');
  const statusLabel = document.getElementById('statusLabel');
  const playerCount = document.getElementById('playerCount');

  if (!statusDot || !statusLabel || !playerCount) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Status request failed: ${response.status}`);
    const data = await response.json();

    // Track uptime
    const uptimeData = getUptimeData();
    uptimeData.total++;
    
    if (data.online) {
      uptimeData.up++;
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
    
    saveUptimeData(uptimeData);
    updateUptimeDisplay();
  } catch (error) {
    statusLabel.textContent = 'Unknown';
    playerCount.textContent = 'Unable to fetch status';
    
    // Track fetch failure as potential downtime
    const uptimeData = getUptimeData();
    uptimeData.total++;
    saveUptimeData(uptimeData);
    updateUptimeDisplay();
  } finally {
    clearTimeout(timeout);
  }
}

// Fetch on load
fetchServerStatus();
// Refresh every 30 seconds
setInterval(fetchServerStatus, 30000);

// ── DISCORD MEMBER COUNT ──
async function fetchDiscordMembers() {
  const countEl = document.getElementById('discordMemberCount');
  if (!countEl) return;

  try {
    // Discord API invites endpoint with CORS support
    const inviteCode = '3aabgt7Bfq';
    const response = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);
    const data = await response.json();
    
    let count = 0;
    // Handle both direct response and possible CORS proxy wrappers
    if (data) {
      if (data.approximate_member_count) {
        count = Number(data.approximate_member_count);
      } else if (data.contents && typeof data.contents === 'string') {
        // Some proxies wrap the response in a contents field
        try {
          const parsed = JSON.parse(data.contents);
          if (parsed.approximate_member_count) {
            count = Number(parsed.approximate_member_count);
          }
        } catch(e) {}
      }
    }
    
    if (count > 0) {
      animateCounterTo(countEl, count);
    } else {
      // Fallback: use cached/last known good count
      countEl.textContent = '?';
      // Try widget API as backup
      try {
        const widgetRes = await fetch(`https://discord.com/api/guilds/1188248960710484026/widget.json`);
        const widgetData = await widgetRes.json();
        if (widgetData && widgetData.presence_count) {
          animateCounterTo(countEl, widgetData.presence_count);
        }
      } catch(e) {}
    }
  } catch (error) {
    console.error('Failed to fetch Discord members:', error);
    // Try widget API as fallback
    try {
      const widgetRes = await fetch(`https://discord.com/api/guilds/1188248960710484026/widget.json`);
      const widgetData = await widgetRes.json();
      if (widgetData && widgetData.presence_count) {
        animateCounterTo(countEl, widgetData.presence_count);
        return;
      }
    } catch(e) {}
    countEl.textContent = '—';
  }
}

function animateCounterTo(element, target) {
  if (typeof target !== 'number' || isNaN(target) || target <= 0) {
    element.textContent = '—';
    return;
  }
  const duration = 1500;
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

// Fetch Discord member count on load
fetchDiscordMembers();
// Refresh every 60 seconds
setInterval(fetchDiscordMembers, 60000);

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

// Intersection Observer for stats (skip Discord member count - handled separately)
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-num:not(.discord-members)');
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
  try { localStorage.setItem('theme', theme); } catch (e) {}
  updateThemeIcon(theme);
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
  }
}

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
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
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.gamemode-card, .news-card, .staff-card');
  cards.forEach(card => {
    card.classList.add('reveal');
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

// ── LIFEA TIERS ──
function initTierBoards() {
  const tabs = document.querySelectorAll('.tier-tab');
  const boards = document.querySelectorAll('.tier-board');
  const title = document.getElementById('tierTitle');
  if (!tabs.length || !boards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tierId = tab.dataset.tier;
      const board = document.getElementById(tierId);
      if (!board) return;

      tabs.forEach(item => {
        const active = item === tab;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      boards.forEach(item => {
        const active = item === board;
        item.classList.toggle('active', active);
        item.hidden = !active;
      });
      if (title) title.textContent = `${tab.textContent.trim()} PvP`;
    });
  });
}

initTierBoards();
