// Rainbow Readers - Parent Module
// Parent Dashboard and Milestones (Screenshot 2 Replica)

import { store } from './store.js';
import { sound } from './audio.js';

export function renderParentDashboard() {
  const user = store.getCurrentUser();
  const amani = store.state.students.find(s => s.name === 'Amani Otieno') || {
    name: 'Amani Otieno',
    grade: 2,
    pathway: 'Growing',
    progress: { completed: 2, total: 3 }
  };
  const pathwayClass = amani.pathway.toLowerCase();

  return `
    <div class="parent-view-container">
      <div class="view-header">
        <h1 class="view-title">Parent Dashboard</h1>
        <p class="view-subtitle">Supporting ${user.studentName || 'Amani'}'s reading journey between school and home.</p>
      </div>

      <!-- Child Snapshot Card -->
      <div class="parent-child-card">
        <div class="child-card-header">
          <div class="child-avatar">👦🏾</div>
          <div>
            <h2>${amani.name}</h2>
            <p>Madaraka Primary School • Grade ${amani.grade} • Class 2A</p>
          </div>
          <div class="pathway-badge badge-${pathwayClass}" style="margin-left: auto;">
            <span class="badge-square"></span> ${amani.pathway} Pathway
          </div>
        </div>

        <div class="child-card-body">
          <div class="home-progress-box">
            <div class="home-progress-info">
              <span>Current Term Reading Goals</span>
              <span><strong>${amani.progress.completed} of ${amani.progress.total}</strong> activities completed</span>
            </div>
            <div class="progress-bar-wrap">
              <div 
                class="progress-bar-fill fill-${pathwayClass}" 
                style="width: ${(amani.progress.completed / amani.progress.total) * 100}%"
              ></div>
            </div>
          </div>

          <div class="teacher-note-banner">
            <span class="note-sender">👩🏾‍🏫 Teacher's Note from Mrs. Wanjiru Kamau:</span>
            <p>
              "Amani is making steady strides with vowel sounds and reading short phrases! Consistent 10-minute bedtime reading on your phone will help solidify syllable blending."
            </p>
          </div>
        </div>
      </div>

      <!-- Home Reading Tips & Audio Practice -->
      <div class="parent-grid-two">
        <div class="parent-card">
          <h3 class="card-inner-title">📱 Reading at Home on a Shared Phone</h3>
          <ul class="home-tips-list">
            <li>
              <strong>Short and Sweet:</strong> 8 to 10 minutes a day is more effective than long, tiring sessions.
            </li>
            <li>
              <strong>Let Them Press Audio:</strong> Allow your child to tap the audio speaker repeatedly until they feel ready to say the word themselves.
            </li>
            <li>
              <strong>Praise the Effort:</strong> Focus on persistence and sounding out difficult blends rather than perfection.
            </li>
          </ul>
        </div>

        <div class="parent-card">
          <h3 class="card-inner-title">🔊 Practice Today's Sounds Together</h3>
          <p class="home-practice-sub">Tap to listen and pronounce together with your child:</p>
          <div class="home-audio-chips">
            <button class="sound-chip btn-speak-home" data-speak="Ba, Do, Re, Ad">
              <span>Ba • Do • Re • Ad</span> 🔊
            </button>
            <button class="sound-chip btn-speak-home" data-speak="Red, Bed, Bad, Rob, Ball">
              <span>Red • Bed • Bad • Rob • Ball</span> 🔊
            </button>
            <button class="sound-chip btn-speak-home" data-speak="The boy has a red ball.">
              <span>"The boy has a red ball"</span> 🔊
            </button>
          </div>
          <a href="#/parent/milestones" class="btn btn-outline btn-block" style="margin-top: 1rem;">
            🏅 View Reading Milestones &rarr;
          </a>
        </div>
      </div>
    </div>
  `;
}

// Faithful reproduction of Screenshot 2
export function renderParentMilestones() {
  const user = store.getCurrentUser();
  const milestones = store.state.milestones;
  const childName = user.studentName || 'Amani Otieno';

  return `
    <div class="parent-view-container">
      <div class="view-header">
        <h1 class="view-title">🏅 Milestones</h1>
        <p class="view-subtitle">${childName}'s reading achievements so far.</p>
      </div>

      <!-- Milestones List (Matching Screenshot 2 Cards) -->
      <div class="milestones-card-list">
        ${milestones.map(m => `
          <div class="milestone-card type-${m.type || 'seed'}">
            <div class="milestone-icon">${m.icon}</div>
            <div class="milestone-info">
              <h3 class="milestone-title">${m.title}</h3>
              <span class="milestone-date">${m.date}</span>
              ${m.desc ? `<p class="milestone-subtext">${m.desc}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function bindParentEvents(container) {
  container.querySelectorAll('.btn-speak-home').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-speak');
      sound.speak(text, { rate: 0.8 });
    });
  });
}
