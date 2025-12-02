# Daily Meditation Guide - Browser Extension

A beautiful browser extension for mindful breaks. Access guided meditations, breathing exercises, and ambient sounds right from your browser toolbar.

## Features

- 🧘 **Breathing Exercises** - Animated breathing guide with multiple patterns (Relaxed 4-4-4, Calm 4-7-8, Energize 4-4-2)
- 🎵 **Ambient Sounds** - Rain, ocean, forest, fireplace, birds, and wind sounds
- 🎧 **Meditation Player** - Play guided meditation sessions directly in the popup
- 🔔 **Mindful Reminders** - Customizable notifications to take mindful breaks
- 🔍 **Search Meditations** - Find meditations by keywords, title, or description
- 📚 **Categorized Library** - Browse meditations by category (Sleep, Focus, Calm, etc.)
- 🎨 **Beautiful UI** - Calming celadon/peach color palette with ambient animations

## Installation

### Developer Mode (Recommended for Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top right
3. Click "Load unpacked"
4. Select the `browser-extension` folder
5. The extension should now appear in your toolbar

### Building for Production

1. Ensure all icons are properly sized PNG files (16x16, 32x32, 48x48, 128x128)
2. Zip the contents of the `browser-extension` folder
3. Upload to Chrome Web Store (requires developer account)

## Configuration

### API Base URL

By default, the extension connects to `http://localhost:3000`. To change this:

1. Click the extension icon to open the popup
2. Click the ⚙️ (settings) icon in the top right
3. Enter your API base URL (e.g., `https://your-deployed-app.vercel.app`)
4. Click "Save"

The settings are synced across your Chrome profile.

## API Endpoints Used

The extension integrates with the following API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/meditations` | List all meditations |
| GET | `/api/meditations?q={query}` | Search meditations |
| GET | `/api/meditations?limit={n}&offset={n}` | Paginated results |
| GET | `/api/meditations/{id}` | Get single meditation |

## File Structure

```
browser-extension/
├── manifest.json       # Chrome extension manifest (Manifest V3)
├── popup.html          # Extension popup HTML
├── popup.css           # Popup styles
├── popup.js            # Main popup logic and API integration
├── service-worker.js   # Background service worker
├── icons/              # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md           # This file
```

## Development

### Prerequisites

- Chrome browser (version 88 or higher for Manifest V3 support)
- The meditation API running locally or deployed

### Local Development

1. Start the meditation API:
   ```bash
   npm run dev
   ```

2. Load the extension in Chrome (see Installation above)

3. Make changes to the extension files

4. Click the refresh button on the extension card in `chrome://extensions/` to reload

### Debugging

- **Popup**: Right-click the extension icon and select "Inspect popup"
- **Service Worker**: Click "Service worker" link on the extension card in `chrome://extensions/`
- **Console Logs**: Available in the respective dev tools windows

## Permissions

The extension requires the following permissions:

- `storage` - To save user preferences and reminder settings
- `alarms` - For scheduling mindful reminder notifications
- `notifications` - To display reminder notifications
- Host permissions - To access the meditation API

## Troubleshooting

### "Failed to connect to API"

1. Make sure the API server is running
2. Check the API base URL in settings
3. Ensure CORS is enabled on the API (it is by default)

### Audio not playing

1. Check the browser console for errors
2. Ensure the audio URLs are accessible
3. Try refreshing the meditation list

### Extension not appearing

1. Check `chrome://extensions/` for errors
2. Make sure all required files are present
3. Verify manifest.json is valid JSON

## License

This extension is part of the Guided Meditation project.

