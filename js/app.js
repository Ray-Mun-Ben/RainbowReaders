// Rainbow Readers - Master Application Router & Shell Controller
import { store } from './store.js';
import { renderPublicNav, renderHomePage, renderAboutPage, renderHowItWorksPage, renderLoginPage, renderLoginFormByRole } from './public.js';
import { renderStudentDashboard, renderBaselineAssessment, bindStudentEvents } from './student.js';
import { renderTeacherClassOverview, renderTeacherAnalytics, renderTeacherTVMode, bindTeacherEvents } from './teacher.js';
import { renderParentDashboard, renderParentMilestones, bindParentEvents } from './parent.js';
import { sound } from './audio.js';

class App {
  constructor() {
    this.root = document.getElementById('app');
    this.currentRole = store.getCurrentRole();
    this.init();
  }

  init() {
    // Listen for hash route changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // Listen for store changes
    store.subscribe(() => {
      this.currentRole = store.getCurrentRole();
    });

    // Initial route dispatch
    this.handleRoute();
  }

  handleRoute() {
    const rawHash = window.location.hash || '#/';
    const [pathWithSlash, queryStr] = rawHash.split('?');
    const path = pathWithSlash.replace(/^#\/?/, '').toLowerCase();
    const query = new URLSearchParams(queryStr || '');

    // Check Auth guards
    if (path.startsWith('student') && store.getCurrentRole() !== 'student') {
      window.location.hash = '#/login?role=student';
      return;
    }
    if (path.startsWith('teacher') && store.getCurrentRole() !== 'teacher') {
      window.location.hash = '#/login?role=teacher';
      return;
    }
    if (path.startsWith('parent') && store.getCurrentRole() !== 'parent') {
      window.location.hash = '#/login?role=parent';
      return;
    }

    // Route dispatching
    if (path === '' || path === '/') {
      this.renderPublic('home', renderHomePage());
    } else if (path === 'about') {
      this.renderPublic('about', renderAboutPage());
    } else if (path === 'how-it-works') {
      this.renderPublic('how-it-works', renderHowItWorksPage());
    } else if (path === 'login') {
      const role = query.get('role') || 'student';
      this.renderPublic('login', renderLoginPage(role));
      this.bindLoginEvents(role);
    } else if (path.startsWith('student')) {
      this.renderStudentRoute(path);
    } else if (path.startsWith('teacher')) {
      this.renderTeacherRoute(path);
    } else if (path.startsWith('parent')) {
      this.renderParentRoute(path);
    } else {
      this.renderPublic('home', renderHomePage());
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }

  // Render Public Shell (Header + Content + Footer)
  renderPublic(route, htmlContent) {
    this.root.innerHTML = `
      <div class="public-shell">
        ${renderPublicNav(route)}
        <main class="public-main-content">
          ${htmlContent}
        </main>
        <footer class="public-footer">
          <div class="footer-inner">
            <div class="footer-brand">
              <span>📖 Rainbow Readers</span>
              <p>CBC Literacy Support System • Madaraka Primary School</p>
            </div>
            <div class="footer-links">
              <a href="#/about">About</a>
              <a href="#/how-it-works">How It Works</a>
              <a href="#/login">Portal Log In</a>
              <button id="btn-reset-state" class="btn-reset-demo" title="Restore fresh demo state">
                🔄 Reset Demo Data
              </button>
            </div>
          </div>
        </footer>
      </div>
    `;

    const resetBtn = this.root.querySelector('#btn-reset-state');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.resetToDefaults();
        alert('Demo state reset to original defaults!');
        this.handleRoute();
      });
    }
  }

  // Render Authenticated Shell (Spruce Teal Sidebar + Top Breadcrumb + Content)
  renderPortalShell({ role, activeItem, navItems, breadcrumbs, contentHtml, onBind }) {
    const user = store.getCurrentUser() || { name: 'Demo User', title: 'User' };

    this.root.innerHTML = `
      <div class="portal-layout">
        <!-- Top Horizontal Header Bar matching screenshots -->
        <header class="portal-top-bar">
          <div class="portal-top-breadcrumbs">
            ${breadcrumbs.map((b, i) => `
              <a href="${b.href}" class="top-bread-link ${b.active ? 'active' : ''}">${b.label}</a>
              ${i < breadcrumbs.length - 1 ? '<span class="bread-sep">|</span>' : ''}
            `).join('')}
          </div>
        </header>

        <div class="portal-body">
          <!-- Sidebar matching screenshots -->
          <aside class="portal-sidebar">
            <div class="sidebar-brand">
              <a href="#/" class="sidebar-brand-link">
                <span class="sidebar-book-icon">📖</span>
                <span class="sidebar-title">Rainbow<br/>Readers</span>
              </a>
            </div>

            <nav class="sidebar-nav">
              ${navItems.map(item => `
                <a href="${item.href}" class="sidebar-nav-item ${item.id === activeItem ? 'active' : ''}">
                  <span class="sidebar-item-icon">${item.icon}</span>
                  <span class="sidebar-item-label">${item.label}</span>
                </a>
              `).join('')}
            </nav>

            <div class="sidebar-footer">
              <div class="sidebar-user-info">
                <span class="user-display-name">${user.name}</span>
                <span class="user-role-badge">${user.title || (role.charAt(0).toUpperCase() + role.slice(1))}</span>
              </div>
              <button id="btn-portal-logout" class="sidebar-logout-btn">
                <span class="logout-icon">🚪</span> Log out
              </button>
            </div>
          </aside>

          <!-- Main Portal Content -->
          <main class="portal-main-area" id="portal-main-area">
            ${contentHtml}
            
            <div class="portal-footer-tag">
              <span class="netlify-tag">Powered by <strong>Rainbow Readers</strong></span>
            </div>
          </main>
        </div>
      </div>
    `;

    // Bind Logout
    const logoutBtn = this.root.querySelector('#btn-portal-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        store.logout();
        window.location.hash = '#/';
      });
    }

    // Call sub-module event bindings
    const mainArea = this.root.querySelector('#portal-main-area');
    if (mainArea && onBind) {
      onBind(mainArea);
    }
  }

  // Student Sub-routes
  renderStudentRoute(path) {
    const isAssessment = path.includes('assessment');
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏡', href: '#/student/dashboard' },
      { id: 'assessment', label: 'Reading Check', icon: '📝', href: '#/student/assessment' }
    ];
    const breadcrumbs = [
      { label: 'Dashboard', href: '#/student/dashboard', active: !isAssessment },
      { label: 'Reading Check', href: '#/student/assessment', active: isAssessment },
      { label: 'Log out', href: '#/login', active: false }
    ];

    this.renderPortalShell({
      role: 'student',
      activeItem: isAssessment ? 'assessment' : 'dashboard',
      navItems,
      breadcrumbs,
      contentHtml: isAssessment ? renderBaselineAssessment() : renderStudentDashboard(),
      onBind: bindStudentEvents
    });
  }

  // Teacher Sub-routes
  renderTeacherRoute(path) {
    let activeItem = 'class';
    let contentHtml = renderTeacherClassOverview();

    if (path.includes('analytics')) {
      activeItem = 'analytics';
      contentHtml = renderTeacherAnalytics();
    } else if (path.includes('tv')) {
      activeItem = 'tv';
      contentHtml = renderTeacherTVMode();
    }

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏡', href: '#/teacher/class' },
      { id: 'students', label: 'Students', icon: '🧒', href: '#/teacher/class' },
      { id: 'class', label: 'Class Overview', icon: '👥', href: '#/teacher/class' },
      { id: 'analytics', label: 'Analytics', icon: '📊', href: '#/teacher/analytics' },
      { id: 'tv', label: 'TV / Classroom Mode', icon: '📺', href: '#/teacher/tv' }
    ];

    const breadcrumbs = [
      { label: 'Dashboard', href: '#/teacher/class', active: false },
      { label: 'Students', href: '#/teacher/class', active: false },
      { label: 'Class Overview', href: '#/teacher/class', active: activeItem === 'class' },
      { label: 'Analytics', href: '#/teacher/analytics', active: activeItem === 'analytics' },
      { label: 'TV / Classroom Mode', href: '#/teacher/tv', active: activeItem === 'tv' },
      { label: 'Log out', href: '#/login', active: false }
    ];

    this.renderPortalShell({
      role: 'teacher',
      activeItem,
      navItems,
      breadcrumbs,
      contentHtml,
      onBind: bindTeacherEvents
    });
  }

  // Parent Sub-routes
  renderParentRoute(path) {
    const isMilestones = path.includes('milestones');
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏡', href: '#/parent/dashboard' },
      { id: 'milestones', label: 'Milestones', icon: '🏅', href: '#/parent/milestones' }
    ];

    const breadcrumbs = [
      { label: 'Dashboard', href: '#/parent/dashboard', active: !isMilestones },
      { label: 'Milestones', href: '#/parent/milestones', active: isMilestones },
      { label: 'Log out', href: '#/login', active: false }
    ];

    this.renderPortalShell({
      role: 'parent',
      activeItem: isMilestones ? 'milestones' : 'dashboard',
      navItems,
      breadcrumbs,
      contentHtml: isMilestones ? renderParentMilestones() : renderParentDashboard(),
      onBind: bindParentEvents
    });
  }

  // Handle Login Interactivity
  bindLoginEvents(currentRole) {
    const roleTabs = this.root.querySelectorAll('.role-tab');
    const formContainer = this.root.querySelector('#login-form-container');

    // Tab switching
    roleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const role = tab.getAttribute('data-role');
        roleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        formContainer.innerHTML = renderLoginFormByRole(role);
        this.bindFormActions(role);
        sound.playClick();
      });
    });

    this.bindFormActions(currentRole);
  }

  bindFormActions(role) {
    const form = this.root.querySelector('#auth-form');
    const errorMsg = this.root.querySelector('#login-error-msg');
    const quickBtn = this.root.querySelector('.btn-quick-login');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = form.username.value;
        const password = form.password.value;

        const res = store.login(role, username, password);
        if (res.success) {
          sound.playSuccessChime();
          this.redirectByRole(role);
        } else {
          sound.playTone(200, 'sawtooth', 0.2);
          if (errorMsg) {
            errorMsg.textContent = res.message || 'Invalid credentials. Please use the demo credentials below.';
            errorMsg.style.display = 'block';
          }
        }
      });
    }

    if (quickBtn) {
      quickBtn.addEventListener('click', () => {
        sound.playSuccessChime();
        store.quickLogin(role);
        this.redirectByRole(role);
      });
    }
  }

  redirectByRole(role) {
    if (role === 'student') {
      window.location.hash = '#/student/dashboard';
    } else if (role === 'teacher') {
      window.location.hash = '#/teacher/class';
    } else if (role === 'parent') {
      window.location.hash = '#/parent/dashboard';
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
