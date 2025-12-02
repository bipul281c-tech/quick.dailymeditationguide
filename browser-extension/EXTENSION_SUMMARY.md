# Daily Meditation Guide - Browser Extension

## Overview

A Chrome browser extension that helps users take mindful breaks without leaving their browser. Access guided meditations, breathing exercises, and ambient sounds directly from your toolbar.

---

## 🎯 Key Features

### 1. Guided Meditation Library
- **Categorized by keywords** - Browse meditations organized by topics like Awareness, Breath, Soul Connection, Chakra Balance, and more
- **One-tap playback** - Click any meditation to start playing instantly
- **Mini player** - Floating player at bottom with play/pause, progress bar, and close controls
- **Search functionality** - Find specific meditations by title or keyword

### 2. Breathing Exercises
- **Visual breathing guide** - Animated circle that expands and contracts to guide your breath
- **Three patterns available:**
  - **Relaxed (4-4-4)** - Equal inhale, hold, exhale for general relaxation
  - **Calm (4-7-8)** - Extended exhale for deep relaxation and sleep
  - **Energize (4-4-2)** - Quick exhale for energy boost
- **Real-time countdown** - Shows seconds remaining for each phase

### 3. Ambient Sounds
- **6 nature sounds:**
  - 🌧️ Rain
  - 🌊 Ocean
  - 🌲 Forest
  - 🔥 Fireplace
  - 🐦 Birds
  - 💨 Wind
- **Volume control** - Adjustable slider for perfect background level
- **Loop playback** - Sounds play continuously until stopped

### 4. Mindful Reminders
- **Automatic notifications** - Gentle reminders to take breaks
- **Customizable intervals** - Set reminder frequency (default: 60 minutes)
- **Variety of messages** - Random encouraging messages to prompt mindfulness

---

## 🎨 Design

### Color Palette
- **Primary:** Celadon Green (#A3D1A0) - Calming, nature-inspired
- **Accent:** Peach (#FEC6AF) - Warm, welcoming
- **Background:** Soft gradients with ambient blob animations

### UI Elements
- Clean, minimal interface
- Smooth animations and transitions
- Category-based organization with color-coded headers
- Responsive mini player that appears only when playing

---

## 🔧 Technical Specifications

| Specification | Details |
|---------------|---------|
| Platform | Chrome, Edge, Brave (Chromium-based browsers) |
| Manifest Version | 3 |
| Permissions | Storage, Alarms, Notifications |
| API Integration | dailymeditationguide.com |
| Size | ~150KB (zipped) |

---

## 📁 File Structure

```
browser-extension/
├── manifest.json        # Extension configuration
├── popup.html           # Main popup UI
├── popup.css            # Styles
├── popup.js             # Main functionality
├── service-worker.js    # Background tasks & reminders
└── icons/               # Extension icons (16, 32, 48, 128px)
```

---

## 🚀 Installation

### From Chrome Web Store
1. Visit the Chrome Web Store
2. Search "dailymeditationguide"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)
1. Download and unzip the extension
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension folder

---

## 📱 User Flow

1. **Click extension icon** → Popup opens with meditation list
2. **Browse categories** → Expand/collapse keyword sections
3. **Play meditation** → Mini player appears at bottom
4. **Use breathing exercise** → Click "Breathe" in navigation
5. **Play ambient sounds** → Click "Sounds" in navigation
6. **Visit website** → Click "Website" in navigation

---

## 🎯 Target Audience

- Remote workers needing break reminders
- Students studying for long periods
- Anyone seeking quick stress relief
- Meditation beginners wanting guided sessions
- People who spend extended time in browsers

---

## 📊 Benefits

| Benefit | Description |
|---------|-------------|
| **Convenience** | No app switching needed |
| **Quick access** | One click from any tab |
| **Variety** | Multiple meditation types and sounds |
| **Customizable** | Choose your preferred exercises |
| **Non-intrusive** | Gentle reminders, easy to dismiss |

---

## 🔗 Links

- **Website:** https://dailymeditationguide.com
- **API:** https://www.quick.dailymeditationguide.com
- **Support:** Contact via website

---

## 📝 Version History

| Version | Changes |
|---------|---------|
| 1.1.0 | Added breathing exercises, ambient sounds, mini player |
| 1.0.0 | Initial release with meditation library |

---

*Take mindful breaks without leaving your browser.* 🧘

