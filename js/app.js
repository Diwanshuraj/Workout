/**
 * GYMLIFE Application Orchestrator
 * High-voltage GymLife theme system with live classes showcase, dynamic BMI calculator,
 * pricing plans, interactive contact form, scroll-spy, and complete live workout engine.
 */

class AppController {
  constructor() {
    this.currentSection = "home";
    this.scrollSpyObserver = null;
    this.sections = [
      "home",
      "about",
      "classes",
      "tracker",
      "bmi-calculator",
      "pricing",
      "team",
      "contact"
    ];
  }

  init() {
    // 1. Render GymLife Signature Sections (Classes, Pricing, Trainers)
    this.renderGymLifeClasses();
    this.renderGymLifePricing();
    this.renderGymLifeTrainers();

    // 2. Initialize and render dynamic workout engine components
    window.dashboard = new DashboardComponent("dashboardMount");
    window.exerciseLibrary = new ExerciseLibraryComponent("exerciseLibraryMount");
    window.routineBuilder = new RoutineBuilderComponent("routineBuilderMount");
    window.workoutSession = new WorkoutSessionComponent("workoutSessionMount");
    window.historyLogs = new HistoryLogsComponent("historyLogsMount");
    window.calculators = new CalculatorsComponent("calculatorsMount");

    window.dashboard.render();
    window.exerciseLibrary.render();
    window.routineBuilder.render();
    window.workoutSession.render();
    window.historyLogs.render();
    window.calculators.render();

    // 3. Setup Scroll-Spy and Back-to-Top
    this.setupScrollSpy();
    this.setupBackToTop();

    // 4. Initial Quick BMI calculation
    this.calculateGymLifeBMI();
  }

  // --- GYMLIFE DYNAMIC SECTIONS RENDERING ---
  renderGymLifeClasses() {
    const grid = document.getElementById("gymlifeClassesGrid");
    if (!grid || typeof GYMLIFE_CLASSES === "undefined") return;

    grid.innerHTML = GYMLIFE_CLASSES.map(
      (cls) => `
      <div class="class-card">
        <span class="class-header-badge">${Helpers.escapeHtml(cls.badge)}</span>
        <h3 class="class-title">${Helpers.escapeHtml(cls.title)}</h3>
        <p class="class-desc">${Helpers.escapeHtml(cls.desc)}</p>
        <div class="class-footer">
          <div>
            <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; display: block;">Coach</span>
            <span class="class-coach">${Helpers.escapeHtml(cls.coach)}</span>
          </div>
          <button class="btn-gymlife btn-sm" onclick="window.app.startClassWorkout('${cls.category}')">
            Train Now
          </button>
        </div>
      </div>
    `
    ).join("");
  }

  renderGymLifePricing() {
    const grid = document.getElementById("gymlifePricingGrid");
    if (!grid || typeof GYMLIFE_PRICING === "undefined") return;

    grid.innerHTML = GYMLIFE_PRICING.map(
      (plan) => `
      <div class="pricing-card ${plan.popular ? "popular" : ""}">
        <h3 class="pricing-plan-title">${Helpers.escapeHtml(plan.title)}</h3>
        <div class="pricing-price-tag">
          <span>$</span>${plan.price}
        </div>
        <div class="pricing-period">${Helpers.escapeHtml(plan.period)}</div>
        <ul class="pricing-features-list">
          ${plan.features.map((f) => `<li>&bull; ${Helpers.escapeHtml(f)}</li>`).join("")}
        </ul>
        <button class="btn-gymlife ${plan.popular ? "" : "btn-gymlife-outline"} w-full" onclick="window.app.handleEnroll('${plan.title}')">
          Enroll Now
        </button>
      </div>
    `
    ).join("");
  }

