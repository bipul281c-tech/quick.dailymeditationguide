// Guided Meditation Chrome Extension
// API Integration and UI Controller

// Default API configuration
const API_BASE_URL = 'http://localhost:3000';

// State
let meditations = [];
let currentMeditation = null;
let isPlaying = false;

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
  totalTimeEl: null
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  setupEventListeners();
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


  // Audio Player
  elements.playPauseBtn.addEventListener('click', togglePlayPause);
  elements.progressBar.addEventListener('input', handleSeek);

  // Audio events
  elements.audioElement.addEventListener('timeupdate', updateProgress);
  elements.audioElement.addEventListener('ended', handleAudioEnded);
  elements.audioElement.addEventListener('loadedmetadata', updateDuration);
  elements.audioElement.addEventListener('error', handleAudioError);
}

// Fetch meditations from API
async function fetchMeditations(query = '') {
  showLoading();
  hideError();

  try {
    const url = query
      ? `${API_BASE_URL}/api/meditations?q=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/api/meditations`;

    const response = await fetch(url);

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

// Group meditations by category
function groupMeditationsByCategory(meditationList) {
  const groups = {};
  const categoryOrder = ['Featured', 'Sleep', 'Focus', 'Calm', 'Anxiety', 'Stress', 'Nature', 'Other'];

  meditationList.forEach(meditation => {
    // Determine category from keywords or title
    let category = 'Other';
    const keywords = meditation.keywords || [];
    const titleLower = meditation.title.toLowerCase();
    const descLower = meditation.description.toLowerCase();

    // Check for specific categories
    if (keywords.some(k => k.toLowerCase().includes('sleep')) || titleLower.includes('sleep')) {
      category = 'Sleep';
    } else if (keywords.some(k => k.toLowerCase().includes('focus')) || titleLower.includes('focus')) {
      category = 'Focus';
    } else if (keywords.some(k => k.toLowerCase().includes('calm')) || titleLower.includes('calm') || titleLower.includes('relax')) {
      category = 'Calm';
    } else if (keywords.some(k => k.toLowerCase().includes('anxiety')) || titleLower.includes('anxiety')) {
      category = 'Anxiety';
    } else if (keywords.some(k => k.toLowerCase().includes('stress')) || titleLower.includes('stress')) {
      category = 'Stress';
    } else if (keywords.some(k => k.toLowerCase().includes('nature')) || titleLower.includes('nature') || titleLower.includes('forest') || titleLower.includes('ocean')) {
      category = 'Nature';
    }

    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(meditation);
  });

  // Sort groups by predefined order
  const sortedGroups = {};
  categoryOrder.forEach(cat => {
    if (groups[cat] && groups[cat].length > 0) {
      sortedGroups[cat] = groups[cat];
    }
  });

  // Add any remaining categories
  Object.keys(groups).forEach(cat => {
    if (!sortedGroups[cat] && groups[cat].length > 0) {
      sortedGroups[cat] = groups[cat];
    }
  });

  return sortedGroups;
}

// Get category icon SVG
function getCategoryIcon(category) {
  const icons = {
    'Featured': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    'Sleep': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',
    'Focus': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2m-10-10h2m16 0h2"></path></svg>',
    'Calm': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2m7.6-7.4A2 2 0 1 1 11 8H2m10.6 11.4A2 2 0 1 1 14 16H2"></path></svg>',
    'Anxiety': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>',
    'Stress': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 15h8M9 9h.01M15 9h.01"></path></svg>',
    'Nature': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 14 4-9 4 9M6 14h4m-4 8 6-10 6 10"></path></svg>',
    'Other': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l2 2"></path></svg>'
  };
  return icons[category] || icons['Other'];
}

// Get category color class
function getCategoryColorClass(category) {
  const colors = {
    'Featured': 'category-amber',
    'Sleep': 'category-indigo',
    'Focus': 'category-amber',
    'Calm': 'category-teal',
    'Anxiety': 'category-rose',
    'Stress': 'category-rose',
    'Nature': 'category-emerald',
    'Other': 'category-stone'
  };
  return colors[category] || 'category-stone';
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
  elements.playerTime.textContent = 'Visualization • 10 min';

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

// Toggle play/pause
function togglePlayPause() {
  if (!currentMeditation) return;

  if (isPlaying) {
    elements.audioElement.pause();
    isPlaying = false;
    elements.playIconSVG.style.display = 'block';
    elements.pauseIconSVG.style.display = 'none';
  } else {
    elements.audioElement.play()
      .then(() => {
        isPlaying = true;
        elements.playIconSVG.style.display = 'none';
        elements.pauseIconSVG.style.display = 'block';
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

  // Update progress bar fill and knob
  const progressBar = document.getElementById('progressBar');
  const progressKnob = document.getElementById('progressKnob');
  if (progressBar) progressBar.style.width = `${progress}%`;
  if (progressKnob) progressKnob.style.left = `${progress}%`;

  // Update time display
  if (elements.currentTimeEl) {
    elements.currentTimeEl.textContent = formatTime(elements.audioElement.currentTime);
  }
}

// Update duration display
function updateDuration() {
  if (elements.totalTimeEl) {
    elements.totalTimeEl.textContent = formatTime(elements.audioElement.duration);
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

