// Daily Meditation Guide - Chrome Extension - Service Worker
// Handles background tasks, reminders, and extension lifecycle

// Default API configuration
const API_BASE_URL = 'https://www.quick.dailymeditationguide.com';

// Reminder settings
const REMINDER_ALARM_NAME = 'breathe-reminder';
const DEFAULT_REMINDER_INTERVAL = 60; // minutes

// Mindful reminder messages
const REMINDER_MESSAGES = [
  { title: '🧘 Time for a Break', body: 'Take a moment to breathe and center yourself.' },
  { title: '💆 Mindful Moment', body: 'A short meditation can refresh your mind.' },
  { title: '🌿 Pause & Breathe', body: 'Step away from the screen for a quick breathing exercise.' },
  { title: '✨ You Deserve Peace', body: 'Take 2 minutes to calm your thoughts.' },
  { title: '🌊 Relax Your Mind', body: 'Let go of tension with a quick meditation.' },
  { title: '🌸 Be Present', body: 'A mindful pause can improve your focus.' }
];

// Extension installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Daily Meditation Guide extension installed/updated:', details.reason);

  // Set default settings on first install
  if (details.reason === 'install') {
    console.log('Extension installed - setting up defaults');

    // Set default reminder settings
    chrome.storage.sync.set({
      remindersEnabled: true,
      reminderInterval: DEFAULT_REMINDER_INTERVAL
    });

    // Setup reminder alarm
    setupReminderAlarm(DEFAULT_REMINDER_INTERVAL);

    // Show welcome notification
    chrome.notifications.create('welcome', {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Welcome to Daily Meditation Guide! 🧘',
      message: 'Take mindful breaks throughout your day. Click the extension to start.',
      priority: 2
    });
  }
});

// Setup reminder alarm
function setupReminderAlarm(intervalMinutes) {
  // Clear existing alarm
  chrome.alarms.clear(REMINDER_ALARM_NAME);

  if (intervalMinutes > 0) {
    chrome.alarms.create(REMINDER_ALARM_NAME, {
      delayInMinutes: intervalMinutes,
      periodInMinutes: intervalMinutes
    });
    console.log(`Reminder alarm set for every ${intervalMinutes} minutes`);
  }
}

// Handle alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === REMINDER_ALARM_NAME) {
    chrome.storage.sync.get(['remindersEnabled'], (result) => {
      if (result.remindersEnabled !== false) {
        showMindfulReminder();
      }
    });
  }
});

// Show a mindful reminder notification
function showMindfulReminder() {
  const reminder = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];

  chrome.notifications.create(`reminder-${Date.now()}`, {
    type: 'basic',
    iconUrl: 'icons/icon-128.png',
    title: reminder.title,
    message: reminder.body,
    buttons: [
      { title: 'Start Breathing Exercise' },
      { title: 'Dismiss' }
    ],
    priority: 1,
    requireInteraction: false
  });
}

// Handle notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (notificationId.startsWith('reminder-')) {
    if (buttonIndex === 0) {
      // Open extension popup (this opens the popup in a new window)
      chrome.action.openPopup();
    }
    chrome.notifications.clear(notificationId);
  }
});

// Handle notification clicks
chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.action.openPopup();
  chrome.notifications.clear(notificationId);
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_API_URL') {
    sendResponse({ apiBaseUrl: API_BASE_URL });
    return true;
  }

  if (message.type === 'FETCH_MEDITATIONS') {
    fetchMeditationsBackground(message.query)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (message.type === 'SET_REMINDER') {
    chrome.storage.sync.set({
      remindersEnabled: message.enabled,
      reminderInterval: message.interval || DEFAULT_REMINDER_INTERVAL
    });

    if (message.enabled) {
      setupReminderAlarm(message.interval || DEFAULT_REMINDER_INTERVAL);
    } else {
      chrome.alarms.clear(REMINDER_ALARM_NAME);
    }

    sendResponse({ success: true });
    return true;
  }

  if (message.type === 'GET_REMINDER_SETTINGS') {
    chrome.storage.sync.get(['remindersEnabled', 'reminderInterval'], (result) => {
      sendResponse({
        enabled: result.remindersEnabled !== false,
        interval: result.reminderInterval || DEFAULT_REMINDER_INTERVAL
      });
    });
    return true;
  }
});

// Fetch meditations in background (for potential caching)
async function fetchMeditationsBackground(query = '') {
  const url = query
    ? `${API_BASE_URL}/api/meditations?q=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/api/meditations`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Log when service worker starts
console.log('Daily Meditation Guide service worker started');

