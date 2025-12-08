// Daily Meditation Guide - Chrome Extension
// API Integration, Breathing Exercises, Ambient Sounds

// Default API configuration
const API_BASE_URL = 'https://www.quick.dailymeditationguide.com';

// Breathing patterns (inhale, hold, exhale in seconds)
const BREATHING_PATTERNS = {
  relaxed: { name: 'Relaxed', inhale: 4, hold: 4, exhale: 4 },
  calm: { name: 'Calm', inhale: 4, hold: 7, exhale: 8 },
  energize: { name: 'Energize', inhale: 4, hold: 4, exhale: 2 }
};

// Ambient sounds URLs (using free sounds)
const AMBIENT_SOUNDS = {
  rain: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  ocean: 'https://assets.mixkit.co/active_storage/sfx/2516/2516-preview.mp3',
  forest: 'https://assets.mixkit.co/active_storage/sfx/1225/1225-preview.mp3',
  fire: 'https://assets.mixkit.co/active_storage/sfx/2518/2518-preview.mp3',
  birds: 'https://assets.mixkit.co/active_storage/sfx/2468/2468-preview.mp3',
  wind: 'https://assets.mixkit.co/active_storage/sfx/2517/2517-preview.mp3'
};

// State
let meditations = [];
let currentMeditation = null;
let isPlaying = false;
let breathingInterval = null;
let breathingActive = false;
let currentBreathingPattern = 'relaxed';
let ambientAudio = null;
let currentAmbientSound = null;

// DOM Elements
const elements = {
  searchInput: null,
  searchBtn: null,
  loading: null,
  error: null,
  errorMessage: null,
  retryBtn: null,
  meditationList: null,
  playerTitle: null,
  playerTime: null,
  playPauseBtn: null,
  progressBar: null,
  audioElement: null,
  playIconSVG: null,
  pauseIconSVG: null,
  progressKnob: null,
  currentTimeEl: null,
  totalTimeEl: null,
  gotoSiteBtn: null,
  // New elements
  breathingBtn: null,
  soundsBtn: null,
  meditateBtn: null,
  breathingModal: null,
  soundsModal: null,
  greeting: null,
  // Mini player
  miniPlayer: null,
  closePlayerBtn: null
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  setupEventListeners();
  updateGreeting();
  await initializeAuth(); // Initialize Supabase Auth (now async)
  await fetchMeditations();
});

// Cache DOM elements
function initializeElements() {
  elements.searchInput = document.getElementById('search-input');
  elements.searchBtn = document.getElementById('search-btn');
  elements.loading = document.getElementById('loading');
  elements.error = document.getElementById('error');
  elements.errorMessage = document.getElementById('error-message');
  elements.retryBtn = document.getElementById('retry-btn');
  elements.meditationList = document.getElementById('meditation-list');
  elements.playerTitle = document.getElementById('player-title');
  elements.playerTime = document.getElementById('player-time');
  elements.playPauseBtn = document.getElementById('play-pause-btn');
  elements.progressBar = document.getElementById('progress-bar');
  elements.audioElement = document.getElementById('audio-element');
  elements.playIconSVG = document.getElementById('playIconSVG');
  elements.pauseIconSVG = document.getElementById('pauseIconSVG');
  elements.progressKnob = document.getElementById('progressKnob');
  elements.currentTimeEl = document.getElementById('currentTime');
  elements.totalTimeEl = document.getElementById('totalTime');
  elements.gotoSiteBtn = document.getElementById('goto-site-btn');

  // New elements
  elements.breathingBtn = document.getElementById('breathing-btn');
  elements.soundsBtn = document.getElementById('sounds-btn');
  elements.meditateBtn = document.getElementById('meditate-btn');
  elements.breathingModal = document.getElementById('breathing-modal');
  elements.soundsModal = document.getElementById('sounds-modal');
  elements.greeting = document.getElementById('greeting');

  // Mini player
  elements.miniPlayer = document.getElementById('mini-player');
  elements.closePlayerBtn = document.getElementById('close-player-btn');

  // Auth elements
  elements.profileBtn = document.getElementById('profile-btn');
  elements.profileModal = document.getElementById('profile-modal');
  elements.closeProfileBtn = document.getElementById('close-profile');
  elements.loginForm = document.getElementById('login-form');
  elements.signOutBtn = document.getElementById('sign-out-btn');
  elements.authLoading = document.getElementById('auth-loading');
  elements.authLoggedOut = document.getElementById('auth-logged-out');
  elements.authLoggedIn = document.getElementById('auth-logged-in');
  elements.userEmail = document.getElementById('user-email');
  elements.authError = document.getElementById('auth-error');
}

