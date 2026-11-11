/**
 * Main Application Orchestrator
 * Continuous multi-page scroll architecture with IntersectionObserver Scroll-Spy,
 * live theme switcher (Cyber Lime, Crimson Fury, Aurora, Onyx Gold, Clean Light),
 * smooth scrolling navigation, user settings, toast notifications, & audio management.
 */

class AppController {
  constructor() {
    this.currentSection = "section-dashboard";
    this.currentTheme = localStorage.getItem("pulse_fit_selected_theme") || "cyber-lime";
    this.scrollSpyObserver = null;
    this.sections = [
      "section-dashboard",
      "section-exercises",
      "section-routines",
      "section-workout-session",
      "section-logs",
      "section-calculators"
    ];
  }

  init() {
    // 1. Apply saved theme aesthetic
    this.applyTheme(this.currentTheme);

    // 2. Initialize and render all components into continuous sections
    window.dashboard = new DashboardComponent("dashboardMount");
    window.exerciseLibrary = new ExerciseLibraryComponent("exerciseLibraryMount");
    window.routineBuilder = new RoutineBuilderComponent("routineBuilderMount");
    window.workoutSession = new WorkoutSessionComponent("workoutSessionMount");
    window.historyLogs = new HistoryLogsComponent("historyLogsMount");
    window.calculators = new CalculatorsComponent("calculatorsMount");

    // 3. Initial render across all sections
    window.dashboard.render();
    window.exerciseLibrary.render();
    window.routineBuilder.render();
    window.workoutSession.render();
    window.historyLogs.render();
    window.calculators.render();

    // 4. Setup Scroll-Spy and Back-to-Top button
    this.setupScrollSpy();
    this.setupBackToTop();

    // 5. Active session live indicators
    this.updateActiveSessionBadge();
    window.appState.on("sessionChanged", () => this.updateActiveSessionBadge());
  }

  // --- THEME SWITCHING (5 World-Class Themes) ---
  setTheme(themeName) {
    this.currentTheme = themeName;
    localStorage.setItem("pulse_fit_selected_theme", themeName);
    this.applyTheme(themeName);

    // Close dropdown
    const menu = document.getElementById("themeDropdownMenu");
    if (menu) menu.classList.add("hidden");

    // Re-draw canvas chart with new accent colors
    if (window.dashboard) {
      setTimeout(() => window.dashboard.drawWeeklyChart(), 100);
    }

    const themeTitles = {
      "cyber-lime": "⚡ Cyber Lime (Electric Neon)",
      "crimson-fury": "🔥 Crimson Fury (Rogue Red)",
      "aurora": "🌌 Aurora Cyber (Cyan & Violet)",
      "onyx-gold": "👑 Onyx Gold (Luxury Metallic)",
      "clean-light": "☀️ Clean Studio (Minimalist Light)"
    };

    this.showToast(`Theme updated: ${themeTitles[themeName] || themeName}`, "success");
  }

  applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);

    // Update active highlight in dropdown
    document.querySelectorAll(".theme-opt-btn").forEach((btn) => {
      if (btn.getAttribute("data-theme") === themeName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update mobile drawer pills
    document.querySelectorAll(".drawer-theme-pill").forEach((pill) => {
      if (pill.getAttribute("data-theme") === themeName) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  toggleThemeDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById("themeDropdownMenu");
    if (menu) {
      menu.classList.toggle("hidden");
    }
  }

  closeAllDropdowns(e) {
    const menu = document.getElementById("themeDropdownMenu");
    if (menu && !menu.classList.contains("hidden")) {
      const pickerWrapper = document.querySelector(".theme-picker-wrapper");
      if (pickerWrapper && !pickerWrapper.contains(e.target)) {
        menu.classList.add("hidden");
      }
    }
  }

  // --- CONTINUOUS SCROLL NAVIGATION ---
  scrollToSection(sectionId, event = null) {
    if (event) {
      event.preventDefault();
    }

    // Handle tab-name aliases (e.g. 'exercises' -> 'section-exercises')
    let targetId = sectionId;
    if (!targetId.startsWith("section-")) {
      targetId = `section-${targetId}`;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      this.setActiveNav(targetId);
    }

    // Close mobile drawer if open
    this.closeMobileDrawer();
  }

  switchTab(tabName) {
    this.scrollToSection(tabName);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- SCROLL-SPY (IntersectionObserver) ---
  setupScrollSpy() {
    const navHeight = 70;
    const observerOptions = {
      root: null,
      rootMargin: `-${navHeight}px 0px -50% 0px`,
      threshold: [0, 0.2, 0.5]
    };

    this.scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.setActiveNav(sectionId);
        }
      });
    }, observerOptions);

    this.sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        this.scrollSpyObserver.observe(el);
      }
    });
  }

  setActiveNav(sectionId) {
    this.currentSection = sectionId;

    // Update Desktop Nav Links
    document.querySelectorAll(".desktop-nav-links .nav-link").forEach((link) => {
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update Mobile Bottom Nav Items
    document.querySelectorAll(".bottom-nav-bar .bottom-nav-item").forEach((item) => {
      if (item.getAttribute("data-section") === sectionId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update Mobile Drawer Links
    document.querySelectorAll(".drawer-nav-list .drawer-link").forEach((link) => {
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  setupBackToTop() {
    const btn = document.getElementById("btnBackToTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 350) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      },
      { passive: true }
    );
  }

  // --- WORKOUT LAUNCHERS ---
  startQuickWorkout() {
    window.workoutSession.startNewSession(null);
    this.scrollToSection("section-workout-session");
  }

  startRoutineById(routineId) {
    const routine = window.appState.getRoutineById(routineId);
    if (!routine) return;
    window.workoutSession.startNewSession(routine);
    this.scrollToSection("section-workout-session");
  }

  addExerciseToWorkout(exerciseId) {
    let session = window.appState.getActiveSession();
    if (!session) {
      session = {
        id: "session_" + Date.now(),
        routineId: null,
        title: "Quick Workout Session",
        startedAt: new Date().toISOString(),
        durationSeconds: 0,
        paused: false,
        exercises: []
      };
      window.appState.setActiveSession(session);
    }

    const ex = window.appState.getExerciseById(exerciseId);
    if (!ex) return;

    session.exercises.push({
      exerciseId: ex.id,
      name: ex.name,
      muscleGroup: ex.muscleGroup,
      equipment: ex.equipment,
      restSeconds: ex.restSeconds || 60,
      sets: Array.from({ length: ex.defaultSets || 3 }).map((_, i) => ({
        setNum: i + 1,
        weight: 0,
        reps: ex.defaultReps || 10,
        completed: false
      }))
    });

    window.appState.setActiveSession(session);
    this.scrollToSection("section-workout-session");
    this.showToast(`Added "${ex.name}" to active workout!`, "success");
  }

  viewLogDetails(logId) {
    this.scrollToSection("section-logs");
    setTimeout(() => {
      window.historyLogs.toggleExpand(logId);
    }, 300);
  }

  updateActiveSessionBadge() {
    const session = window.appState.getActiveSession();
    const badges = document.querySelectorAll(".live-session-badge");
    badges.forEach((b) => {
      if (session) {
        b.classList.remove("hidden");
      } else {
        b.classList.add("hidden");
      }
    });
  }

  toggleSound() {
    const s = window.appState.getSettings();
    window.appState.updateSettings({ sound: !s.sound });
    this.showToast(s.sound ? "Sound muted" : "Audio cues enabled", "info");
    const soundIcon = document.getElementById("soundToggleIcon");
    if (soundIcon) {
      soundIcon.innerHTML = s.sound
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    }
  }

  // --- USER SETTINGS MODAL ---
  openSettingsModal() {
    const s = window.appState.getSettings();
    document.getElementById("setUserName").value = s.userName || "Athlete";
    document.getElementById("setUnit").value = s.unit || "kg";
    document.getElementById("setUserWeight").value = s.weightKg || 75;
    document.getElementById("setUserHeight").value = s.heightCm || 178;
    document.getElementById("setUserAge").value = s.age || 26;
    document.getElementById("setUserGoal").value = s.goal || "hypertrophy";

    const backdrop = document.getElementById("settingsModalBackdrop");
    if (backdrop) backdrop.classList.remove("hidden");
  }

  closeSettingsModal() {
    const backdrop = document.getElementById("settingsModalBackdrop");
    if (backdrop) backdrop.classList.add("hidden");
  }

  saveSettings(e) {
    e.preventDefault();
    const userName = document.getElementById("setUserName").value.trim() || "Athlete";
    const unit = document.getElementById("setUnit").value;
    const weightKg = parseFloat(document.getElementById("setUserWeight").value) || 75;
    const heightCm = parseFloat(document.getElementById("setUserHeight").value) || 178;
    const age = parseInt(document.getElementById("setUserAge").value, 10) || 26;
    const goal = document.getElementById("setUserGoal").value;

    window.appState.updateSettings({
      userName,
      unit,
      weightKg,
      heightCm,
      age,
      goal
    });

    this.closeSettingsModal();
    this.showToast("Settings updated successfully!", "success");
    // Re-render components
    window.dashboard.render();
    window.calculators.render();
  }

  // --- MOBILE DRAWER ---
  openMobileDrawer() {
    const drawer = document.getElementById("mobileDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (drawer) drawer.classList.add("open");
    if (backdrop) backdrop.classList.remove("hidden");
  }

  closeMobileDrawer() {
    const drawer = document.getElementById("mobileDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.add("hidden");
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    const icons = {
      success: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
      warning: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      error: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      info: `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <span class="toast-msg">${Helpers.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }
}

window.app = new AppController();

// Mount on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.app.init();
});
