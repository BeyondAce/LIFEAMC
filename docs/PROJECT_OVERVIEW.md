# Lifea MC - Project Overview

## 📁 Complete File Structure

```
LIFEA/
├── index.html          # Homepage with hero, stats, game modes, news
├── vote.html           # Voting page with vote sites and leaderboards
├── rules.html          # Server rules page
├── staff.html          # Staff team showcase page
├── store.html          # Store/Marketplace with ranks, items, crates, perks
├── css/
│   └── style.css       # Complete stylesheet (all pages + themes + store)
├── js/
│   ├── main.js         # Core functionality (navbar, theme, server status, animations)
│   └── store.js        # Store tab switching functionality
├── README.md           # Main documentation
├── FEATURES.md         # Feature list
└── QUICKSTART.md       # Quick start guide
```

## 🎨 Design Features

### Typography
- **Font**: Montserrat (Google Fonts)
- **Style**: Small caps (Minecraft-inspired)
- **Weights**: 400, 500, 600, 700, 800
- **Letter Spacing**: Enhanced for readability

### Color Scheme
**Light Theme:**
- Primary: #dc143c (Crimson Red)
- Background: #ffffff → #fafafa gradient
- Text: #1a1a1a

**Dark Theme:**
- Primary: #ff1744 (Bright Red)
- Background: #0a0a0a → #050505 gradient
- Text: #e8e8e8

### Background Effects
- Subtle dot grid pattern (fixed)
- Radial gradients with primary color
- Smooth transitions (0.3s cubic-bezier)
- Hero section: Gentle pulsing glow effect

## 📄 Page Breakdown

### 1. Homepage (index.html)
**Sections:**
- Hero with server status pills
- Stats bar (animated counters)
- Game modes grid (Lifesteal, Earth SMP, FFA)
- Latest news cards
- Staff preview
- Footer

**Features:**
- Live server status via mcsrvstat.us API
- Click-to-copy IP address
- Animated statistics
- Smooth scroll navigation

### 2. Vote Page (vote.html)
**Sections:**
- Vote rewards info box
- 4 vote site cards
- Top voters leaderboard

**Features:**
- Vote site links
- Monthly leaderboard display
- Reward information

### 3. Rules Page (rules.html)
**Sections:**
- Rules introduction
- 8 numbered rule items

**Features:**
- Clear rule presentation
- Left border accent on hover
- Easy to read format

### 4. Staff Page (staff.html)
**Sections:**
- Owners section
- Administrators section
- Moderators section
- Helpers section

**Features:**
- Minecraft avatar integration
- Social media links
- Role badges
- Organized by hierarchy

### 5. Store Page (store.html) ⭐ NEW
**Sections:**
- Category tabs (Ranks, Items, Crates, Perks)
- Product cards with pricing
- Store info cards (security, delivery, support)

**Categories:**
- **Ranks**: VIP, VIP+, MVP, Legend (with features list)
- **Items**: Hearts, Diamonds, Netherite, Spawners
- **Crates**: Common, Rare, Epic, Legendary keys
- **Perks**: Name change, colors, pets, particles

**Features:**
- Tab switching (no page reload)
- Featured/badge system
- Gradient icons
- Hover animations
- Small caps typography

## 🔧 JavaScript Functionality

### main.js
- Smooth scroll behavior
- Navbar scroll effects
- Mobile drawer menu
- Theme toggle (localStorage)
- Server status fetching (30s interval)
- Stats counter animation
- Copy IP to clipboard
- Toast notifications
- Scroll animations (Intersection Observer)

### store.js
- Tab switching functionality
- Category management
- Active state handling

## 🎯 Key Features

✅ **Responsive Design**
- Mobile-first approach
- Hamburger menu for mobile
- Flexible grid layouts
- Touch-friendly buttons

✅ **Performance**
- Optimized animations
- Lazy loading ready
- Minimal dependencies
- Fast load times

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Reduced motion support

✅ **SEO Ready**
- Meta tags
- Semantic structure
- Alt text for images
- Clean URLs

## 🚀 Quick Start

1. **Open any HTML file** in a browser
2. **Customize content** in HTML files
3. **Adjust colors** in CSS variables
4. **Update server IP** in HTML and JS files
5. **Add Discord links** throughout pages

## 🎨 Customization Guide

### Change Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary: #dc143c;        /* Main color */
  --primary-dark: #b01030;   /* Darker shade */
  --primary-light: #ff1744;  /* Lighter shade */
}
```

### Update Server IP
Replace `play.lifeamc.net` in:
- All HTML files (status pills, footer)
- `js/main.js` (copyIP and fetchServerStatus functions)

### Modify Store Items
Edit `store.html`:
- Change prices in `.store-price`
- Update features in `.store-features`
- Modify icons and colors

### Add/Remove Pages
1. Create new HTML file
2. Copy navbar/footer from existing page
3. Add link to navbar in all pages
4. Update footer links

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS/Android)

## 🔗 External Dependencies

- **Google Fonts**: Montserrat
- **Font Awesome**: 6.5.0 (icons)
- **mcsrvstat.us**: Server status API

## 📝 Notes

- All pages use the same CSS file for consistency
- Theme preference saved in localStorage
- Server status updates every 30 seconds
- Store uses client-side tab switching (no backend needed)
- Small caps typography for Minecraft aesthetic
- Smooth animations with cubic-bezier easing

## 🎮 Next Steps

1. **Add payment integration** to store page
2. **Connect to actual vote sites**
3. **Implement backend** for leaderboards
4. **Add more game modes** as needed
5. **Create admin panel** for content management
6. **Add blog/news system**
7. **Implement player profiles**

---

**Made with ❤️ for Lifea MC**