// Update greeting based on time of day
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good evening';

  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 17) {
    greeting = 'Good afternoon';
  }

  if (elements.greeting) {
    elements.greeting.textContent = greeting;
  }
}


// Setup event listeners
function setupEventListeners() {
  // Search
  elements.searchBtn.addEventListener('click', handleSearch);
  elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Retry
  elements.retryBtn.addEventListener('click', () => fetchMeditations());

  // Navigation
  if (elements.gotoSiteBtn) {
    elements.gotoSiteBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: API_BASE_URL });
    });
  }

  // Audio Player - use event delegation for mini player buttons
  const miniPlayer = document.getElementById('mini-player');
  if (miniPlayer) {
    miniPlayer.addEventListener('click', (e) => {
      const playPauseBtn = e.target.closest('#play-pause-btn');
      const closeBtn = e.target.closest('#close-player-btn');

      if (playPauseBtn) {
        e.preventDefault();
        e.stopPropagation();
        togglePlayPause();
      } else if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closePlayer();
      }
    });
  }

  if (elements.progressBar) {
    elements.progressBar.addEventListener('input', handleSeek);
  }

  // Audio events
  if (elements.audioElement) {
    elements.audioElement.addEventListener('timeupdate', updateProgress);
    elements.audioElement.addEventListener('ended', handleAudioEnded);
    elements.audioElement.addEventListener('loadedmetadata', updateDuration);
    elements.audioElement.addEventListener('error', handleAudioError);
  }

  // Quick action buttons
  if (elements.breathingBtn) {
    elements.breathingBtn.addEventListener('click', openBreathingModal);
  }
  if (elements.soundsBtn) {
    elements.soundsBtn.addEventListener('click', openSoundsModal);
  }
  if (elements.meditateBtn) {
    elements.meditateBtn.addEventListener('click', () => {
      // Scroll to meditation list
      elements.meditationList.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Modal close buttons
  const closeBreathing = document.getElementById('close-breathing');
  const closeSounds = document.getElementById('close-sounds');

  if (closeBreathing) {
    closeBreathing.addEventListener('click', closeBreathingModal);
  }
  if (closeSounds) {
    closeSounds.addEventListener('click', closeSoundsModal);
  }

  // Breathing controls
  const startBreathingBtn = document.getElementById('start-breathing');
  if (startBreathingBtn) {
    startBreathingBtn.addEventListener('click', toggleBreathing);
  }

  // Breathing pattern options
  document.querySelectorAll('.breathing-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.breathing-option').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentBreathingPattern = e.target.dataset.pattern;
    });
  });

  // Sound buttons
  document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sound = e.currentTarget.dataset.sound;
      toggleAmbientSound(sound, e.currentTarget);
    });
  });

  // Ambient volume control
  const ambientVolume = document.getElementById('ambient-volume');
  if (ambientVolume) {
    ambientVolume.addEventListener('input', (e) => {
      if (ambientAudio) {
        ambientAudio.volume = e.target.value / 100;
      }
    });
  }

  // Bottom navigation
  const navBreathe = document.getElementById('nav-breathe');
  const navSounds = document.getElementById('nav-sounds');
  const navHome = document.getElementById('nav-home');

  if (navBreathe) {
    navBreathe.addEventListener('click', () => {
      openBreathingModal();
      updateNavActive('nav-breathe');
    });
  }

  if (navSounds) {
    navSounds.addEventListener('click', () => {
      openSoundsModal();
      updateNavActive('nav-sounds');
    });
  }

  if (navHome) {
    navHome.addEventListener('click', () => {
      updateNavActive('nav-home');
    });
  }

  // Profile events
  if (elements.profileBtn) {
    elements.profileBtn.addEventListener('click', openProfileModal);
  }
  if (elements.closeProfileBtn) {
    elements.closeProfileBtn.addEventListener('click', closeProfileModal);
  }
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', handleLogin);
  }
  if (elements.signOutBtn) {
    elements.signOutBtn.addEventListener('click', handleLogout);
  }
}

// Update active navigation state
function updateNavActive(activeId) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('nav-active');
    item.classList.add('nav-inactive');
  });

  const activeItem = document.getElementById(activeId);
  if (activeItem) {
    activeItem.classList.remove('nav-inactive');
    activeItem.classList.add('nav-active');
  }
}

