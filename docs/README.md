# Lifea MC - Minecraft Server Website

A clean, minimalistic, and professional website for Lifea MC Minecraft server with light/dark theme support.

## Features

✨ **Clean & Minimalistic Design**
- Professional white/dark theme
- Centered navigation
- Minecraft hardcore heart logo
- Smooth transitions

🎨 **Dual Theme Support**
- Light theme (default)
- Dark theme
- Theme preference saved in localStorage
- Smooth theme switching

📱 **Fully Responsive**
- Mobile-first design
- Hamburger menu for mobile
- Optimized for all screen sizes

🎮 **Complete Pages**
- Home (Hero, Stats, Game Modes, News, Staff)
- Vote (Vote sites, Leaderboards)
- Rules (Server rules)
- Staff (Team showcase)
- Store (Ranks, Items, Crates, Perks)

⚡ **Performance**
- Live server status via mcsrvstat.us API
- Animated statistics counter
- Smooth scroll navigation
- Optimized assets

## File Structure

```
LIFEA/
├── index.html          # Homepage
├── vote.html           # Vote page
├── rules.html          # Rules page
├── staff.html          # Staff page
├── store.html          # Store/Marketplace page
├── css/
│   └── style.css       # All styles (light + dark theme + store)
└── js/
    ├── main.js         # Main JavaScript functionality
    └── store.js        # Store tab switching
```

## Customization

### 1. Server IP
Replace `play.lifeamc.net` with your actual server IP in:
- All HTML files (status pills, footer buttons)
- `js/main.js` (copyIP function and fetchServerStatus)

### 2. Discord Link
Replace `https://discord.gg/` with your Discord invite in all HTML files

### 3. Colors
Edit CSS variables in `css/style.css`:

**Light Theme:**
```css
:root {
  --primary: #dc143c;        /* Main red color */
  --primary-dark: #b01030;   /* Darker red */
  --primary-light: #ff1744;  /* Lighter red */
}
```

**Dark Theme:**
```css
[data-theme="dark"] {
  --primary: #ff1744;        /* Main red color */
  --primary-dark: #dc143c;   /* Darker red */
  --primary-light: #ff4569;  /* Lighter red */
}
```

### 4. Logo
The hardcore heart logo is SVG-based. To customize:
- Edit the `<svg>` element in the navbar
- Located in all HTML files under `.nav-logo`

### 5. Content

**Stats Bar (index.html):**
```html
<div class="stat-item">
  <i class="fa-solid fa-users"></i>
  <div><span class="stat-num" data-target="12000">0</span><span>+</span></div>
  <div class="stat-label">Total Players</div>
</div>
```

**Game Modes (index.html):**
Edit the `.gamemode-card` sections

**News (index.html):**
Edit the `.news-card` sections

**Staff (staff.html):**
Edit the `.staff-card` sections
- Replace avatar URLs with your staff's Minecraft usernames
- Update names, roles, and bios

**Vote Sites (vote.html):**
Edit the `.vote-site-card` sections
- Add your actual vote site links

**Rules (rules.html):**
Edit the `.rule-item` sections

## Theme Toggle

The theme toggle button is in the top-right navbar. It:
- Switches between light and dark themes
- Saves preference to localStorage
- Persists across page reloads
- Shows sun icon in dark mode, moon icon in light mode

## Server Status

The website automatically fetches live server status from `mcsrvstat.us` API:
- Shows online/offline status
- Displays player count
- Updates every 30 seconds
- Fallback for API errors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Credits

- Font: Montserrat (Google Fonts)
- Icons: Font Awesome 6.5.0
- Server Status API: mcsrvstat.us

## License

Free to use and modify for your Minecraft server.

---

**Made with ❤️ for Lifea MC**
