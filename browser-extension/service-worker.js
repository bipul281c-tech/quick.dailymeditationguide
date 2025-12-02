// Guided Meditation Chrome Extension - Service Worker
// Handles background tasks and extension lifecycle

// Default API configuration
const DEFAULT_API_BASE_URL = 'http://localhost:3000';

// Extension installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Guided Meditation extension installed/updated:', details.reason);

  // Set default settings on first install
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      apiBaseUrl: DEFAULT_API_BASE_URL
    });
    console.log('Default settings initialized');
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_API_URL') {
    chrome.storage.sync.get(['apiBaseUrl'], (result) => {
      sendResponse({ apiBaseUrl: result.apiBaseUrl || DEFAULT_API_BASE_URL });
    });
    return true; // Indicates async response
  }

  if (message.type === 'FETCH_MEDITATIONS') {
    fetchMeditationsBackground(message.query)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Indicates async response
  }
});

// Fetch meditations in background (for potential caching)
async function fetchMeditationsBackground(query = '') {
  const result = await chrome.storage.sync.get(['apiBaseUrl']);
  const apiBaseUrl = result.apiBaseUrl || DEFAULT_API_BASE_URL;

  const url = query
    ? `${apiBaseUrl}/api/meditations?q=${encodeURIComponent(query)}`
    : `${apiBaseUrl}/api/meditations`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Log when service worker starts
console.log('Guided Meditation service worker started');

