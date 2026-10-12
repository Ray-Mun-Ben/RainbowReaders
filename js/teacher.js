// Rainbow Readers - Teacher Module
// Class Overview (Screenshot 4), Analytics (Screenshot 3), TV Mode (Screenshot 1)

import { store } from './store.js';
import { sound } from './audio.js';
import { CURRICULUM_ACTIVITIES } from './data.js';

let activeGradeFilter = 'all'; // 'all' | 1 | 2 | 3
let tvSelection = {
  grade: 2,
  pathway: 'Growing',
  activityId: null,
  step: 1 // 1: Grade, 2: Pathway, 3: Activity, 4: Display Screen
};

// ==========================================
// 1. CLASS OVERVIEW (SCREENSHOT 4 REPLICA)
// ==========================================
export function renderTeacherClassOverview() {
  const students = store.state.students;
  const filteredStudents = activeGradeFilter === 'all' 
    ? students 
    : students.filter(s => s.grade === Number(activeGradeFilter));

  return `
    <div class="teacher-view-container">
      <div class="view-header">
        <h1 class="view-title">Class Overview</h1>
        <p class="view-subtitle">${students.length} learners across Grades 1, 2, 3</p>
      </div>

      <!-- Grade Filter Pills -->
      <div class="filter-pills-row">
        <button class="filter-pill ${activeGradeFilter === 'all' ? 'active' : ''}" data-filter="all">All Grades</button>
        <button class="filter-pill ${activeGradeFilter === 1 ? 'active' : ''}" data-filter="1">Grade 1</button>
        <button class="filter-pill ${activeGradeFilter === 2 ? 'active' : ''}" data-filter="2">Grade 2</button>
        <button class="filter-pill ${activeGradeFilter === 3 ? 'active' : ''}" data-filter="3">Grade 3</button>
      </div>

      <!-- Learners Table Card -->
      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>Class</th>
              <th>Pathway</th>
              <th>Progress</th>
              <th>Last activity</th>
            </tr>
          </thead>
          <tbody>
            ${filteredStudents.map(student => {
              const pathwayClass = student.pathway.toLowerCase();
              const percent = Math.min(100, Math.round((student.progress.completed / student.progress.total) * 100));
              return `
                <tr>
                  <td class="td-name">
                    <span class="learner-name">${student.name}</span>
                    ${student.needsSupport ? '<span class="tag-support">Needs support</span>' : ''}
                  </td>
                  <td>Grade ${student.grade}</td>
                  <td>${student.classRoom}</td>
                  <td>
                    <span class="pathway-badge badge-${pathwayClass}">
                      <span class="badge-square"></span> ${student.pathway}
                    </span>
                  </td>
                  <td>
                    <div class="table-progress-cell">
                      <div class="progress-bar-wrap-sm">
                        <div class="progress-bar-fill-sm fill-${pathwayClass}" style="width: ${percent}%"></div>
                      </div>
                      <span class="progress-fraction">${student.progress.completed}/${student.progress.total}</span>
                    </div>
                  </td>
                  <td class="td-date">${student.lastActivity}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================
// 2. PROGRESS & ANALYTICS (SCREENSHOT 3 REPLICA)
// ==========================================
export function renderTeacherAnalytics() {
  const students = store.state.students;

  // Calculate pathway counts per grade
  const getGradeDist = (gradeNum) => {
    const list = students.filter(s => s.grade === gradeNum);
    const starting = list.filter(s => s.pathway === 'Starting').length;
    const growing = list.filter(s => s.pathway === 'Growing').length;
    const exploring = list.filter(s => s.pathway === 'Exploring').length;
    const total = list.length || 1;
    return { starting, growing, exploring, total };
  };

  const g1 = getGradeDist(1);
  const g2 = getGradeDist(2);
  const g3 = getGradeDist(3);

  // Learners needing support
  const supportStudents = students.filter(s => s.needsSupport);

  return `
    <div class="teacher-view-container">
      <div class="view-header">
        <h1 class="view-title">Progress & Analytics</h1>
        <p class="view-subtitle">A class-level view — never a ranked list of learners.</p>
      </div>

      <!-- Pathway Distribution Card -->
      <div class="analytics-card">
        <h2 class="card-inner-title">Pathway distribution by grade</h2>

        <!-- Grade 1 Distribution -->
        <div class="dist-row">
          <div class="dist-row-label">Grade 1</div>
          <div class="segmented-bar">
            <div class="seg-fill seg-starting" style="width: ${(g1.starting / g1.total) * 100}%"></div>
            <div class="seg-fill seg-growing" style="width: ${(g1.growing / g1.total) * 100}%"></div>
            <div class="seg-fill seg-exploring" style="width: ${(g1.exploring / g1.total) * 100}%"></div>
          </div>
          <div class="dist-legend-row">
            <span class="legend-chip chip-starting"><span class="chip-dot"></span> Starting: ${g1.starting}</span>
            <span class="legend-chip chip-growing"><span class="chip-dot"></span> Growing: ${g1.growing}</span>
            <span class="legend-chip chip-exploring"><span class="chip-dot"></span> Exploring: ${g1.exploring}</span>
          </div>
        </div>

        <!-- Grade 2 Distribution -->
        <div class="dist-row">
          <div class="dist-row-label">Grade 2</div>
          <div class="segmented-bar">
            <div class="seg-fill seg-starting" style="width: ${(g2.starting / g2.total) * 100}%"></div>
            <div class="seg-fill seg-growing" style="width: ${(g2.growing / g2.total) * 100}%"></div>
            <div class="seg-fill seg-exploring" style="width: ${(g2.exploring / g2.total) * 100}%"></div>
          </div>
          <div class="dist-legend-row">
            <span class="legend-chip chip-starting"><span class="chip-dot"></span> Starting: ${g2.starting}</span>
            <span class="legend-chip chip-growing"><span class="chip-dot"></span> Growing: ${g2.growing}</span>
            <span class="legend-chip chip-exploring"><span class="chip-dot"></span> Exploring: ${g2.exploring}</span>
          </div>
        </div>

        <!-- Grade 3 Distribution -->
        <div class="dist-row">
          <div class="dist-row-label">Grade 3</div>
          <div class="segmented-bar">
            <div class="seg-fill seg-starting" style="width: ${(g3.starting / g3.total) * 100}%"></div>
            <div class="seg-fill seg-growing" style="width: ${(g3.growing / g3.total) * 100}%"></div>
            <div class="seg-fill seg-exploring" style="width: ${(g3.exploring / g3.total) * 100}%"></div>
          </div>
          <div class="dist-legend-row">
            <span class="legend-chip chip-starting"><span class="chip-dot"></span> Starting: ${g3.starting}</span>
            <span class="legend-chip chip-growing"><span class="chip-dot"></span> Growing: ${g3.growing}</span>
            <span class="legend-chip chip-exploring"><span class="chip-dot"></span> Exploring: ${g3.exploring}</span>
          </div>
        </div>
      </div>

      <!-- Extra Support Table Card -->
      <div class="analytics-card" style="margin-top: 1.5rem;">
        <h2 class="card-inner-title">Learners who may benefit from extra support</h2>

        <div class="table-card-inner">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Pathway</th>
                <th>Last activity</th>
              </tr>
            </thead>
            <tbody>
              ${supportStudents.map(student => `
                <tr>
                  <td class="td-name"><strong>${student.name}</strong></td>
                  <td>Grade ${student.grade}</td>
                  <td>
                    <span class="pathway-badge badge-${student.pathway.toLowerCase()}">
                      <span class="badge-square"></span> ${student.pathway}
                    </span>
                  </td>
                  <td class="td-date">${student.lastActivity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 3. TV / CLASSROOM MODE (SCREENSHOT 1 REPLICA)
// ==========================================
export function renderTeacherTVMode() {
  if (tvSelection.step === 4) {
    return renderTVDisplayScreen();
  }

  return `
    <div class="teacher-view-container tv-mode-setup">
      <div class="view-header">
        <h1 class="view-title">📺 TV / Classroom Mode</h1>
        <p class="view-subtitle">Pick a grade, pathway and activity to display on the classroom TV.</p>
      </div>

      <!-- Stepper Pills -->
      <div class="tv-stepper-row">
        <button class="tv-step-pill ${tvSelection.step === 1 ? 'active' : ''}" data-tv-step="1">1. Grade</button>
        <button class="tv-step-pill ${tvSelection.step === 2 ? 'active' : ''}" data-tv-step="2">2. Pathway</button>
        <button class="tv-step-pill ${tvSelection.step === 3 ? 'active' : ''}" data-tv-step="3">3. Activity</button>
      </div>

      <div class="tv-step-content-area">
        ${renderTVStepContent()}
      </div>
    </div>
  `;
}

function renderTVStepContent() {
  if (tvSelection.step === 1) {
    // Step 1: Grade Cards (matching Screenshot 1)
    return `
      <div class="tv-cards-grid">
        <div class="tv-selection-card ${tvSelection.grade === 1 ? 'selected' : ''}" data-select-grade="1">
          <div class="school-icon">🏫</div>
          <h3>Grade 1</h3>
        </div>
        <div class="tv-selection-card ${tvSelection.grade === 2 ? 'selected' : ''}" data-select-grade="2">
          <div class="school-icon">🏫</div>
          <h3>Grade 2</h3>
        </div>
        <div class="tv-selection-card ${tvSelection.grade === 3 ? 'selected' : ''}" data-select-grade="3">
          <div class="school-icon">🏫</div>
          <h3>Grade 3</h3>
        </div>
      </div>
    `;
  }

  if (tvSelection.step === 2) {
    // Step 2: Pathway Cards
    return `
      <div class="tv-cards-grid">
        <div class="tv-pathway-card pathway-starting ${tvSelection.pathway === 'Starting' ? 'selected' : ''}" data-select-pathway="Starting">
          <div class="pathway-icon-large">🟦</div>
          <h3>Starting</h3>
          <p>Phonics & Syllable Blends</p>
        </div>
        <div class="tv-pathway-card pathway-growing ${tvSelection.pathway === 'Growing' ? 'selected' : ''}" data-select-pathway="Growing">
          <div class="pathway-icon-large">⭐</div>
          <h3>Growing</h3>
          <p>Vowels & Short Sentences</p>
        </div>
        <div class="tv-pathway-card pathway-exploring ${tvSelection.pathway === 'Exploring' ? 'selected' : ''}" data-select-pathway="Exploring">
          <div class="pathway-icon-large">🌿</div>
          <h3>Exploring</h3>
          <p>Extended Story Reading</p>
        </div>
      </div>
    `;
  }

  if (tvSelection.step === 3) {
    // Step 3: Activity Cards
    const matched = CURRICULUM_ACTIVITIES.filter(
      a => a.grade === tvSelection.grade && a.pathway === tvSelection.pathway
    );
    const acts = matched.length > 0 ? matched : CURRICULUM_ACTIVITIES.filter(a => a.grade === tvSelection.grade);

    return `
      <div class="tv-activities-list">
        <h3>Choose an Activity to Project for Grade ${tvSelection.grade} (${tvSelection.pathway}):</h3>
        <div class="tv-act-grid">
          ${acts.map(act => `
            <div class="tv-act-card" data-launch-act="${act.id}">
              <div class="tv-act-badge badge-${act.pathway.toLowerCase()}">${act.pathway}</div>
              <h4>${act.title}</h4>
              <p>${act.description}</p>
              <button class="btn btn-primary btn-block">🚀 Project on Classroom TV</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return '';
}

// Projector / Big Screen Classroom TV Display
function renderTVDisplayScreen() {
  const act = CURRICULUM_ACTIVITIES.find(a => a.id === tvSelection.activityId) || CURRICULUM_ACTIVITIES[4];

  return `
    <div class="tv-projector-container">
      <div class="tv-projector-topbar">
        <div class="tv-projector-badge">
          📺 Classroom TV Mode • Grade ${act.grade} • ${act.pathway} Pathway
        </div>
        <button id="btn-exit-tv" class="btn btn-outline btn-sm">
          &larr; Exit Classroom TV Mode
        </button>
      </div>

      <div class="tv-projector-main-card">
        <span class="tv-act-tag">${act.title}</span>
        
        <!-- Large Sentence Display for Classroom Viewing -->
        <div class="tv-big-text-display">
          "${act.sentence}"
        </div>

        <!-- Big Audio Broadcast Trigger -->
        <div class="tv-big-controls">
          <button id="btn-tv-broadcast-audio" class="btn btn-primary btn-xl">
            🔊 Broadcast Audio to Class
          </button>
          <button id="btn-tv-slow-audio" class="btn btn-outline btn-xl">
            🐢 Repeat Slowly (Chorus Pace)
          </button>
        </div>

        <!-- Class Comprehension Poll -->
        <div class="tv-class-poll-box">
          <h3 class="tv-poll-question">❓ Question for the Class: "${act.question}"</h3>
          <div class="tv-poll-options">
            ${act.options.map((opt, i) => `
              <div class="tv-poll-option" data-correct="${opt === act.correctAnswer}">
                <span class="poll-letter">${String.fromCharCode(65 + i)}</span>
                <span class="poll-text">${opt}</span>
              </div>
            `).join('')}
          </div>
          <div id="tv-poll-feedback" class="tv-poll-feedback"></div>
        </div>
      </div>
    </div>
  `;
}

// Event Bindings for Teacher Portal
export function bindTeacherEvents(container) {
  // Class overview filters
  container.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const filterVal = pill.getAttribute('data-filter');
      activeGradeFilter = filterVal === 'all' ? 'all' : Number(filterVal);
      sound.playClick();
      container.innerHTML = renderTeacherClassOverview();
      bindTeacherEvents(container);
    });
  });

  // TV mode stepper pills
  container.querySelectorAll('.tv-step-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      tvSelection.step = Number(pill.getAttribute('data-tv-step'));
      sound.playClick();
      container.innerHTML = renderTeacherTVMode();
      bindTeacherEvents(container);
    });
  });

  // Grade selection cards (Screenshot 1)
  container.querySelectorAll('[data-select-grade]').forEach(card => {
    card.addEventListener('click', () => {
      tvSelection.grade = Number(card.getAttribute('data-select-grade'));
      tvSelection.step = 2; // advance to pathway
      sound.playClick();
      container.innerHTML = renderTeacherTVMode();
      bindTeacherEvents(container);
    });
  });

  // Pathway selection cards
  container.querySelectorAll('[data-select-pathway]').forEach(card => {
    card.addEventListener('click', () => {
      tvSelection.pathway = card.getAttribute('data-select-pathway');
      tvSelection.step = 3; // advance to activity
      sound.playClick();
      container.innerHTML = renderTeacherTVMode();
      bindTeacherEvents(container);
    });
  });

  // Launch TV Activity
  container.querySelectorAll('[data-launch-act]').forEach(card => {
    card.addEventListener('click', () => {
      tvSelection.activityId = card.getAttribute('data-launch-act');
      tvSelection.step = 4; // launch projector screen
      sound.playSuccessChime();
      container.innerHTML = renderTeacherTVMode();
      bindTeacherEvents(container);
    });
  });

  // TV Display screen actions
  const exitTvBtn = container.querySelector('#btn-exit-tv');
  if (exitTvBtn) {
    exitTvBtn.addEventListener('click', () => {
      tvSelection.step = 1;
      container.innerHTML = renderTeacherTVMode();
      bindTeacherEvents(container);
    });
  }

  const broadcastAudioBtn = container.querySelector('#btn-tv-broadcast-audio');
  if (broadcastAudioBtn) {
    broadcastAudioBtn.addEventListener('click', () => {
      const act = CURRICULUM_ACTIVITIES.find(a => a.id === tvSelection.activityId) || CURRICULUM_ACTIVITIES[4];
      sound.speak(act.sentence, { rate: 0.85, pitch: 1.0 });
    });
  }

  const slowAudioBtn = container.querySelector('#btn-tv-slow-audio');
  if (slowAudioBtn) {
    slowAudioBtn.addEventListener('click', () => {
      const act = CURRICULUM_ACTIVITIES.find(a => a.id === tvSelection.activityId) || CURRICULUM_ACTIVITIES[4];
      sound.speak(act.sentence, { rate: 0.65, pitch: 1.0 });
    });
  }

  // TV poll option reveal
  container.querySelectorAll('.tv-poll-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const isCorrect = opt.getAttribute('data-correct') === 'true';
      const feedback = container.querySelector('#tv-poll-feedback');
      if (isCorrect) {
        opt.classList.add('correct');
        sound.playSuccessChime();
        if (feedback) feedback.innerHTML = '🎉 Class Consensus Correct! Well done!';
      } else {
        opt.classList.add('incorrect');
        sound.playTone(220, 'sawtooth', 0.2);
        if (feedback) feedback.innerHTML = '❌ Let us re-read the sentence together!';
      }
    });
  });
}