// Fetch meditations from API
async function fetchMeditations(query = '') {
  showLoading();
  hideError();

  try {
    const url = query
      ? `${API_BASE_URL}/api/meditations?q=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/api/meditations`;

    const headers = {};
    if (supabaseClient) {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch meditations');
    }

    meditations = data.data;
    renderMeditations();
  } catch (error) {
    console.error('API Error:', error);
    showError(error.message || 'Failed to connect to API. Check your settings.');
  } finally {
    hideLoading();
  }
}

// Handle search
function handleSearch() {
  const query = elements.searchInput.value.trim();
  fetchMeditations(query);
}

// Group meditations by their first keyword
function groupMeditationsByCategory(meditationList) {
  const groups = {};

  meditationList.forEach(meditation => {
    const keywords = meditation.keywords || [];

    // Use the first keyword as the category, or 'Other' if no keywords
    let category = 'Other';
    if (keywords.length > 0) {
      // Capitalize first letter of the keyword
      category = keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1).toLowerCase();
    }

    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(meditation);
  });

  // Sort groups alphabetically, but put 'Other' at the end
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
  });

  const sortedGroups = {};
  sortedKeys.forEach(key => {
    sortedGroups[key] = groups[key];
  });

  return sortedGroups;
}

// Get category icon SVG - default meditation icon for all categories
function getCategoryIcon(category) {
  // Default icon - lotus/meditation symbol
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l2 2"></path></svg>';
}