  renderGymLifeTrainers() {
    const grid = document.getElementById("gymlifeTrainersGrid");
    if (!grid || typeof GYMLIFE_TRAINERS === "undefined") return;

    grid.innerHTML = GYMLIFE_TRAINERS.map(
      (tr) => `
      <div class="trainer-card">
        <div class="trainer-avatar-box">
          ${tr.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <h4 class="trainer-name">${Helpers.escapeHtml(tr.name)}</h4>
        <div class="trainer-role">${Helpers.escapeHtml(tr.role)}</div>
        <p class="trainer-specialty">${Helpers.escapeHtml(tr.specialty)}</p>
      </div>
    `
    ).join("");
  }

  // --- BMI CALCULATOR ---
  calculateGymLifeBMI(event = null) {
    if (event) event.preventDefault();

    const hEl = document.getElementById("quickBmiHeight");
    const wEl = document.getElementById("quickBmiWeight");
    const scoreEl = document.getElementById("quickBmiScore");
    const statusEl = document.getElementById("quickBmiStatus");

    if (!hEl || !wEl) return;

    const heightCm = parseFloat(hEl.value) || 178;
    const weightKg = parseFloat(wEl.value) || 75;

    const heightM = heightCm / 100;
    const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

    let status = "Normal Weight";
    let color = "#4ade80";

    if (bmi < 18.5) {
      status = "Underweight";
      color = "#38bdf8";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = "Healthy / Normal";
      color = "#4ade80";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      status = "Overweight";
      color = "#facc15";
    } else {
      status = "Obese";
      color = "#f87171";
    }

    if (scoreEl) scoreEl.textContent = bmi;
    if (statusEl) {
      statusEl.textContent = status;
      statusEl.style.color = color;
    }

    if (event) {
      this.showToast(`BMI Calculated: ${bmi} (${status})`, "success");
    }
  }

  // --- CONTACT FORM SUBMISSION (Matching ThemeWagon contact.html) ---
  handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("contactName")?.value || "Athlete";
    const email = document.getElementById("contactEmail")?.value || "";

    this.showToast(`Thank you, ${name}! Your comment has been submitted.`, "success");
    document.getElementById("gymlifeContactForm")?.reset();
  }

  handleEnroll(planTitle) {
    this.showToast(`Selected ${planTitle}! Redirecting to workout plan...`, "success");
    this.scrollToSection("tracker");
  }

  startClassWorkout(category) {
    this.showToast(`Opening training program for ${category}!`, "info");
    this.scrollToSection("tracker");
  }

  // --- CONTINUOUS SCROLL NAVIGATION ---
  scrollToSection(sectionId, event = null) {
    if (event) {
      event.preventDefault();
    }

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      this.setActiveNav(sectionId);
    }

    this.closeMobileDrawer();
  }

  switchTab(tabName) {
    this.scrollToSection("tracker");
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- SCROLL-SPY ---
  setupScrollSpy() {
    const navHeight = 85;
    const observerOptions = {
      root: null,
      rootMargin: `-${navHeight}px 0px -40% 0px`,
      threshold: [0, 0.2]
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

    // Desktop Nav
    document.querySelectorAll(".main-nav-links .nav-link").forEach((link) => {
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Mobile Bottom Nav
    document.querySelectorAll(".bottom-nav-bar .bottom-nav-item").forEach((item) => {
      if (item.getAttribute("data-section") === sectionId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Mobile Drawer
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
        if (window.scrollY > 400) {
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
    this.scrollToSection("tracker");
  }

  startRoutineById(routineId) {
    const routine = window.appState.getRoutineById(routineId);
    if (!routine) return;
    window.workoutSession.startNewSession(routine);
    this.scrollToSection("tracker");
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
    this.scrollToSection("tracker");
    this.showToast(`Added "${ex.name}" to active workout!`, "success");
  }

  viewLogDetails(logId) {
    this.scrollToSection("tracker");
    setTimeout(() => {
      window.historyLogs.toggleExpand(logId);
    }, 300);
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

    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${Helpers.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "all 0.3s ease";
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
