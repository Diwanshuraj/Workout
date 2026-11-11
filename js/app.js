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
      "explore",
      "about",
      "classes",
      "tracker",
      "bmi-calculator",
      "pricing",
      "team",
      "contact"
    ];

    // Anime Beast Mode & Juice Lab State (Screen 1 & 2)
    this.heroMode = "anime"; // "anime" or "gym"
    this.animeExercises = [
      {
        id: "deadlift",
        name: "Olympic Barbell Deadlifts",
        muscle: "Posterior Chain & Core",
        count: "1 OF 32",
        graphic: "assets/anime/goku-deadlift.svg",
        timerSeconds: 125,
        bpm: 148
      },
      {
        id: "warmup",
        name: "Dynamic Martial Warm-Up",
        muscle: "Joint Mobility & Flow",
        count: "2 OF 32",
        graphic: "assets/anime/goku-warmup.svg",
        timerSeconds: 90,
        bpm: 124
      },
      {
        id: "strength",
        name: "Super Saiyan Power Squat",
        muscle: "Quads, Glutes & Traps",
        count: "3 OF 32",
        graphic: "assets/anime/goku-strength.svg",
        timerSeconds: 180,
        bpm: 162
      },
      {
        id: "cardio",
        name: "Super Speed Sprint HIIT",
        muscle: "Full Body VO2 Max",
        count: "4 OF 32",
        graphic: "assets/anime/goku-cardio.svg",
        timerSeconds: 60,
        bpm: 174
      },
      {
        id: "mobility",
        name: "Zen Ki Focus & Recovery",
        muscle: "Parasympathetic Breathing",
        count: "5 OF 32",
        graphic: "assets/anime/goku-mobility.svg",
        timerSeconds: 120,
        bpm: 96
      }
    ];
    this.currentAnimeIndex = 0;
    this.animeTimerSeconds = 125;
    this.isAnimeTimerRunning = true;
    this.animeTimerInterval = null;
    this.isAudioMuted = false;
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

    // 5. Initialize Tracker active tab
    const hasActiveSession = window.appState && window.appState.getActiveSession();
    this.switchTrackerTab(hasActiveSession ? "workout" : "dashboard");

    // 6. Initialize Animated Hero Canvas Particles
    this.initHeroParticles();

    // 7. Setup Advanced Animations (Scroll Reveal, Counter, Telemetry)
    this.setupScrollAnimations();
    this.setupCounterAnimation();
    this.setupTelemetrySimulation();

    // 8. Start Anime Hero Beast Mode Timer & Circular Progress Observer
    this.initAnimeTimer();
    this.setupCircularProgressObserver();
  }

  // --- GYMLIFE DYNAMIC SECTIONS RENDERING ---
  renderGymLifeClasses() {
    const grid = document.getElementById("gymlifeClassesGrid");
    if (!grid || typeof GYMLIFE_CLASSES === "undefined") return;

    grid.innerHTML = GYMLIFE_CLASSES.map(
      (cls) => `
      <div class="class-card reveal-item">
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
      <div class="pricing-card reveal-item ${plan.popular ? "popular featured-pricing-glow" : ""}">
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
      <div class="trainer-card reveal-item">
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

  switchTrackerTab(tabKey) {
    let target = tabKey || "dashboard";
    if (target === "workout-session" || target === "workout") target = "workout";
    else if (target === "exercises" || target === "exercise-library") target = "exercises";
    else if (target === "routines" || target === "routine-builder") target = "routines";
    else if (target === "logs" || target === "history") target = "history";
    else if (target === "calculators" || target === "tools") target = "calculators";
    else if (target === "dashboard") target = "dashboard";

    // Toggle active button style
    document.querySelectorAll(".tracker-tab-btn").forEach((btn) => {
      if (btn.getAttribute("data-tab") === target) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Toggle active panes
    const panes = ["dashboard", "workout", "exercises", "routines", "history", "calculators"];
    panes.forEach((p) => {
      const paneEl = document.getElementById(`tab-${p}`);
      if (!paneEl) return;
      if (p === target) {
        paneEl.classList.remove("hidden");
        paneEl.classList.add("active");
      } else {
        paneEl.classList.add("hidden");
        paneEl.classList.remove("active");
      }
    });

    // Re-render the target component
    try {
      if (target === "dashboard" && window.dashboard) window.dashboard.render();
      else if (target === "workout" && window.workoutSession) window.workoutSession.render();
      else if (target === "exercises" && window.exerciseLibrary) window.exerciseLibrary.render();
      else if (target === "routines" && window.routineBuilder) window.routineBuilder.render();
      else if (target === "history" && window.historyLogs) window.historyLogs.render();
      else if (target === "calculators" && window.calculators) window.calculators.render();
    } catch (err) {
      console.warn("Error re-rendering tracker tab:", err);
    }
  }

  switchTab(tabName) {
    this.switchTrackerTab(tabName);
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
      gifUrl: ex.gifUrl || "",
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

  // --- HERO WORKOUT ANIMATIONS & PARTICLES ---
  initHeroParticles() {
    const canvas = document.getElementById("heroParticlesCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || 600);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || 600;
    };
    window.addEventListener("resize", onResize);

    const particleCount = Math.min(45, Math.floor(width / 30));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.55 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.3 ? "#f36100" : "#ff9933"
      });
    }

    let isVisible = true;
    const heroSec = document.getElementById("home");
    if (heroSec && "IntersectionObserver" in window) {
      const obs = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.1 });
      obs.observe(heroSec);
    }

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          p.x += p.speedX;
          p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          ctx.save();
          ctx.globalAlpha = Math.max(0.1, Math.min(0.8, p.alpha));
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  switchHeroExercise(exerciseId, btnEl) {
    if (!window.appState) return;
    const ex = window.appState.getExerciseById(exerciseId);
    if (!ex) return;

    if (btnEl) {
      document.querySelectorAll(".hero-switcher-chips .chip-btn").forEach((b) => b.classList.remove("active"));
      btnEl.classList.add("active");
    }

    const img = document.getElementById("heroExerciseVideo");
    const title = document.getElementById("heroExerciseTitle");
    const sub = document.getElementById("heroExerciseSub");
    const muscle = document.getElementById("heroExerciseMuscle");

    if (img) {
      img.style.opacity = "0.3";
      setTimeout(() => {
        img.src = ex.gifUrl || "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif";
        img.style.opacity = "1";
      }, 150);
    }

    if (title) title.textContent = ex.name;
    if (sub) sub.textContent = `${ex.defaultSets || 3} Sets • ${ex.defaultReps || 10} Reps • ${ex.restSeconds || 60}s Rest`;
    if (muscle) muscle.textContent = `${ex.muscleGroup} • ${ex.equipment}`;
  }

  startQuickWorkout(event) {
    if (event) event.preventDefault();
    let session = window.appState.getActiveSession();
    if (!session) {
      window.workoutSession.startNewSession();
    } else {
      this.switchTrackerTab("workout");
    }
    this.scrollToSection("tracker");
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

  // --- ADVANCED ATHLETIC ANIMATIONS ---
  setupScrollAnimations() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal-item").forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-item").forEach((el, idx) => {
      el.style.transitionDelay = `${(idx % 4) * 0.12}s`;
      observer.observe(el);
    });
  }

  setupCounterAnimation() {
    if (!("IntersectionObserver" in window)) return;

    const stats = document.querySelectorAll(".hero-stat-num");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          if (text.includes("52+")) {
            let count = 0;
            const timer = setInterval(() => {
              count += 2;
              if (count >= 52) {
                el.textContent = "52+";
                clearInterval(timer);
              } else {
                el.textContent = count + "+";
              }
            }, 35);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach((s) => observer.observe(s));
  }

  setupTelemetrySimulation() {
    const bpmEl = document.getElementById("heroTelemetryBpm");
    if (!bpmEl) return;

    setInterval(() => {
      const variation = Math.floor(Math.random() * 7) - 3;
      const targetBpm = Math.min(156, Math.max(140, 146 + variation));
      bpmEl.textContent = targetBpm;
    }, 2800);
  }

  // --- HERO BEAST MODE CONTROLS (Screen 1 Inspired) ---
  setHeroMode(mode) {
    this.heroMode = mode;
    const animeFrame = document.getElementById("heroAnimeFrame");
    const gymFrame = document.getElementById("heroGymFrame");
    const animeControls = document.getElementById("heroAnimeControls");
    const gymControls = document.getElementById("heroGymControls");
    const animeBtn = document.getElementById("heroModeAnimeBtn");
    const gymBtn = document.getElementById("heroModeGymBtn");

    if (mode === "anime") {
      if (animeFrame) animeFrame.classList.remove("hidden");
      if (gymFrame) gymFrame.classList.add("hidden");
      if (animeControls) animeControls.classList.remove("hidden");
      if (gymControls) gymControls.classList.add("hidden");
      if (animeBtn) animeBtn.classList.add("active");
      if (gymBtn) gymBtn.classList.remove("active");
      this.updateAnimeDisplay();
    } else {
      if (animeFrame) animeFrame.classList.add("hidden");
      if (gymFrame) gymFrame.classList.remove("hidden");
      if (animeControls) animeControls.classList.add("hidden");
      if (gymControls) gymControls.classList.remove("hidden");
      if (animeBtn) animeBtn.classList.remove("active");
      if (gymBtn) gymBtn.classList.add("active");
    }
  }

  switchAnimeExercise(id, btnEl) {
    const idx = this.animeExercises.findIndex((ex) => ex.id === id);
    if (idx !== -1) {
      this.currentAnimeIndex = idx;
      const ex = this.animeExercises[idx];
      this.animeTimerSeconds = ex.timerSeconds;
      this.updateAnimeDisplay();
      if (btnEl) {
        document.querySelectorAll(".reel-item").forEach((b) => {
          b.classList.remove("active");
          const ring = b.querySelector(".reel-avatar-ring");
          if (ring) ring.classList.remove("glow-ring");
        });
        btnEl.classList.add("active");
        const ring = btnEl.querySelector(".reel-avatar-ring");
        if (ring) ring.classList.add("glow-ring");
      }
      this.playToneChime(660);
    }
  }

  prevAnimeExercise() {
    this.currentAnimeIndex = (this.currentAnimeIndex - 1 + this.animeExercises.length) % this.animeExercises.length;
    this.syncActiveReelButton();
  }

  nextAnimeExercise() {
    this.currentAnimeIndex = (this.currentAnimeIndex + 1) % this.animeExercises.length;
    this.syncActiveReelButton();
  }

  syncActiveReelButton() {
    const ex = this.animeExercises[this.currentAnimeIndex];
    this.animeTimerSeconds = ex.timerSeconds;
    this.updateAnimeDisplay();
    const buttons = document.querySelectorAll(".reel-item");
    if (buttons && buttons[this.currentAnimeIndex]) {
      buttons.forEach((b) => {
        b.classList.remove("active");
        const ring = b.querySelector(".reel-avatar-ring");
        if (ring) ring.classList.remove("glow-ring");
      });
      buttons[this.currentAnimeIndex].classList.add("active");
      const ring = buttons[this.currentAnimeIndex].querySelector(".reel-avatar-ring");
      if (ring) ring.classList.add("glow-ring");
    }
    this.playToneChime(740);
  }

  updateAnimeDisplay() {
    const ex = this.animeExercises[this.currentAnimeIndex];
    if (!ex) return;

    const img = document.getElementById("heroAnimeGraphic");
    const countEl = document.getElementById("heroAnimeCount");
    const nameEl = document.getElementById("heroAnimeName");
    const muscleEl = document.getElementById("heroExerciseMuscle");
    const bpmEl = document.getElementById("heroTelemetryBpm");

    if (img) img.src = ex.graphic;
    if (countEl) countEl.textContent = ex.count;
    if (nameEl) nameEl.textContent = ex.name;
    if (muscleEl) muscleEl.textContent = `${ex.name.split(" ")[0]} • ${ex.muscle}`;
    if (bpmEl) bpmEl.textContent = ex.bpm;

    this.renderDotMatrixTime();
  }

  initAnimeTimer() {
    this.renderDotMatrixTime();
    if (this.animeTimerInterval) clearInterval(this.animeTimerInterval);

    this.animeTimerInterval = setInterval(() => {
      if (this.isAnimeTimerRunning) {
        if (this.animeTimerSeconds > 0) {
          this.animeTimerSeconds--;
          this.renderDotMatrixTime();
          if (this.animeTimerSeconds === 3 || this.animeTimerSeconds === 2 || this.animeTimerSeconds === 1) {
            this.playToneChime(880);
          }
        } else {
          this.playToneChime(1200, 0.3);
          this.showToast(`Workout Set Complete! Smashing records.`, "success");
          const ex = this.animeExercises[this.currentAnimeIndex];
          this.animeTimerSeconds = ex.timerSeconds;
        }
      }
    }, 1000);
  }

  toggleAnimeTimer() {
    this.isAnimeTimerRunning = !this.isAnimeTimerRunning;
    const playBtn = document.getElementById("animePlayPauseBtn");
    const icon = document.getElementById("animePlayPauseIcon");

    if (this.isAnimeTimerRunning) {
      if (playBtn) playBtn.classList.remove("is-paused");
      if (icon) {
        icon.innerHTML = '<span class="p-bar"></span><span class="p-bar"></span>';
      }
      this.playToneChime(800);
    } else {
      if (playBtn) playBtn.classList.add("is-paused");
      if (icon) {
        icon.innerHTML = '<span class="play-triangle-icon">▶</span>';
      }
      this.playToneChime(400);
    }
  }

  renderDotMatrixTime() {
    const timerEl = document.getElementById("dotMatrixTimer");
    if (!timerEl) return;
    const mins = Math.floor(this.animeTimerSeconds / 60);
    const secs = this.animeTimerSeconds % 60;
    const pad = (n) => (n < 10 ? "0" + n : n);
    timerEl.textContent = `${pad(mins)}:${pad(secs)}`;
  }

  toggleAudioMute() {
    this.isAudioMuted = !this.isAudioMuted;
    const btn = document.getElementById("animeMuteBtn");
    if (btn) {
      btn.style.opacity = this.isAudioMuted ? "0.4" : "1";
    }
    this.showToast(this.isAudioMuted ? "Sound muted" : "Audio cues active", "info");
  }

  playToneChime(freq = 600, duration = 0.08) {
    if (this.isAudioMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  playToneChimeWithRhythm() {
    this.playToneChime(520, 0.08);
    setTimeout(() => this.playToneChime(660, 0.08), 120);
    setTimeout(() => this.playToneChime(820, 0.12), 240);
  }

  // --- JUICE LAB DISCOVERY & CATEGORIES (Screen 2) ---
  filterCategoryAndScroll(cat, btnEl) {
    document.querySelectorAll(".cat-card-pill").forEach((b) => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    this.playToneChime(700);

    // Switch tracker tab to exercises and apply category filter
    this.switchTrackerTab("exercises");
    if (window.exerciseLibrary) {
      window.exerciseLibrary.setCategory(cat);
    }
    this.scrollToSection("tracker");
    this.showToast(`Filter applied: ${cat.toUpperCase()}`, "info");
  }

  startQuickWorkoutRoutine(routineKey) {
    this.switchTrackerTab("workout");
    this.scrollToSection("tracker");

    if (routineKey === "full_body") {
      this.addExerciseToWorkout("ex_barbell_deadlift");
      this.addExerciseToWorkout("ex_bench_press");
      this.addExerciseToWorkout("ex_barbell_squat");
      this.showToast("Loaded 'Full Body Strength' routine (351 kcal target)!", "success");
    } else if (routineKey === "cardio") {
      this.addExerciseToWorkout("ex_burpee");
      this.addExerciseToWorkout("ex_jumping_jack");
      this.addExerciseToWorkout("ex_mountain_climber");
      this.showToast("Loaded 'Outdoor Cardio HIIT' routine (280 kcal burn)!", "success");
    }
    this.playToneChimeWithRhythm();
  }

  setupCircularProgressObserver() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const wrap = entry.target;
            const percent = parseInt(wrap.getAttribute("data-percent") || "0", 10);
            const fill = wrap.querySelector(".ring-fill");
            if (fill) {
              const circumference = 132;
              const offset = circumference - (percent / 100) * circumference;
              fill.style.strokeDashoffset = offset;
            }
            observer.unobserve(wrap);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".circular-progress-wrap").forEach((el) => observer.observe(el));
  }

  // --- JUICE LAB AI FITNESS COACH (Screen 3) ---
  openAiCoachModal() {
    const backdrop = document.getElementById("aiCoachBackdrop");
    if (backdrop) {
      backdrop.classList.remove("hidden");
      this.playToneChime(850, 0.1);
    }
  }

  closeAiCoachModal() {
    const backdrop = document.getElementById("aiCoachBackdrop");
    if (backdrop) backdrop.classList.add("hidden");
  }

  triggerVoiceAiInteraction() {
    const micBtn = document.getElementById("voiceMicBtn");
    const msgEl = document.getElementById("aiMessageText");
    const actionSlot = document.getElementById("aiActionSlot");

    if (micBtn) micBtn.classList.add("listening");
    if (msgEl) msgEl.textContent = "🎙️ Listening to your voice... Speak your workout target or question now.";
    this.playToneChime(950, 0.15);

    setTimeout(() => {
      if (micBtn) micBtn.classList.remove("listening");
      if (msgEl) {
        msgEl.innerHTML = `<strong>"Full Body Strength Plan" detected!</strong><br />Here is your optimal 351 kcal routine: Barbell Deadlift (4x8) + Overhead Press (4x10) + Bulgarian Split Squat (3x12).`;
      }
      if (actionSlot) {
        actionSlot.innerHTML = `
          <button class="btn-gymlife btn-sm mt-3" onclick="window.app.startQuickWorkoutRoutine('full_body'); window.app.closeAiCoachModal();">
            Load Routine into Tracker &rarr;
          </button>
        `;
      }
      this.playToneChimeWithRhythm();
    }, 2200);
  }

  askAiPrompt(promptKey) {
    const msgEl = document.getElementById("aiMessageText");
    const actionSlot = document.getElementById("aiActionSlot");
    if (!msgEl) return;

    this.playToneChime(750, 0.08);

    const prompts = {
      plan_workout: {
        text: `⚡ <strong>Juice Lab AI Routine:</strong> Today's focus is High-Torque Compound Power. 5 min dynamic warmup followed by Deadlifts (4 sets), Bench Press (4 sets), and Lat Pulldowns (3 sets). Target burn: <strong>420 kcal</strong>.`,
        action: `<button class="btn-gymlife btn-sm mt-2" onclick="window.app.startQuickWorkoutRoutine('full_body'); window.app.closeAiCoachModal();">Load Routine to Tracker &rarr;</button>`
      },
      give_challenge: {
        text: `🔥 <strong>Saiyan Beast Challenge:</strong> Complete 50 Pushups, 50 Jump Squats, and 30 Mountain Climbers in under 8 minutes! Timer will track your tempo.`,
        action: `<button class="btn-gymlife btn-sm mt-2" onclick="window.app.startQuickWorkoutRoutine('cardio'); window.app.closeAiCoachModal();">Accept Challenge &rarr;</button>`
      },
      what_eat: {
        text: `🥗 <strong>Macro Fuel Protocol:</strong> Post-training, aim for 35g Whey/Plant Protein + 65g Complex Carbohydrates (Oats/Rice) + 500ml electrolyte water for optimal glycogen synthesis.`,
        action: ``
      },
      strength_routine: {
        text: `🏋️ <strong>Hypertrophy Overload:</strong> Barbell Bench Press (3x8-10 @ RPE 8) ➔ Incline Dumbbell Flyes (3x12) ➔ Tricep Rope Pushdowns (4x12-15). 90s rest with audio chimes.`,
        action: `<button class="btn-gymlife btn-sm mt-2" onclick="window.app.startQuickWorkoutRoutine('full_body'); window.app.closeAiCoachModal();">Start Strength Routine &rarr;</button>`
      },
      set_goal: {
        text: `🎯 <strong>Daily Target Active:</strong> Burn 500 kcal, complete 16 total sets, and log all weights to trigger automatic progressive overload PR detection!`,
        action: ``
      },
      recovery_tips: {
        text: `💤 <strong>Recovery Science:</strong> 7.5 to 8.5 hours sleep tonight. 10 minutes foam rolling on quads and thoracic spine. Hydrate with 3.5 liters throughout the day.`,
        action: ``
      },
      show_progress: {
        text: `📊 <strong>Athlete Stats:</strong> 52+ exercises ready in your engine. Active streak: <strong>7 Days</strong>. All system metrics operating in Zone 4.`,
        action: `<button class="btn-gymlife btn-sm mt-2" onclick="window.app.switchTrackerTab('analytics'); window.app.scrollToSection('tracker'); window.app.closeAiCoachModal();">View Analytics &rarr;</button>`
      }
    };

    const res = prompts[promptKey] || prompts.plan_workout;
    msgEl.innerHTML = res.text;
    if (actionSlot) actionSlot.innerHTML = res.action;
  }

  // --- MOBILE GLASS DOCK NAVIGATION ---
  navigateDock(dest, btnEl) {
    document.querySelectorAll(".dock-item").forEach((b) => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    this.playToneChime(640, 0.06);

    if (dest === "home") {
      this.scrollToSection("home");
    } else if (dest === "explore") {
      this.scrollToSection("explore");
    } else if (dest === "workout") {
      this.switchTrackerTab("workout");
      this.scrollToSection("tracker");
    } else if (dest === "library") {
      this.switchTrackerTab("exercises");
      this.scrollToSection("tracker");
    }
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
