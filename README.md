# 🎂 Birthday Surprise Website

A premium, interactive, frontend-only birthday surprise website for your best friend.

**No backend. No server. No database.** Just open `index.html` in your browser!

---

## 🚀 Quick Start

1. Open the `birthday-surprise` folder
2. Double-click `index.html` (or open it in Chrome, Safari, Firefox, or Edge)
3. That's it — the surprise begins!

---

## 📁 Project Structure

```
birthday-surprise/
├── index.html          → Welcome page
├── memories.html       → Memory gallery
├── messages.html       → Friendship messages
├── birthday.html       → Birthday celebration + countdown
├── meeting.html        → Meeting date picker + joke reveal
├── surprise.html       → Final surprise message
├── css/
│   └── style.css       → All styles & animations
├── js/
│   ├── config.js       → ⭐ CUSTOMIZE HERE
│   └── script.js       → Interactions & logic
└── assets/
    ├── images/         → Replace with your photos
    └── birthday-music.mp3  → Add your music file
```

---

## ✏️ Customization Guide

### 1. Edit `js/config.js` (Main Config)

This is the **one file** you need to personalize everything:

```javascript
const birthdayConfig = {
  name: "BESTIE",              // Your friend's name
  logoText: "✨ B",             // Navbar logo
  birthday: "2026-08-20",      // Countdown date (YYYY-MM-DD)
  finalMessage: "...",         // Final page message
  meetingJoke: "...",          // Joke after meeting form
  friendshipMessages: [...],   // Page 3 messages
  memories: [...],             // Memory cards data
  musicPath: "assets/birthday-music.mp3",
  colors: { ... }               // Theme colors
};
```

### 2. Replace Photos

Replace the placeholder SVG files in `assets/images/` with your own photos:

| Placeholder | Replace With |
|-------------|-------------|
| `memory-1.svg` | `memory-1.jpg` |
| `memory-2.svg` | `memory-2.jpg` |
| ... | ... |

Then update the `image` path in each memory object inside `config.js`:

```javascript
image: "assets/images/memory-1.jpg",
```

### 3. Add Birthday Music

1. Copy your MP3 file to: `assets/birthday-music.mp3`
2. Music does **NOT** autoplay — the user clicks "Play Music" to start
3. To use a different filename, update `musicPath` in `config.js`

### 4. Theme Colors

Edit the `colors` object in `config.js`:

```javascript
colors: {
  primary: "#ff6b9d",    // Pink
  secondary: "#c084fc",  // Purple
  accent: "#fbbf24",     // Gold
  dark: "#1a1a2e",
  light: "#fef3f8",
}
```

---

## 🗺️ Page Journey

| Page | What Happens |
|------|-------------|
| **Home** | Secret welcome + "Open Your Surprise" button |
| **Memories** | 8 memory cards with modal popups |
| **Messages** | Scroll-reveal friendship messages |
| **Birthday** | CSS cake, make-a-wish, confetti, countdown, music |
| **Meeting** | Date/time form → confirmation → joke reveal |
| **Surprise** | Final message + confetti + replay button |

---

## 📱 Responsive Design

Built mobile-first with Bootstrap 5. Tested for:

- iPhone / Android phones
- Tablets
- Laptops & desktops

---

## ♿ Accessibility

- Semantic HTML5 elements
- Alt text on all images
- Keyboard navigation (Enter/Space on memory cards)
- Visible focus states
- `aria-label` on interactive elements
- Respects `prefers-reduced-motion`

---

## 🛠 Tech Stack

- HTML5
- CSS3 (animations, glassmorphism, gradients)
- Bootstrap 5.3
- Bootstrap Icons
- Vanilla JavaScript
- Google Fonts (Poppins + Playfair Display)

**No frameworks. No backend. No build step.**

---

## 💡 Tips

- Send the link by hosting on GitHub Pages, Netlify, or just zip the folder
- Test the meeting date form — past dates are rejected
- The countdown uses the `birthday` date in config.js
- Click "Replay the Surprise" on the final page to start over

---

Made with love for besties everywhere. 💛
