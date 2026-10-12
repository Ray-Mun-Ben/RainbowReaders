// Rainbow Readers - Public Pages (Home, About, How It Works, Login)
import { store } from './store.js';
import { sound } from './audio.js';

export function renderPublicNav(activeRoute = '') {
  return `
    <header class="public-nav">
      <div class="nav-container">
        <a href="#/" class="nav-brand">
          <span class="brand-icon">📖</span>
          <span class="brand-title">Rainbow Readers</span>
        </a>
        <nav class="nav-links">
          <a href="#/about" class="nav-link ${activeRoute === 'about' ? 'active' : ''}">About</a>
          <a href="#/how-it-works" class="nav-link ${activeRoute === 'how-it-works' ? 'active' : ''}">How It Works</a>
          <a href="#/login" class="nav-link btn-login-pill ${activeRoute === 'login' ? 'active' : ''}">Log In</a>
        </nav>
      </div>
    </header>
  `;
}

export function renderHomePage() {
  return `
    <div class="public-page home-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-badge">
          <span>🏫 Madaraka Primary School</span>
          <span class="badge-dot">•</span>
          <span>CBC Grades 1–3</span>
        </div>
        <h1 class="hero-title">
          Where Every Child Learns to Read with Confidence
        </h1>
        <p class="hero-subtext">
          A color-coded reading system for CBC learners in Grades 1–3 at Madaraka Primary built so students can practice, teachers can track, and parents can support, at home or on the classroom TV.
        </p>
        <div class="hero-actions">
          <a href="#/login?role=student" class="btn btn-primary btn-lg">
            <span>🚀 Student Practice Demo</span>
          </a>
          <a href="#/login?role=teacher" class="btn btn-outline btn-lg">
            <span>👩🏾‍🏫 Teacher Portal</span>
          </a>
          <a href="#/login?role=parent" class="btn btn-ghost btn-lg">
            <span>🏡 Parent View</span>
          </a>
        </div>
      </section>

      <!-- The 3 Pathways Cards -->
      <section class="pathways-overview">
        <div class="section-header">
          <span class="section-tag">Continuous Growth</span>
          <h2 class="section-title">The Three Color-Coded Pathways</h2>
          <p class="section-desc">
            Blue, gold, and green describe what a learner is currently practising — not how smart they are. Designed to keep learning welcoming, private, and stigma-free.
          </p>
        </div>

        <div class="pathway-cards-grid">
          <div class="pathway-card pathway-card-starting">
            <div class="pathway-pill pill-starting">
              <span class="pill-dot"></span> Starting (Blue)
            </div>
            <h3>Letter Sounds & Blending</h3>
            <p>
              Mastering single letters (A, B, E, R, D), syllable blending (Ba, Do, Re, Ad), and early phonics building blocks.
            </p>
            <ul class="pathway-points">
              <li>🔊 Letter sound audio repetition</li>
              <li>🧩 2-letter syllable combinations</li>
              <li>🔤 3 to 4 letter starter words</li>
            </ul>
          </div>

          <div class="pathway-card pathway-card-growing">
            <div class="pathway-pill pill-growing">
              <span class="pill-dot"></span> Growing (Gold)
            </div>
            <h3>Vowels & Short Sentences</h3>
            <p>
              Combining vowels, consonant blends (Sh, Ch, Th), short sentences, and proving understanding with basic comprehension checks.
            </p>
            <ul class="pathway-points">
              <li>⭐ Vowel sounds (A, E, I, O, U)</li>
              <li>📖 Short sentence reading</li>
              <li>❓ Detail comprehension MCQs</li>
            </ul>
          </div>

          <div class="pathway-card pathway-card-exploring">
            <div class="pathway-pill pill-exploring">
              <span class="pill-dot"></span> Exploring (Green)
            </div>
            <h3>Extended Stories & Grade Above</h3>
            <p>
              Once students master their grade content in Growing, Exploring unlocks preview material from the grade above for deeper enrichment.
            </p>
            <ul class="pathway-points">
              <li>🌿 Multi-sentence story passages</li>
              <li>🚀 Grade-above advanced preview</li>
              <li>🎯 In-depth story reflection</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Roles Breakdown -->
      <section class="roles-section">
        <div class="section-header">
          <span class="section-tag">Whole Community</span>
          <h2 class="section-title">One System. Three Dedicated Spaces.</h2>
        </div>

        <div class="roles-grid">
          <div class="role-card">
            <div class="role-icon">👦🏾</div>
            <h3>Students Practice</h3>
            <p>
              Self-paced, child-friendly audio support to practice pronunciation, blend syllables, read sentences, and earn encouraging badges without stress.
            </p>
            <a href="#/login?role=student" class="role-link">Try as Student &rarr;</a>
          </div>

          <div class="role-card">
            <div class="role-icon">👩🏾‍🏫</div>
            <h3>Teachers Track</h3>
            <p>
              A class-level view — never a ranked leaderboard. Track pathway distributions, spot learners who need extra support, and project to classroom TVs.
            </p>
            <a href="#/login?role=teacher" class="role-link">Open Teacher Desk &rarr;</a>
          </div>

          <div class="role-card">
            <div class="role-icon">🏡</div>
            <h3>Parents Support</h3>
            <p>
              Parents see their child's achievements, celebrate milestones, and access audio guides to practice together on a shared phone at home.
            </p>
            <a href="#/login?role=parent" class="role-link">View Parent Space &rarr;</a>
          </div>
        </div>
      </section>

      <!-- Classroom TV Spotlight -->
      <section class="tv-banner-section">
        <div class="tv-banner-card">
          <div class="tv-banner-text">
            <span class="tv-tag">📺 Built for Madaraka Classrooms</span>
            <h2>Classroom TV & Projector Mode</h2>
            <p>
              Pick a grade, pathway, and activity with one click. High-visibility typography and loud, clear audio prompts make group choruses and classroom discussions seamless.
            </p>
            <a href="#/login?role=teacher" class="btn btn-light">Launch Classroom TV Mode</a>
          </div>
          <div class="tv-banner-visual">
            <div class="tv-frame">
              <div class="tv-inner">
                <span class="tv-stage-label">TV Mode • Grade 2 • Growing</span>
                <p class="tv-sample-sentence">"The boy has a red ball."</p>
                <div class="tv-audio-badge">🔊 Audio Broadcast Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// Faithful reproduction of Screenshot 5
export function renderAboutPage() {
  return `
    <div class="public-page about-page">
      <div class="about-container">
        <h1 class="about-main-heading">About Rainbow Readers</h1>

        <p class="about-lead">
          Across many CBC classrooms, teachers already group learners informally by reading ability — but there has been no simple, shared, low-cost way to keep that support consistent between school and home.
        </p>

        <section class="about-block">
          <h2>The problem</h2>
          <p>
            Grade 1–3 is when foundational reading habits are formed, but many learners fall behind early and quietly. Teachers know their students well and can identify who needs extra practice with letter sounds, blending, fluency or comprehension — but they lack a structured, affordable tool to organise and track that support day to day.
          </p>
        </section>

        <section class="about-block">
          <h2>What we found</h2>
          <p>
            Research with teachers and families surfaced three consistent barriers: many households have no device at home; classroom Wi-Fi is often weak or unreliable; and learners frequently struggle specifically with sound blending, which benefits from repeated audio support and self-correction.
          </p>
        </section>

        <section class="about-block">
          <h2>Our approach</h2>
          <p>
            Rainbow Readers organises reading activities into three color-coded pathways — Starting, Growing and Exploring — so teachers can assign the right kind of practice to each learner, students get a simple and encouraging place to read, and the same content can be delivered at home on a shared phone or in class on an existing TV.
          </p>
        </section>

        <section class="about-block">
          <h2>What the colors mean</h2>
          <p>
            Blue, amber and green describe <em>what a learner is currently practising</em> — not how smart or capable they are. A learner's pathway is private information shared only between their teacher and family, and pathways are designed to feel equally welcoming, equally respected, and equally "normal."
          </p>
        </section>

        <div class="about-cta-bar">
          <p>Ready to see Rainbow Readers in action?</p>
          <a href="#/login" class="btn btn-primary">Try the Interactive Demo</a>
        </div>
      </div>
    </div>
  `;
}

export function renderHowItWorksPage() {
  return `
    <div class="public-page how-it-works-page">
      <div class="about-container">
        <h1 class="about-main-heading">How Rainbow Readers Works</h1>
        <p class="about-lead">
          Designed specifically around Kenya's Competency-Based Curriculum (CBC) literacy outcomes for Grades 1, 2, and 3.
        </p>

        <div class="workflow-steps">
          <div class="step-card">
            <div class="step-num">1</div>
            <div class="step-content">
              <h3>Baseline Comprehension Check</h3>
              <p>
                When a student begins, they take a brief 5-stage check (Letter Sounds &rarr; Syllables &rarr; 3-4 Letter Words &rarr; Short Sentence &rarr; MCQ Question). This establishes their initial comfort level without test anxiety.
              </p>
            </div>
          </div>

          <div class="step-card">
            <div class="step-num">2</div>
            <div class="step-content">
              <h3>Color-Coded Pathway Practice</h3>
              <p>
                Learners are placed into Starting (Blue), Growing (Gold), or Exploring (Green). Each pathway provides audio-assisted self-practice with instant repetition buttons so children can self-correct at their own pace.
              </p>
            </div>
          </div>

          <div class="step-card">
            <div class="step-num">3</div>
            <div class="step-content">
              <h3>Mastery-Based Grade Advancement</h3>
              <p>
                A learner who demonstrates consistent mastery in Growing (completing 4–5 activities) unlocks the Exploring pathway, which introduces enriched reading material from the grade above.
              </p>
            </div>
          </div>

          <div class="step-card">
            <div class="step-num">4</div>
            <div class="step-content">
              <h3>Home & Classroom Continuity</h3>
              <p>
                Teachers can project activities on the classroom TV for group engagement, while parents can review milestones and practice the exact same sounds at home on a mobile phone.
              </p>
            </div>
          </div>
        </div>

        <div class="about-cta-bar" style="margin-top: 2.5rem;">
          <a href="#/login" class="btn btn-primary btn-lg">Experience the Demo</a>
        </div>
      </div>
    </div>
  `;
}

export function renderLoginPage(initialRole = 'student') {
  return `
    <div class="public-page login-page">
      <div class="login-modal-card">
        <div class="login-header">
          <span class="login-logo-icon">📖</span>
          <h2>Log in to Rainbow Readers</h2>
          <p>Choose your role to enter the learning portal</p>
        </div>

        <!-- Role Selector Tabs -->
        <div class="login-role-tabs">
          <button class="role-tab ${initialRole === 'student' ? 'active' : ''}" data-role="student">
            <span class="tab-icon">👦🏾</span> Student
          </button>
          <button class="role-tab ${initialRole === 'teacher' ? 'active' : ''}" data-role="teacher">
            <span class="tab-icon">👩🏾‍🏫</span> Teacher
          </button>
          <button class="role-tab ${initialRole === 'parent' ? 'active' : ''}" data-role="parent">
            <span class="tab-icon">🏡</span> Parent
          </button>
        </div>

        <!-- Dynamic Form Container -->
        <div id="login-form-container">
          ${renderLoginFormByRole(initialRole)}
        </div>
      </div>
    </div>
  `;
}

export function renderLoginFormByRole(role) {
  const creds = {
    student: {
      user: 'amani',
      pass: 'read123',
      label: 'Student Account (Amani Otieno • Grade 2)',
      desc: 'Practice reading, take baseline check, earn badges'
    },
    teacher: {
      user: 'kamau',
      pass: 'teach123',
      label: 'Teacher Account (Mrs. Wanjiru Kamau)',
      desc: 'Class overview, progress analytics & TV classroom mode'
    },
    parent: {
      user: 'parent',
      pass: 'home123',
      label: 'Parent Account (Mrs. Otieno)',
      desc: "View Amani's milestones, achievements & home tips"
    }
  }[role];

  return `
    <form id="auth-form" class="auth-form" data-role="${role}">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          required 
          autocomplete="off" 
          placeholder="Enter username" 
          value="${creds.user}" 
          class="form-input" 
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          required 
          placeholder="Enter password" 
          value="${creds.pass}" 
          class="form-input" 
        />
      </div>

      <div id="login-error-msg" class="login-error-msg" style="display: none;"></div>

      <button type="submit" class="btn btn-primary btn-block btn-submit-login">
        Log In as ${role.charAt(0).toUpperCase() + role.slice(1)}
      </button>

      <!-- Prominent Dummy Credentials as requested -->
      <div class="demo-credentials-box">
        <div class="demo-cred-header">
          <span class="demo-cred-badge">Demo Account Details</span>
        </div>
        <p class="demo-cred-account-name">${creds.label}</p>
        <div class="demo-cred-details">
          <span>Username: <strong>${creds.user}</strong></span>
          <span>Password: <strong>${creds.pass}</strong></span>
        </div>
        <button type="button" class="btn btn-sm btn-quick-login" data-quick-role="${role}">
          ⚡ 1-Click Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </div>
    </form>
  `;
}
