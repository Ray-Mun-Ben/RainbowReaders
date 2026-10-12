// Rainbow Readers - Student Module
// Manages Student Dashboard, Grade Selection, 5-Stage Assessment, and Pathway Activities

import { store } from './store.js';
import { sound } from './audio.js';
import { BASELINE_ASSESSMENT, CURRICULUM_ACTIVITIES } from './data.js';

let currentStageIndex = 0; // 0 to 4 for stages 1 to 5
let selectedAssessmentGrade = 2;
let selectedAnswer = null;
let activeHighlightWordIdx = -1;

export function renderStudentDashboard() {
  const user = store.getCurrentUser();
  const progress = store.state.studentProgress;
  const pathway = progress.pathway; // 'Starting' | 'Growing' | 'Exploring'

  const pathwayClass = {
    Starting: 'starting',
    Growing: 'growing',
    Exploring: 'exploring'
  }[pathway] || 'starting';

  // Activities for current grade
  const gradeActivities = CURRICULUM_ACTIVITIES.filter(a => a.grade === progress.currentGrade);

  return `
    <div class="dashboard-layout">
      <!-- Student Top Header -->
      <div class="student-header-banner">
        <div class="student-welcome">
          <div class="student-avatar-big">${user.avatar || '👦🏾'}</div>
          <div>
            <h1 class="student-title">Jambo, ${user.name}! 🌟</h1>
            <p class="student-sub">
              Madaraka Primary • Grade ${progress.currentGrade} • Class ${user.classRoom || '2A'}
            </p>
          </div>
        </div>

        <div class="student-badge-pill pill-${pathwayClass}">
          <span class="pathway-pulse"></span>
          <span>Current Pathway: <strong>${pathway}</strong></span>
        </div>
      </div>

      <!-- Quick Action / Baseline Status -->
      ${!progress.hasCompletedBaseline ? `
        <div class="baseline-prompt-card">
          <div class="prompt-icon">🚀</div>
          <div class="prompt-content">
            <h2>Ready to Begin Your Reading Journey?</h2>
            <p>
              Take our quick, fun 5-stage comprehension check! We will practice letters, syllables, words, read a sentence, and answer a question to set up your learning path.
            </p>
            <div class="prompt-grade-selection">
              <span class="grade-select-label">Choose your grade level:</span>
              <div class="grade-pills">
                <button class="grade-btn" data-grade="1">Grade 1</button>
                <button class="grade-btn active-recommended" data-grade="2">
                  Grade 2 <span class="tag-rec">⭐ Recommended Demo</span>
                </button>
                <button class="grade-btn" data-grade="3">Grade 3</button>
              </div>
            </div>
            <div class="prompt-action-row">
              <button id="btn-start-baseline" class="btn btn-primary btn-lg">
                Start Baseline Check &rarr;
              </button>
            </div>
          </div>
        </div>
      ` : `
        <div class="journey-summary-grid">
          <!-- Pathway Status Card -->
          <div class="summary-card status-card">
            <span class="card-tag">Active Pathway</span>
            <div class="pathway-indicator pathway-${pathwayClass}">
              <div class="pathway-icon">
                ${pathway === 'Starting' ? '🟦' : pathway === 'Growing' ? '⭐' : '🌿'}
              </div>
              <div class="pathway-text">
                <h3>${pathway} Pathway</h3>
                <p>
                  ${pathway === 'Starting' 
                    ? 'Practising letter sounds, phonics, and simple syllable blending.' 
                    : pathway === 'Growing' 
                    ? 'Practising vowels, consonant blends, and sentence comprehension.' 
                    : 'Exploring advanced stories and Grade 3 reading previews!'}
                </p>
              </div>
            </div>
            <div class="pathway-progress-row">
              <div class="progress-label">
                <span>Pathway Progress</span>
                <span>${progress.completedActivityIds.length} / 5 completed</span>
              </div>
              <div class="progress-bar-wrap">
                <div 
                  class="progress-bar-fill fill-${pathwayClass}" 
                  style="width: ${Math.min(100, (progress.completedActivityIds.length / 5) * 100)}%"
                ></div>
              </div>
            </div>
            ${pathway === 'Growing' ? `
              <p class="unlock-note">
                💡 <strong>Tip:</strong> Complete 4 or 5 activities in Growing to unlock the <em>Exploring</em> pathway!
              </p>
            ` : ''}
          </div>

          <!-- Earned Badges & Stickers Card -->
          <div class="summary-card badges-card">
            <span class="card-tag">My Stickers & Badges</span>
            <div class="badges-list">
              ${progress.earnedBadges.map(b => `
                <div class="badge-item">
                  <div class="badge-icon">${b.icon}</div>
                  <div class="badge-info">
                    <h4>${b.title}</h4>
                    <span class="badge-date">Earned ${b.date}</span>
                    <p class="badge-desc">${b.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Grade Activities Section -->
        <div class="student-activities-section">
          <div class="section-header-compact">
            <h2>Your Grade ${progress.currentGrade} Practice Activities</h2>
            <p>Listen to audio prompts, read along, and answer the check questions</p>
          </div>

          <div class="activities-grid">
            ${gradeActivities.map((act) => {
              const isDone = progress.completedActivityIds.includes(act.id);
              return `
                <div class="activity-card ${isDone ? 'activity-completed' : ''}" data-act-id="${act.id}">
                  <div class="act-top">
                    <span class="act-pathway-badge badge-${act.pathway.toLowerCase()}">${act.pathway}</span>
                    ${isDone ? '<span class="act-status-done">✓ Completed</span>' : ''}
                  </div>
                  <h3>${act.title}</h3>
                  <p class="act-desc">${act.description}</p>
                  <div class="act-focus">
                    <strong>Focus:</strong> ${act.focus}
                  </div>
                  <button class="btn btn-outline btn-sm btn-play-activity" data-act-id="${act.id}">
                    ${isDone ? '🔄 Practice Again' : '▶ Start Activity'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>

          <div class="retake-assessment-box">
            <span>Want to re-establish your baseline or test a different grade?</span>
            <button id="btn-retake-baseline" class="btn btn-ghost btn-sm">Retake 5-Stage Assessment</button>
          </div>
        </div>
      `}
    </div>
  `;
}

// 5-Stage Comprehension Baseline Assessment View
export function renderBaselineAssessment() {
  const stage = BASELINE_ASSESSMENT.stages[currentStageIndex];
  const totalStages = BASELINE_ASSESSMENT.stages.length;

  return `
    <div class="assessment-container">
      <!-- Assessment Progress Stepper -->
      <div class="assessment-stepper-header">
        <div class="stepper-title-row">
          <a href="#/student/dashboard" class="btn-back-link">&larr; Back to Dashboard</a>
          <span class="stepper-badge">Baseline Reading Check • Grade ${selectedAssessmentGrade}</span>
        </div>

        <div class="stepper-bar-wrap">
          ${BASELINE_ASSESSMENT.stages.map((st, idx) => `
            <div class="stepper-step ${idx === currentStageIndex ? 'active' : ''} ${idx < currentStageIndex ? 'completed' : ''}">
              <div class="step-circle">${idx < currentStageIndex ? '✓' : idx + 1}</div>
              <span class="step-name">${st.title.split(':')[1] || st.title}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Stage Card Content -->
      <div class="assessment-card">
        <div class="stage-info-bar">
          <span class="stage-pill">Stage ${currentStageIndex + 1} of ${totalStages}</span>
          <h2 class="stage-title">${stage.title}</h2>
          <p class="stage-instruction">${stage.instruction}</p>
        </div>

        <div class="stage-body">
          ${renderStageContent(stage)}
        </div>

        <!-- Navigation Footer -->
        <div class="stage-footer">
          ${currentStageIndex > 0 ? `
            <button id="btn-prev-stage" class="btn btn-ghost">
              &larr; Previous Stage
            </button>
          ` : `<div></div>`}

          <div class="stage-footer-actions">
            ${currentStageIndex < totalStages - 1 ? `
              <button id="btn-next-stage" class="btn btn-primary btn-lg">
                Next Stage &rarr;
              </button>
            ` : `
              <button id="btn-finish-assessment" class="btn btn-success btn-lg" ${selectedAnswer === null ? 'disabled' : ''}>
                Claim Starter Badge & Finish! 🏆
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStageContent(stage) {
  switch (stage.stageNumber) {
    case 1:
      // Letters pronunciation
      return `
        <div class="letters-stage-grid">
          ${stage.items.map(item => `
            <div class="letter-card" data-speak="${item.char}" data-phonetic="${item.phonetic}">
              <div class="letter-char">${item.char}</div>
              <div class="letter-example">${item.example}</div>
              <button class="btn-audio-circle btn-speak-letter" data-speak="${item.char}" title="Hear letter pronunciation">
                🔊
              </button>
            </div>
          `).join('')}
        </div>
        <div class="stage-helper-bar">
          <button id="btn-listen-all-letters" class="btn btn-outline btn-sm">
            🔊 Listen to All Letters
          </button>
          <span class="helper-text">Click any letter card to hear the sound!</span>
        </div>
      `;

    case 2:
      // Syllables blending
      return `
        <div class="syllables-stage-grid">
          ${stage.items.map(item => `
            <div class="syllable-card" data-speak="${item.speech}">
              <div class="syllable-breakdown">${item.breakdown}</div>
              <div class="syllable-arrow">&darr;</div>
              <div class="syllable-text">${item.text}</div>
              <div class="syllable-note">${item.note}</div>
              <button class="btn-audio-circle btn-speak-syllable" data-speak="${item.speech}" title="Repeat syllable sound">
                🔊
              </button>
            </div>
          `).join('')}
        </div>
        <div class="stage-helper-bar">
          <button id="btn-listen-all-syllables" class="btn btn-outline btn-sm">
            🔊 Repeat All Syllables
          </button>
          <span class="helper-text">Notice how combining two letters creates one syllable sound.</span>
        </div>
      `;

    case 3:
      // Simple 3-4 letter words
      return `
        <div class="words-stage-grid">
          ${stage.items.map(item => `
            <div class="word-card" data-speak="${item.speech}">
              <div class="word-icon">${item.icon}</div>
              <div class="word-text">${item.word}</div>
              <div class="word-meaning">${item.meaning}</div>
              <button class="btn-audio-circle btn-speak-word" data-speak="${item.speech}" title="Hear word">
                🔊
              </button>
            </div>
          `).join('')}
        </div>
        <div class="stage-helper-bar">
          <span class="helper-text">You are blending letters into words you know! Listen and repeat.</span>
        </div>
      `;

    case 4:
      // Sentence reading
      return `
        <div class="sentence-stage-container">
          <div class="sentence-display-box">
            ${stage.words.map((w, i) => `
              <span class="sentence-word ${i === activeHighlightWordIdx ? 'highlight-active' : ''}" data-idx="${i}">
                ${w}
              </span>
            `).join(' ')}
          </div>

          <div class="sentence-controls">
            <button id="btn-play-sentence" class="btn btn-primary btn-lg">
              🔊 Play Sentence Audio
            </button>
            <button id="btn-slow-sentence" class="btn btn-outline btn-lg">
              🐢 Play Slowly (0.7x)
            </button>
          </div>

          <div class="sentence-prompt-text">
            <span>🗣️ <strong>Your Turn:</strong> Say "The boy has a red ball" out loud!</span>
          </div>
        </div>
      `;

    case 5:
      // Comprehension MCQ
      return `
        <div class="comprehension-stage-container">
          <div class="passage-quote-box">
            <span class="quote-label">Sentence:</span>
            <p class="quote-text">"${stage.passage}"</p>
            <button class="btn-audio-inline btn-speak-passage" data-speak="${stage.passage}">
              🔊 Hear Sentence
            </button>
          </div>

          <div class="mcq-question-box">
            <h3 class="mcq-question">❓ ${stage.question}</h3>
            
            <div class="mcq-options-grid">
              ${stage.options.map((opt, i) => `
                <button 
                  class="mcq-option-btn ${selectedAnswer === opt.text ? (opt.isCorrect ? 'correct' : 'incorrect') : ''}" 
                  data-answer="${opt.text}"
                  data-correct="${opt.isCorrect}"
                >
                  <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                  <span class="option-text">${opt.text}</span>
                  ${selectedAnswer === opt.text ? (opt.isCorrect ? ' <span class="feedback-icon">✓</span>' : ' <span class="feedback-icon">✗</span>') : ''}
                </button>
              `).join('')}
            </div>

            <div id="mcq-feedback-msg" class="mcq-feedback-msg">
              ${selectedAnswer ? (
                selectedAnswer === 'Red' 
                  ? '🎉 <strong>Correct!</strong> The ball is red. You are ready to complete your baseline!' 
                  : '❌ Not quite. Listen to the sentence again: "The boy has a red ball". Try selecting Red!'
              ) : ''}
            </div>
          </div>
        </div>
      `;

    default:
      return '';
  }
}

// Celebration Modal on Completion
export function renderCompletionModal() {
  return `
    <div class="modal-overlay active" id="completion-modal">
      <div class="modal-card modal-celebration">
        <div class="celebration-confetti-top">🎊 🌟 🎈 🌟 🎊</div>
        <div class="badge-unlock-visual">
          <div class="badge-icon-shine">🌱</div>
        </div>
        <h2>Hongera, Amani! 🎉</h2>
        <p class="celebration-sub">
          You completed the Foundational Comprehension Check and earned your first achievement:
        </p>

        <div class="badge-awarded-banner">
          <h3>🌱 Starter Badge (First Steps)</h3>
          <p>
            Demonstrated letter recognition, syllable blending, and red ball sentence comprehension!
          </p>
        </div>

        <div class="celebration-pathway-unlocked">
          <span>Your Starting Pathway is now active!</span>
          <div class="pathway-pill pill-starting">
            <span class="pill-dot"></span> Starting (Blue)
          </div>
        </div>

        <p class="celebration-next-step">
          Check your updated progress, new practice activities, and earned stickers in your dashboard.
        </p>

        <button id="btn-return-dashboard" class="btn btn-primary btn-lg btn-block">
          View My Dashboard & Badges &rarr;
        </button>
      </div>
    </div>
  `;
}

// Activity Player Modal for practicing ongoing activities
export function renderActivityModal(actId) {
  const act = CURRICULUM_ACTIVITIES.find(a => a.id === actId);
  if (!act) return '';

  return `
    <div class="modal-overlay active" id="activity-modal">
      <div class="modal-card activity-modal-card">
        <div class="modal-header-row">
          <div>
            <span class="act-pathway-badge badge-${act.pathway.toLowerCase()}">${act.pathway} • Grade ${act.grade}</span>
            <h2 class="activity-modal-title">${act.title}</h2>
          </div>
          <button class="modal-close-btn" id="btn-close-activity">&times;</button>
        </div>

        <div class="activity-modal-body">
          <p class="act-desc">${act.description}</p>

          <div class="act-sound-items-box">
            <span class="box-label">Phonics / Target Items:</span>
            <div class="sound-pills">
              ${act.items.map(item => `
                <button class="sound-pill btn-speak-pill" data-speak="${item}">
                  ${item} 🔊
                </button>
              `).join('')}
            </div>
          </div>

          <div class="passage-quote-box">
            <span class="quote-label">Sentence:</span>
            <p class="quote-text">"${act.sentence}"</p>
            <button class="btn-audio-inline btn-speak-sentence" data-speak="${act.sentence}">
              🔊 Hear Sentence
            </button>
          </div>

          <div class="mcq-question-box">
            <h3 class="mcq-question">❓ ${act.question}</h3>
            <div class="mcq-options-grid">
              ${act.options.map((opt) => `
                <button 
                  class="mcq-option-btn modal-act-option" 
                  data-opt="${opt}" 
                  data-correct="${opt === act.correctAnswer}"
                >
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div id="activity-modal-feedback" class="mcq-feedback-msg"></div>
          </div>
        </div>

        <div class="modal-footer-row">
          <button class="btn btn-ghost" id="btn-cancel-activity">Close</button>
          <button class="btn btn-success" id="btn-submit-activity" disabled data-act-id="${act.id}">
            Mark Completed & Save Progress ✓
          </button>
        </div>
      </div>
    </div>
  `;
}

// Event Bindings for Student Flow
export function bindStudentEvents(container) {
  // Grade pills selection
  container.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      container.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active-recommended', 'active'));
      btn.classList.add('active-recommended');
      selectedAssessmentGrade = Number(btn.getAttribute('data-grade'));
      store.setStudentGrade(selectedAssessmentGrade);
      sound.playClick();
    });
  });

  // Start baseline
  const startBtn = container.querySelector('#btn-start-baseline');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      currentStageIndex = 0;
      selectedAnswer = null;
      window.location.hash = '#/student/assessment';
    });
  }

  // Retake baseline
  const retakeBtn = container.querySelector('#btn-retake-baseline');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      currentStageIndex = 0;
      selectedAnswer = null;
      window.location.hash = '#/student/assessment';
    });
  }

  // Assessment Stage 1: Letters Audio
  container.querySelectorAll('.btn-speak-letter, .letter-card').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const speakText = el.getAttribute('data-speak') || el.closest('[data-speak]')?.getAttribute('data-speak');
      if (speakText) {
        sound.speak(speakText, { rate: 0.75 });
      }
    });
  });

  const listenAllLettersBtn = container.querySelector('#btn-listen-all-letters');
  if (listenAllLettersBtn) {
    listenAllLettersBtn.addEventListener('click', () => {
      const stage = BASELINE_ASSESSMENT.stages[0];
      let i = 0;
      const playNext = () => {
        if (i < stage.items.length) {
          sound.speak(stage.items[i].char, {
            rate: 0.75,
            onEnd: () => {
              i++;
              setTimeout(playNext, 300);
            }
          });
        }
      };
      playNext();
    });
  }

  // Assessment Stage 2: Syllables Audio
  container.querySelectorAll('.btn-speak-syllable, .syllable-card').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const speakText = el.getAttribute('data-speak') || el.closest('[data-speak]')?.getAttribute('data-speak');
      if (speakText) {
        sound.speak(speakText, { rate: 0.8 });
      }
    });
  });

  const listenAllSyllablesBtn = container.querySelector('#btn-listen-all-syllables');
  if (listenAllSyllablesBtn) {
    listenAllSyllablesBtn.addEventListener('click', () => {
      const stage = BASELINE_ASSESSMENT.stages[1];
      let i = 0;
      const playNext = () => {
        if (i < stage.items.length) {
          sound.speak(stage.items[i].speech, {
            rate: 0.8,
            onEnd: () => {
              i++;
              setTimeout(playNext, 350);
            }
          });
        }
      };
      playNext();
    });
  }

  // Assessment Stage 3: Words Audio
  container.querySelectorAll('.btn-speak-word, .word-card').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const speakText = el.getAttribute('data-speak') || el.closest('[data-speak]')?.getAttribute('data-speak');
      if (speakText) {
        sound.speak(speakText, { rate: 0.82 });
      }
    });
  });

  // Assessment Stage 4: Sentence Audio
  const playSentenceBtn = container.querySelector('#btn-play-sentence');
  if (playSentenceBtn) {
    playSentenceBtn.addEventListener('click', () => {
      const stage = BASELINE_ASSESSMENT.stages[3];
      sound.speakSentenceWithHighlight(
        stage.words,
        (idx) => {
          activeHighlightWordIdx = idx;
          container.querySelectorAll('.sentence-word').forEach((wEl, i) => {
            if (i === idx) {
              wEl.classList.add('highlight-active');
            } else {
              wEl.classList.remove('highlight-active');
            }
          });
        },
        () => {
          container.querySelectorAll('.sentence-word').forEach(wEl => wEl.classList.remove('highlight-active'));
        }
      );
    });
  }

  const slowSentenceBtn = container.querySelector('#btn-slow-sentence');
  if (slowSentenceBtn) {
    slowSentenceBtn.addEventListener('click', () => {
      const stage = BASELINE_ASSESSMENT.stages[3];
      sound.speak(stage.audioText, { rate: 0.65 });
    });
  }

  // Assessment Stage 5: MCQ Selection
  container.querySelectorAll('.mcq-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedAnswer = btn.getAttribute('data-answer');
      const isCorrect = btn.getAttribute('data-correct') === 'true';

      if (isCorrect) {
        sound.playSuccessChime();
      } else {
        sound.playTone(220, 'sawtooth', 0.2);
      }

      // Re-render stage 5 content to show feedback and enable finish button
      const stageCard = container.querySelector('.stage-body');
      if (stageCard) {
        stageCard.innerHTML = renderStageContent(BASELINE_ASSESSMENT.stages[4]);
        bindStudentEvents(container);
      }
      const finishBtn = container.querySelector('#btn-finish-assessment');
      if (finishBtn) {
        finishBtn.disabled = !isCorrect;
      }
    });
  });

  const passageSpeakBtn = container.querySelector('.btn-speak-passage');
  if (passageSpeakBtn) {
    passageSpeakBtn.addEventListener('click', () => {
      sound.speak(passageSpeakBtn.getAttribute('data-speak'), { rate: 0.8 });
    });
  }

  // Stage Stepper Next/Prev
  const nextStageBtn = container.querySelector('#btn-next-stage');
  if (nextStageBtn) {
    nextStageBtn.addEventListener('click', () => {
      if (currentStageIndex < BASELINE_ASSESSMENT.stages.length - 1) {
        currentStageIndex++;
        sound.playClick();
        container.innerHTML = renderBaselineAssessment();
        bindStudentEvents(container);
      }
    });
  }

  const prevStageBtn = container.querySelector('#btn-prev-stage');
  if (prevStageBtn) {
    prevStageBtn.addEventListener('click', () => {
      if (currentStageIndex > 0) {
        currentStageIndex--;
        sound.playClick();
        container.innerHTML = renderBaselineAssessment();
        bindStudentEvents(container);
      }
    });
  }

  // Finish Assessment & Trigger Celebration
  const finishAssessmentBtn = container.querySelector('#btn-finish-assessment');
  if (finishAssessmentBtn) {
    finishAssessmentBtn.addEventListener('click', () => {
      sound.playCelebrationFanfare();
      store.completeBaselineAssessment();
      
      // Inject celebration modal
      const modalHost = document.createElement('div');
      modalHost.id = 'modal-host';
      modalHost.innerHTML = renderCompletionModal();
      document.body.appendChild(modalHost);

      const returnBtn = modalHost.querySelector('#btn-return-dashboard');
      if (returnBtn) {
        returnBtn.addEventListener('click', () => {
          modalHost.remove();
          window.location.hash = '#/student/dashboard';
        });
      }
    });
  }

  // Activity modal triggers
  container.querySelectorAll('.btn-play-activity').forEach(btn => {
    btn.addEventListener('click', () => {
      const actId = btn.getAttribute('data-act-id');
      const modalHost = document.createElement('div');
      modalHost.id = 'activity-modal-host';
      modalHost.innerHTML = renderActivityModal(actId);
      document.body.appendChild(modalHost);

      bindActivityModalEvents(modalHost, actId);
    });
  });
}

