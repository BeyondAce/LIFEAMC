/* ═══════════════════════════════════════════════════════════
   LIFEA MC - STORE PAGE JAVASCRIPT
   Tab switching and category management
   ═══════════════════════════════════════════════════════════ */

// ── STORE TABS ──
const storeTabs = document.querySelectorAll('.store-tab');
const storeCategories = document.querySelectorAll('.store-category');

storeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category');
    
    // Remove active class from all tabs
    storeTabs.forEach(t => t.classList.remove('active'));
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Hide all categories
    storeCategories.forEach(cat => cat.classList.remove('active'));
    
    // Show selected category
    document.getElementById(category).classList.add('active');
  });
});

console.log('%c🛒 Store Loaded', 'color: #e8365d; font-size: 16px; font-weight: bold;');
