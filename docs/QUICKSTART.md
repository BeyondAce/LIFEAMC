# 🚀 Quick Start Guide - Lifea MC Website

## What You Got

✅ **Complete Minecraft Server Website**
- 4 pages: Home, Vote, Rules, Staff
- Light & Dark theme toggle
- Minecraft hardcore heart logo
- Live server status
- Fully responsive design
- Clean, minimalistic, professional

## 🎯 Before You Launch

### 1. Replace Server IP (REQUIRED)
Search and replace `play.lifeamc.net` with your actual IP in:
- `index.html`
- `vote.html`
- `rules.html`
- `staff.html`
- `js/main.js`

### 2. Add Discord Link (REQUIRED)
Replace `https://discord.gg/` with your Discord invite in all HTML files

### 3. Update Vote Links (REQUIRED)
In `vote.html`, replace `#` with your actual vote site URLs:
```html
<a href="YOUR_VOTE_LINK_HERE" target="_blank" class="btn-vote">
```

### 4. Customize Staff (RECOMMENDED)
In `staff.html` and `index.html`, update:
- Staff names
- Staff roles
- Staff bios
- Minecraft usernames in avatar URLs

### 5. Update News (RECOMMENDED)
In `index.html`, edit the news cards with your announcements

## 🎨 Theme Toggle

Click the moon/sun icon in the top-right navbar to switch themes:
- 🌙 Moon = Switch to dark theme
- ☀️ Sun = Switch to light theme

Theme preference is saved automatically!

## 📱 Test It

1. Open `index.html` in your browser
2. Test theme toggle
3. Test mobile menu (resize browser)
4. Check all pages work
5. Verify server status loads

## 🌐 Deploy

### Option 1: Simple Hosting
Upload all files to:
- Netlify (drag & drop)
- Vercel
- GitHub Pages
- Any web host

### Option 2: Custom Domain
1. Upload files to your hosting
2. Point domain to hosting
3. Done!

## 🎨 Color Customization

Want different colors? Edit `css/style.css`:

```css
/* Light theme */
:root {
  --primary: #dc143c;  /* Change this! */
}

/* Dark theme */
[data-theme="dark"] {
  --primary: #ff1744;  /* Change this! */
}
```

## 📊 Stats Counter

The stats bar animates when you scroll to it. Edit numbers in `index.html`:

```html
<span class="stat-num" data-target="12000">0</span>
```

Change `data-target="12000"` to your number.

## ❓ Need Help?

Check `README.md` for detailed documentation.

## 🎉 You're Ready!

Your professional Minecraft server website is complete. Just customize the content and launch!

---

**Lifea MC - Your heart beats here ❤️**
