// Rainbow Readers - Persistent Reactive Store (localStorage)
import { DEMO_USERS, INITIAL_STUDENTS, INITIAL_MILESTONES, CURRICULUM_ACTIVITIES } from './data.js';

const STORAGE_KEY = 'rainbow_readers_state_v1';

class Store {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      currentUser: null, // 'student' | 'teacher' | 'parent' or null
      users: JSON.parse(JSON.stringify(DEMO_USERS)),
      students: JSON.parse(JSON.stringify(INITIAL_STUDENTS)),
      milestones: JSON.parse(JSON.stringify(INITIAL_MILESTONES)),
      studentProgress: {
        currentGrade: 2, // Selected demo grade
        pathway: 'Starting', // Starts at Starting/blue before assessment/initial
        hasCompletedBaseline: false,
        completedActivityIds: [],
        earnedBadges: [
          {
            id: 'b-welcome',
            title: 'Welcome Reader',
            icon: '📚',
            date: '2026-08-01',
            desc: 'Joined Rainbow Readers at Madaraka Primary'
          }
        ]
      }
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default state.', e);
    }
    const def = this.getDefaultState();
    this.saveState(def);
    return def;
  }

  saveState(state = this.state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save to localStorage.', e);
    }
    this.notify();
  }

  resetToDefaults() {
    this.state = this.getDefaultState();
    this.saveState();
    return this.state;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    for (const cb of this.listeners) {
      try {
        cb(this.state);
      } catch (err) {
        console.error('Error in store subscriber:', err);
      }
    }
  }

  // Auth Helpers
  login(role, username, password) {
    const user = this.state.users[role];
    if (user && user.username.toLowerCase() === username.trim().toLowerCase() && user.password === password.trim()) {
      this.state.currentUser = role;
      this.saveState();
      return { success: true, user };
    }
    return { success: false, message: 'Invalid username or password.' };
  }

  quickLogin(role) {
    if (this.state.users[role]) {
      this.state.currentUser = role;
      this.saveState();
      return true;
    }
    return false;
  }

  logout() {
    this.state.currentUser = null;
    this.saveState();
  }

  getCurrentUser() {
    if (!this.state.currentUser) return null;
    return this.state.users[this.state.currentUser];
  }

  getCurrentRole() {
    return this.state.currentUser;
  }

  // Student Actions
  setStudentGrade(grade) {
    this.state.studentProgress.currentGrade = Number(grade);
    this.saveState();
  }

  completeBaselineAssessment() {
    const today = new Date().toISOString().split('T')[0];
    this.state.studentProgress.hasCompletedBaseline = true;
    this.state.studentProgress.pathway = 'Starting'; // Established at Starting level
    
    // Add Starter Badge if not present
    if (!this.state.studentProgress.earnedBadges.some(b => b.id === 'b-starter')) {
      this.state.studentProgress.earnedBadges.push({
        id: 'b-starter',
        title: '🌱 Starter Badge',
        icon: '🌱',
        date: today,
        desc: 'Completed the baseline comprehension assessment successfully.'
      });
    }

    // Add milestone for parent view
    if (!this.state.milestones.some(m => m.id === 'm-baseline')) {
      this.state.milestones.unshift({
        id: 'm-baseline',
        icon: '🌱',
        title: 'First Steps — completed your first activity',
        date: today,
        type: 'seed',
        desc: 'Demonstrated letter pronunciation, syllable blending, and red ball comprehension.'
      });
    }

    // Update in students list for teacher view
    const amani = this.state.students.find(s => s.name === 'Amani Otieno');
    if (amani) {
      amani.pathway = 'Starting';
      amani.progress.completed = 1;
      amani.lastActivity = today;
    }

    this.saveState();
  }

  completeActivity(activityId) {
    const today = new Date().toISOString().split('T')[0];
    if (!this.state.studentProgress.completedActivityIds.includes(activityId)) {
      this.state.studentProgress.completedActivityIds.push(activityId);
    }

    const count = this.state.studentProgress.completedActivityIds.length;
    
    // Check progression rule: 4 or 5 activities completed in Growing allows entering Exploring
    if (count >= 4 && this.state.studentProgress.pathway === 'Growing') {
      this.state.studentProgress.pathway = 'Exploring';
      if (!this.state.studentProgress.earnedBadges.some(b => b.id === 'b-exploring')) {
        this.state.studentProgress.earnedBadges.push({
          id: 'b-exploring',
          title: '🌿 Explorer Badge',
          icon: '🧭',
          date: today,
          desc: 'Unlocked Exploring pathway — ready for Grade 3 reading adventures!'
        });
      }
      this.state.milestones.unshift({
        id: `m-exploring-${Date.now()}`,
        icon: '🌿',
        title: 'Entered Exploring Pathway — Next Grade Content Unlocked',
        date: today,
        type: 'exploring',
        desc: 'Completed mastery activities and unlocked advanced reading.'
      });
    } else if (count >= 2 && this.state.studentProgress.pathway === 'Starting') {
      this.state.studentProgress.pathway = 'Growing';
      if (!this.state.studentProgress.earnedBadges.some(b => b.id === 'b-growing')) {
        this.state.studentProgress.earnedBadges.push({
          id: 'b-growing',
          title: '⭐ Growing Star Badge',
          icon: '⭐',
          date: today,
          desc: 'Graduated to Growing pathway with vowel fluency!'
        });
      }
      this.state.milestones.unshift({
        id: `m-growing-${Date.now()}`,
        icon: '⭐',
        title: 'Getting Stronger — promoted to Growing pathway',
        date: today,
        type: 'growing',
        desc: 'Mastered consonant blends and vowel pronunciation.'
      });
    }

    // Sync student list for teacher
    const amani = this.state.students.find(s => s.name === 'Amani Otieno');
    if (amani) {
      amani.pathway = this.state.studentProgress.pathway;
      amani.progress.completed = count;
      amani.lastActivity = today;
    }

    this.saveState();
  }

  // Teacher Actions
  updateStudentPathway(studentId, newPathway) {
    const student = this.state.students.find(s => s.id === studentId);
    if (student) {
      student.pathway = newPathway;
      if (student.name === 'Amani Otieno') {
        this.state.studentProgress.pathway = newPathway;
      }
      this.saveState();
    }
  }

  toggleNeedsSupport(studentId) {
    const student = this.state.students.find(s => s.id === studentId);
    if (student) {
      student.needsSupport = !student.needsSupport;
      this.saveState();
    }
  }
}

export const store = new Store();