// Get category color class - cycle through colors
function getCategoryColorClass(category) {
  // Generate a consistent color based on the category name
  const colors = ['category-teal', 'category-indigo', 'category-amber', 'category-emerald', 'category-rose'];

  // Simple hash of category name to pick a color
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// Render meditation list
function renderMeditations() {
  if (meditations.length === 0) {
    elements.meditationList.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin: 0 auto 12px; opacity: 0.4;">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <p>No meditations found</p>
        <p class="empty-state-hint">Try a different search term</p>
      </div>
    `;
    return;
  }

  // Group meditations by category
  const groupedMeditations = groupMeditationsByCategory(meditations);
  const totalCount = meditations.length;

  // Build the HTML with category sections
  let html = `
    <div class="meditation-list-header">
      <span class="result-count">${totalCount} meditation${totalCount !== 1 ? 's' : ''} found</span>
    </div>
  `;

  Object.entries(groupedMeditations).forEach(([category, items], index) => {
    const colorClass = getCategoryColorClass(category);
    const isExpanded = index < 3; // First 3 categories are expanded by default

    html += `
      <div class="category-section ${colorClass}" data-category="${category}">
        <button class="category-header ${isExpanded ? 'expanded' : 'collapsed'}" aria-expanded="${isExpanded}">
          <div class="category-header-left">
            <span class="category-icon">${getCategoryIcon(category)}</span>
            <span class="category-title">${escapeHtml(category)}</span>
            <span class="category-count">${items.length}</span>
          </div>
          <svg class="category-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <div class="category-content ${isExpanded ? '' : 'collapsed'}">
          ${items.map((meditation, itemIndex) => `
            <div class="meditation-card ${currentMeditation?.id === meditation.id ? 'active' : ''} ${itemIndex === 0 && index === 0 ? 'featured' : ''}"
                 data-id="${meditation.id}"
                 style="animation-delay: ${itemIndex * 0.05}s">
              <div class="meditation-thumbnail-wrapper">
                <img src="${meditation.thumbnail}" alt="${escapeHtml(meditation.title)}" class="meditation-thumbnail"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%237c3aed%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2240%22>🧘</text></svg>'">
                <div class="play-indicator">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
              </div>
              <div class="meditation-info">
                <p class="meditation-title">${escapeHtml(meditation.title)}</p>
                <p class="meditation-description">${escapeHtml(meditation.description.substring(0, 60))}${meditation.description.length > 60 ? '...' : ''}</p>
                ${meditation.keywords && meditation.keywords.length > 0 ? `
                  <div class="meditation-keywords">
                    ${meditation.keywords.slice(0, 2).map(k => `<span class="keyword-tag">${escapeHtml(k)}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="meditation-actions">
                <button class="action-btn play-btn-small" title="Play">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  elements.meditationList.innerHTML = html;

  // Add click handlers for cards
  document.querySelectorAll('.meditation-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on action buttons
      if (e.target.closest('.action-btn')) return;

      const id = parseInt(card.dataset.id, 10);
      const meditation = meditations.find(m => m.id === id);
      if (meditation) {
        playMeditation(meditation);
      }
    });
  });

  // Add click handlers for category headers (expand/collapse)
  document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', !isExpanded);
      header.classList.toggle('expanded');
      header.classList.toggle('collapsed');

      const content = header.nextElementSibling;
      content.classList.toggle('collapsed');
    });
  });
}

// Play a meditation
function playMeditation(meditation) {
  currentMeditation = meditation;

  // Update UI
  elements.playerTitle.textContent = meditation.title;

  // Show mini player
  if (elements.miniPlayer) {
    elements.miniPlayer.classList.remove('hidden');
  }

  // Update active state in list
  document.querySelectorAll('.meditation-card').forEach(card => {
    card.classList.toggle('active', parseInt(card.dataset.id, 10) === meditation.id);
  });

  // Load and play audio
  elements.audioElement.src = meditation.audio_link;
  elements.audioElement.load();
  elements.audioElement.play()
    .then(() => {
      isPlaying = true;
      elements.playIconSVG.style.display = 'none';
      elements.pauseIconSVG.style.display = 'block';
    })
    .catch(error => {
      console.error('Playback error:', error);
      handleAudioError();
    });
}

// Close player
function closePlayer() {
  if (elements.audioElement) {
    elements.audioElement.pause();
    elements.audioElement.currentTime = 0;
  }

  isPlaying = false;
  currentMeditation = null;

  if (elements.miniPlayer) {
    elements.miniPlayer.classList.add('hidden');
  }

  if (elements.playIconSVG) {
    elements.playIconSVG.style.display = 'block';
  }
  if (elements.pauseIconSVG) {
    elements.pauseIconSVG.style.display = 'none';
  }

  // Remove active state from cards
  document.querySelectorAll('.meditation-card').forEach(card => {
    card.classList.remove('active');
  });
}

// Toggle play/pause
function togglePlayPause() {
  if (!currentMeditation || !elements.audioElement) return;

  if (isPlaying) {
    elements.audioElement.pause();
    isPlaying = false;
    if (elements.playIconSVG) elements.playIconSVG.style.display = 'block';
    if (elements.pauseIconSVG) elements.pauseIconSVG.style.display = 'none';
  } else {
    elements.audioElement.play()
      .then(() => {
        isPlaying = true;
        if (elements.playIconSVG) elements.playIconSVG.style.display = 'none';
        if (elements.pauseIconSVG) elements.pauseIconSVG.style.display = 'block';
      })
      .catch(console.error);
  }
}

// Handle seek
function handleSeek() {
  const time = (elements.progressBar.value / 100) * elements.audioElement.duration;
  if (!isNaN(time)) {
    elements.audioElement.currentTime = time;
  }
}

// Update progress bar
function updateProgress() {
  const progress = (elements.audioElement.currentTime / elements.audioElement.duration) * 100;
  elements.progressBar.value = isNaN(progress) ? 0 : progress;

  // Update progress bar fill
  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = `${isNaN(progress) ? 0 : progress}%`;

  // Update time display in mini player
  if (elements.playerTime) {
    const current = formatTime(elements.audioElement.currentTime);
    const total = formatTime(elements.audioElement.duration);
    elements.playerTime.textContent = `${current} / ${total}`;
  }
}

// Update duration display
function updateDuration() {
  if (elements.playerTime && elements.audioElement.duration) {
    const total = formatTime(elements.audioElement.duration);
    elements.playerTime.textContent = `0:00 / ${total}`;
  }
}

// Handle audio ended
function handleAudioEnded() {
  isPlaying = false;
  elements.playIconSVG.style.display = 'block';
  elements.pauseIconSVG.style.display = 'none';
  elements.progressBar.value = 0;
  const progressBar = document.getElementById('progressBar');
  const progressKnob = document.getElementById('progressKnob');
  if (progressBar) progressBar.style.width = '0%';
  if (progressKnob) progressKnob.style.left = '0%';
}

// Handle audio error
function handleAudioError() {
  console.error('Audio playback error');
  isPlaying = false;
  elements.playIconSVG.style.display = 'block';
  elements.pauseIconSVG.style.display = 'none';
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// UI Helper functions
function showLoading() {
  // Show skeleton loading instead of spinner for better UX
  elements.loading.classList.add('hidden');
  elements.meditationList.classList.remove('hidden');
  elements.meditationList.innerHTML = renderSkeletonLoading();
}

function hideLoading() {
  elements.loading.classList.add('hidden');
  elements.meditationList.classList.remove('hidden');
}

// Render skeleton loading placeholders
function renderSkeletonLoading() {
  const skeletonCards = Array(4).fill(0).map((_, i) => `
    <div class="meditation-card skeleton" style="animation-delay: ${i * 0.1}s">
      <div class="skeleton-thumbnail"></div>
      <div class="meditation-info">
        <div class="skeleton-title"></div>
        <div class="skeleton-description"></div>
        <div class="skeleton-tags">
          <div class="skeleton-tag"></div>
          <div class="skeleton-tag"></div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="meditation-list-header skeleton-header">
      <div class="skeleton-count"></div>
    </div>
    <div class="category-section skeleton-section">
      <div class="skeleton-category-header"></div>
      <div class="category-content">
        ${skeletonCards}
      </div>
    </div>
  `;
}

function showError(message) {
  elements.error.classList.remove('hidden');
  elements.errorMessage.textContent = message;
  elements.meditationList.classList.add('hidden');
}

function hideError() {
  elements.error.classList.add('hidden');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// BREATHING EXERCISE FUNCTIONS
// ============================================

function openBreathingModal() {
  if (elements.breathingModal) {
    elements.breathingModal.classList.remove('hidden');
  }
}

function closeBreathingModal() {
  if (elements.breathingModal) {
    elements.breathingModal.classList.add('hidden');
    stopBreathing();
    updateNavActive('nav-home');
  }
}

function toggleBreathing() {
  const btn = document.getElementById('start-breathing');

  if (breathingActive) {
    stopBreathing();
    btn.textContent = 'Start Breathing';
  } else {
    startBreathing();
    btn.textContent = 'Stop';
  }
}

function startBreathing() {
  breathingActive = true;
  const pattern = BREATHING_PATTERNS[currentBreathingPattern];
  const circle = document.getElementById('breathing-circle');
  const text = document.getElementById('breathing-text');
  const count = document.getElementById('breathing-count');

  let phase = 'inhale';
  let counter = pattern.inhale;

  // Initial state
  text.textContent = 'Inhale';
  count.textContent = counter;
  circle.classList.add('inhale');
  circle.classList.remove('exhale');

  breathingInterval = setInterval(() => {
    counter--;

    if (counter <= 0) {
      // Move to next phase
      if (phase === 'inhale') {
        phase = 'hold';
        counter = pattern.hold;
        text.textContent = 'Hold';
        circle.classList.remove('inhale');
      } else if (phase === 'hold') {
        phase = 'exhale';
        counter = pattern.exhale;
        text.textContent = 'Exhale';
        circle.classList.add('exhale');
      } else {
        phase = 'inhale';
        counter = pattern.inhale;
        text.textContent = 'Inhale';
        circle.classList.remove('exhale');
        circle.classList.add('inhale');
      }
    }

    count.textContent = counter;
  }, 1000);
}

function stopBreathing() {
  breathingActive = false;
  if (breathingInterval) {
    clearInterval(breathingInterval);
    breathingInterval = null;
  }

  const circle = document.getElementById('breathing-circle');
  const text = document.getElementById('breathing-text');
  const count = document.getElementById('breathing-count');

  if (circle) {
    circle.classList.remove('inhale', 'exhale');
  }
  if (text) {
    text.textContent = 'Ready';
  }
  if (count) {
    count.textContent = '';
  }
}

// ============================================
// AMBIENT SOUNDS FUNCTIONS
// ============================================

function openSoundsModal() {
  if (elements.soundsModal) {
    elements.soundsModal.classList.remove('hidden');
  }
}

function closeSoundsModal() {
  if (elements.soundsModal) {
    elements.soundsModal.classList.add('hidden');
    updateNavActive('nav-home');
  }
}

function toggleAmbientSound(sound, button) {
  // If clicking the same sound, stop it
  if (currentAmbientSound === sound && ambientAudio) {
    ambientAudio.pause();
    ambientAudio = null;
    currentAmbientSound = null;
    button.classList.remove('active');
    return;
  }

  // Stop current sound if any
  if (ambientAudio) {
    ambientAudio.pause();
    document.querySelectorAll('.sound-btn').forEach(btn => btn.classList.remove('active'));
  }

  // Play new sound
  const soundUrl = AMBIENT_SOUNDS[sound];
  if (soundUrl) {
    ambientAudio = new Audio(soundUrl);
    ambientAudio.loop = true;

    const volumeSlider = document.getElementById('ambient-volume');
    if (volumeSlider) {
      ambientAudio.volume = volumeSlider.value / 100;
    }

    ambientAudio.play().then(() => {
      currentAmbientSound = sound;
      button.classList.add('active');
    }).catch(err => {
      console.error('Failed to play ambient sound:', err);
      currentAmbientSound = null;
    });
  }
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

let supabaseClient = null;

async function initializeAuth(retryCount = 0) {
  // Check if Supabase library is loaded
  if (!window.supabase || !window.supabase.createClient) {
    if (retryCount < 5) {
      console.log(`Supabase library not loaded, retrying (${retryCount + 1}/5)...`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return initializeAuth(retryCount + 1);
    }
    console.error('Supabase library not loaded or createClient not found after retries');
    return; // Proceed without auth - meditations will still work
  }

  try {
    // Initialize Supabase client
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Check for existing session
    await checkSession();

    // Listen for auth state changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
      updateAuthUI(session);
    });
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    // Don't throw - allow the extension to work without auth
  }
}

async function checkSession() {
  if (!supabaseClient) return;

  try {
    // 1. Check Supabase local session
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
      updateAuthUI(session);
      return;
    }

    // 2. If no local session, check for cookies from the main site
    // We need the 'cookies' permission for this
    if (chrome.cookies) {
      const cookieName = `sb-${PROJECT_REF}-auth-token`;

      chrome.cookies.get({ url: SITE_URL, name: cookieName }, async (cookie) => {
        if (cookie) {
          try {
            // Parse the cookie value
            let cookieValue = cookie.value;
            if (cookieValue.startsWith('base64-')) {
              cookieValue = atob(cookieValue.replace('base64-', ''));
            }

            // Try to parse
            let tokenData;
            try {
              tokenData = JSON.parse(decodeURIComponent(cookieValue));
            } catch (e) {
              // Try without decode
              tokenData = JSON.parse(cookieValue);
            }

            if (tokenData) {
              // It might be an array or object depending on version
              const accessToken = tokenData.access_token || tokenData[0];
              const refreshToken = tokenData.refresh_token || tokenData[1];

              if (accessToken && refreshToken) {
                const { data, error } = await supabaseClient.auth.setSession({
                  access_token: accessToken,
                  refresh_token: refreshToken
                });

                if (!error && data.session) {
                  console.log('Session synced from website cookies');
                  updateAuthUI(data.session);
                }
              }
            }
          } catch (e) {
            console.error('Failed to parse auth cookie:', e);
          }
        }
      });
    }
  } catch (error) {
    console.error('Error checking session:', error);
  }
}

async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorEl = elements.authError;

  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  if (!supabaseClient) {
    errorEl.textContent = 'Authentication service not available. Please try again later.';
    errorEl.classList.remove('hidden');
    return;
  }

  const btn = elements.loginForm.querySelector('button');
  const originalText = btn.textContent;
  btn.textContent = 'Signing in...';
  btn.disabled = true;

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Success - UI will update via onAuthStateChange
    closeProfileModal();

  } catch (error) {
    console.error('Login error:', error);
    errorEl.textContent = error.message || 'Failed to sign in';
    errorEl.classList.remove('hidden');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

async function handleLogout() {
  if (!supabaseClient) return;

  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;

    // UI will update via onAuthStateChange
  } catch (error) {
    console.error('Logout error:', error);
  }
}

function updateAuthUI(session) {
  if (session) {
    // Logged In
    elements.authLoggedOut.classList.add('hidden');
    elements.authLoggedIn.classList.remove('hidden');
    elements.userEmail.textContent = session.user.email;

    // Update profile button to show active state
    if (elements.profileBtn) {
      elements.profileBtn.style.color = 'var(--celadon-dark)';
    }
  } else {
    // Logged Out
    elements.authLoggedOut.classList.remove('hidden');
    elements.authLoggedIn.classList.add('hidden');
    elements.userEmail.textContent = '';

    // Reset profile button
    if (elements.profileBtn) {
      elements.profileBtn.style.color = '';
    }
  }

  if (elements.authLoading) {
    elements.authLoading.classList.add('hidden');
  }
}

function openProfileModal() {
  if (elements.profileModal) {
    elements.profileModal.classList.remove('hidden');
  }
}

function closeProfileModal() {
  if (elements.profileModal) {
    elements.profileModal.classList.add('hidden');
  }
}