function bindActivityModalEvents(modalHost, actId) {
  const act = CURRICULUM_ACTIVITIES.find(a => a.id === actId);

  modalHost.querySelectorAll('.btn-speak-pill, .btn-speak-sentence').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.speak(btn.getAttribute('data-speak'), { rate: 0.8 });
    });
  });

  const submitBtn = modalHost.querySelector('#btn-submit-activity');
  const feedbackBox = modalHost.querySelector('#activity-modal-feedback');

  modalHost.querySelectorAll('.modal-act-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      modalHost.querySelectorAll('.modal-act-option').forEach(b => b.classList.remove('correct', 'incorrect'));
      
      if (isCorrect) {
        btn.classList.add('correct');
        sound.playSuccessChime();
        feedbackBox.innerHTML = `🎉 <strong>Excellent!</strong> Correct answer.`;
        feedbackBox.className = 'mcq-feedback-msg correct';
        if (submitBtn) submitBtn.disabled = false;
      } else {
        btn.classList.add('incorrect');
        sound.playTone(220, 'sawtooth', 0.2);
        feedbackBox.innerHTML = `❌ Try again! Listen to the sentence above carefully.`;
        feedbackBox.className = 'mcq-feedback-msg incorrect';
      }
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      store.completeActivity(actId);
      sound.playSuccessChime();
      modalHost.remove();
      window.location.hash = '#/student/dashboard';
    });
  }

  const closeBtn = modalHost.querySelector('#btn-close-activity');
  const cancelBtn = modalHost.querySelector('#btn-cancel-activity');
  [closeBtn, cancelBtn].forEach(b => {
    if (b) b.addEventListener('click', () => modalHost.remove());
  });
}
