/**
 * Active Workout Session Component
 * Real-time set logging, dynamic volume & calorie counter, integrated rest timer with audio cues,
 * and celebratory finish modal with confetti animation.
 */

class WorkoutSessionComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.timerInterval = null;
    this.restInterval = null;
    this.restTimeRemaining = 0;
    this.restTotalTime = 60;
    this.isRestRunning = false;

    this.bindEvents();
    this.startTicker();
  }

  bindEvents() {
    window.appState.on("sessionChanged", () => this.render());
  }

  startTicker() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      const session = window.appState.getActiveSession();
      if (session && !session.paused) {
        session.durationSeconds = (session.durationSeconds || 0) + 1;
        // update live time display without re-rendering entire DOM every second
        const timeEl = document.getElementById("activeSessionLiveTime");
        if (timeEl) {
          timeEl.textContent = Helpers.formatSeconds(session.durationSeconds);
        }
        const calEl = document.getElementById("activeSessionLiveCals");
        if (calEl) {
          const cals = this.calculateEstimatedCalories(session);
          calEl.textContent = `${cals} kcal`;
        }
        // Persist periodically
        if (session.durationSeconds % 10 === 0) {
          window.appState.setActiveSession(session);
        }
      }
    }, 1000);
  }

  calculateEstimatedCalories(session) {
    if (!session) return 0;
    const settings = window.appState.getSettings();
    const weight = settings.weightKg || 75;
    const mins = (session.durationSeconds || 0) / 60;
    // Base metabolic rate during resistance exercise: ~6.5 kcal/kg/hour
    const calPerMin = (weight * 0.08);
    return Math.round(mins * calPerMin);
  }

  calculateSessionVolume(session) {
    if (!session || !session.exercises) return 0;
    let volume = 0;
    session.exercises.forEach((ex) => {
      if (ex.sets) {
        ex.sets.forEach((s) => {
          if (s.completed) {
            volume += (parseFloat(s.weight) || 0) * (parseInt(s.reps, 10) || 0);
          }
        });
      }
    });
    return Math.round(volume);
  }

  startNewSession(routine = null) {
    const allExercises = window.appState.getExercises();
    let exercises = [];

    if (routine && routine.exerciseIds) {
      exercises = routine.exerciseIds
        .map((eid) => {
          const ex = allExercises.find((e) => e.id === eid);
          if (!ex) return null;
          return {
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
          };
        })
        .filter(Boolean);
    }

    const session = {
      id: "session_" + Date.now(),
      routineId: routine ? routine.id : null,
      title: routine ? routine.title : "Custom Workout Session",
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      paused: false,
      exercises
    };

    window.appState.setActiveSession(session);
    this.render();
    window.app.switchTab("workout-session");
    window.app.showToast("Workout session started! Let's crush it.", "success");
  }

  render() {
    if (!this.container) return;
    const session = window.appState.getActiveSession();
    const settings = window.appState.getSettings();
    const unit = settings.unit || "kg";

    if (!session) {
      this.container.innerHTML = `
        <div class="session-empty-state">
          <div class="session-empty-card">
            <div class="empty-icon-pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <h2>No Active Workout Right Now</h2>
            <p>Pick a structured program from your routines, or start a blank workout and add exercises on the fly!</p>
            <div class="session-empty-actions">
              <button class="btn btn-primary" onclick="window.workoutSession.startNewSession()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Start Empty Workout
              </button>
              <button class="btn btn-secondary" onclick="window.app.switchTab('routines')">
                Browse Pre-made Routines
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const currentVolume = this.calculateSessionVolume(session);
    const estimatedCals = this.calculateEstimatedCalories(session);
    const allExercises = window.appState.getExercises();

    this.container.innerHTML = `
      <div class="session-active-wrapper">
        <!-- Floating Live HUD Header -->
        <div class="session-hud-sticky">
          <div class="hud-top">
            <div class="hud-title-wrap">
              <span class="pulse-indicator"></span>
              <h2 class="hud-title">${Helpers.escapeHtml(session.title)}</h2>
            </div>
            <div class="hud-controls">
              <button class="btn btn-sm btn-outline-danger" onclick="window.workoutSession.confirmDiscard()">
                Discard
              </button>
              <button class="btn btn-sm btn-primary" onclick="window.workoutSession.finishWorkout()">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                Finish Workout
              </button>
            </div>
          </div>

          <!-- Live Stats Ribbon -->
          <div class="hud-metrics-ribbon">
            <div class="hud-metric">
              <span class="hud-metric-label">Elapsed Time</span>
              <span class="hud-metric-value" id="activeSessionLiveTime">${Helpers.formatSeconds(session.durationSeconds)}</span>
            </div>
            <div class="hud-metric">
              <span class="hud-metric-label">Volume</span>
              <span class="hud-metric-value" id="activeSessionLiveVol">${currentVolume.toLocaleString()} <small>${unit}</small></span>
            </div>
            <div class="hud-metric">
              <span class="hud-metric-label">Est. Burn</span>
              <span class="hud-metric-value" id="activeSessionLiveCals">${estimatedCals} kcal</span>
            </div>
          </div>
        </div>

        <!-- Rest Timer Bar (Sticky/Floating) -->
        <div id="restTimerBar" class="rest-timer-bar ${this.isRestRunning ? "rest-active" : "hidden"}">
          <div class="rest-timer-info">
            <svg class="icon animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <div>
              <span class="rest-label">Rest Timer</span>
              <span class="rest-countdown" id="restTimerDigits">${Helpers.formatSeconds(this.restTimeRemaining)}</span>
            </div>
          </div>
          <div class="rest-timer-actions">
            <button class="btn btn-xs btn-secondary" onclick="window.workoutSession.adjustRest(-15)">-15s</button>
            <button class="btn btn-xs btn-secondary" onclick="window.workoutSession.adjustRest(30)">+30s</button>
            <button class="btn btn-xs btn-warning" onclick="window.workoutSession.skipRest()">Skip</button>
          </div>
        </div>

        <!-- Exercises List in Session -->
        <div class="session-exercises-list">
          ${
            session.exercises.length === 0
              ? `<div class="empty-state">
                  <p>Your session is empty! Tap the button below to add your first exercise.</p>
                </div>`
              : session.exercises
                  .map((exItem, exIdx) => this.renderExerciseCard(exItem, exIdx, unit))
                  .join("")
          }
        </div>

        <!-- Add Exercise to Current Session Drawer -->
        <div class="session-add-exercise-bar">
          <select id="sessionAddExSelect" class="select">
            <option value="">-- Add another exercise to this session --</option>
            ${allExercises
              .map(
                (e) => `
              <option value="${e.id}">${e.name} (${e.muscleGroup})</option>
            `
              )
              .join("")}
          </select>
          <button class="btn btn-primary" onclick="window.workoutSession.addExerciseFromSelect()">
            + Add Exercise
          </button>
        </div>
      </div>

      <!-- Celebratory Finish Modal -->
      <div id="finishModalBackdrop" class="modal-backdrop hidden">
        <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
        <div class="modal-content modal-summary" onclick="event.stopPropagation()">
          <div class="summary-trophy">🏆</div>
          <h2 class="summary-title">Workout Completed!</h2>
          <p class="summary-subtitle">Outstanding effort! Here is your training recap:</p>
          
          <div class="summary-stats-grid" id="summaryStatsGrid">
            <!-- Dynamically populated on finish -->
          </div>

          <div class="summary-actions">
            <button class="btn btn-primary w-full" onclick="window.workoutSession.closeFinishModal()">
              Save & View Dashboard
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderExerciseCard(exItem, exIdx, unit) {
    return `
      <div class="card session-exercise-card">
        <div class="session-ex-header">
          <div>
            <div class="exercise-badges mb-1">
              <span class="badge" style="background-color: ${Helpers.getMuscleColor(
                exItem.muscleGroup
              )}20; color: ${Helpers.getMuscleColor(exItem.muscleGroup)};">
                ${Helpers.escapeHtml(exItem.muscleGroup || "Exercise")}
              </span>
              <span class="badge badge-subtle">${Helpers.escapeHtml(exItem.equipment || "Standard")}</span>
            </div>
            <h3 class="session-ex-name">${Helpers.escapeHtml(exItem.name)}</h3>
          </div>
          <button class="btn-icon-danger" onclick="window.workoutSession.removeExercise(${exIdx})" title="Remove exercise from workout">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>

        <!-- Sets Table -->
        <div class="sets-table-wrap">
          <table class="sets-table">
            <thead>
              <tr>
                <th style="width: 50px;">Set</th>
                <th>Weight (${unit})</th>
                <th>Reps</th>
                <th style="width: 80px; text-align: center;">Done</th>
                <th style="width: 40px;"></th>
              </tr>
            </thead>
            <tbody>
              ${(exItem.sets || [])
                .map(
                  (set, sIdx) => `
                <tr class="set-row ${set.completed ? "set-completed" : ""}">
                  <td class="set-col-num">
                    <span class="set-num-badge">${set.setNum}</span>
                  </td>
                  <td class="set-col-input">
                    <div class="stepper-input">
                      <button type="button" class="stepper-btn" onclick="window.workoutSession.stepWeight(${exIdx}, ${sIdx}, -2.5)">-</button>
                      <input 
                        type="number" 
                        class="input-set" 
                        value="${set.weight}" 
                        step="0.5" 
                        min="0"
                        onchange="window.workoutSession.updateSetVal(${exIdx}, ${sIdx}, 'weight', this.value)"
                      />
                      <button type="button" class="stepper-btn" onclick="window.workoutSession.stepWeight(${exIdx}, ${sIdx}, 2.5)">+</button>
                    </div>
                  </td>
                  <td class="set-col-input">
                    <div class="stepper-input">
                      <button type="button" class="stepper-btn" onclick="window.workoutSession.stepReps(${exIdx}, ${sIdx}, -1)">-</button>
                      <input 
                        type="number" 
                        class="input-set" 
                        value="${set.reps}" 
                        min="1" 
                        max="200"
                        onchange="window.workoutSession.updateSetVal(${exIdx}, ${sIdx}, 'reps', this.value)"
                      />
                      <button type="button" class="stepper-btn" onclick="window.workoutSession.stepReps(${exIdx}, ${sIdx}, 1)">+</button>
                    </div>
                  </td>
                  <td class="set-col-check">
                    <button 
                      type="button" 
                      class="btn-check-set ${set.completed ? "checked" : ""}" 
                      onclick="window.workoutSession.toggleSetDone(${exIdx}, ${sIdx})"
                      title="${set.completed ? "Mark incomplete" : "Complete set"}"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </button>
                  </td>
                  <td class="set-col-del">
                    <button 
                      type="button" 
                      class="btn-icon-tiny text-muted" 
                      onclick="window.workoutSession.deleteSet(${exIdx}, ${sIdx})"
                      title="Delete set"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="session-ex-footer">
          <button type="button" class="btn btn-sm btn-ghost" onclick="window.workoutSession.addSet(${exIdx})">
            + Add Set
          </button>
        </div>
      </div>
    `;
  }

  // --- SET ACTIONS ---
  updateSetVal(exIdx, sIdx, field, val) {
    const session = window.appState.getActiveSession();
    if (!session || !session.exercises[exIdx] || !session.exercises[exIdx].sets[sIdx]) return;

    session.exercises[exIdx].sets[sIdx][field] = parseFloat(val) || 0;
    window.appState.setActiveSession(session);
    this.updateHUDStats(session);
  }

  stepWeight(exIdx, sIdx, delta) {
    const session = window.appState.getActiveSession();
    if (!session || !session.exercises[exIdx] || !session.exercises[exIdx].sets[sIdx]) return;

    const current = parseFloat(session.exercises[exIdx].sets[sIdx].weight) || 0;
    session.exercises[exIdx].sets[sIdx].weight = Math.max(0, Math.round((current + delta) * 10) / 10);
    window.appState.setActiveSession(session);
    this.render();
  }

  stepReps(exIdx, sIdx, delta) {
    const session = window.appState.getActiveSession();
    if (!session || !session.exercises[exIdx] || !session.exercises[exIdx].sets[sIdx]) return;

    const current = parseInt(session.exercises[exIdx].sets[sIdx].reps, 10) || 0;
    session.exercises[exIdx].sets[sIdx].reps = Math.max(1, current + delta);
    window.appState.setActiveSession(session);
    this.render();
  }

  toggleSetDone(exIdx, sIdx) {
    const session = window.appState.getActiveSession();
    if (!session || !session.exercises[exIdx] || !session.exercises[exIdx].sets[sIdx]) return;

    const set = session.exercises[exIdx].sets[sIdx];
    set.completed = !set.completed;

    if (set.completed) {
      window.soundFx.playSetComplete();
      const restSec = session.exercises[exIdx].restSeconds || 60;
      this.startRestTimer(restSec);
    }

    window.appState.setActiveSession(session);
    this.render();
  }

  addSet(exIdx) {
    const session = window.appState.getActiveSession();
    if (!session || !session.exercises[exIdx]) return;

    const sets = session.exercises[exIdx].sets || [];
    const lastSet = sets[sets.length - 1];
    const newSet = {
      setNum: sets.length + 1,
      weight: lastSet ? lastSet.weight : 0,
      reps: lastSet ? lastSet.reps : 10,
      completed: false
    };

    sets.push(newSet);
    window.appState.setActiveSession(session);
    this.render();
  }

  deleteSet(exIdx, sIdx) {
    const session = window.appState.getActiveSession();
    if (!session || !session.exercises[exIdx]) return;

    session.exercises[exIdx].sets.splice(sIdx, 1);
    // Renumber
    session.exercises[exIdx].sets.forEach((s, idx) => {
      s.setNum = idx + 1;
    });

    window.appState.setActiveSession(session);
    this.render();
  }

  removeExercise(exIdx) {
    const session = window.appState.getActiveSession();
    if (!session) return;
    session.exercises.splice(exIdx, 1);
    window.appState.setActiveSession(session);
    this.render();
  }

  addExerciseFromSelect() {
    const sel = document.getElementById("sessionAddExSelect");
    if (!sel || !sel.value) return;

    const exId = sel.value;
    const ex = window.appState.getExerciseById(exId);
    if (!ex) return;

    const session = window.appState.getActiveSession();
    if (!session) return;

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
    this.render();
    window.app.showToast(`Added ${ex.name} to session`, "success");
  }

  // --- REST TIMER ---
  startRestTimer(seconds) {
    if (this.restInterval) clearInterval(this.restInterval);
    this.restTotalTime = seconds;
    this.restTimeRemaining = seconds;
    this.isRestRunning = true;

    const bar = document.getElementById("restTimerBar");
    if (bar) bar.classList.remove("hidden", "rest-active");
    if (bar) bar.classList.add("rest-active");

    this.restInterval = setInterval(() => {
      this.restTimeRemaining--;

      const digitsEl = document.getElementById("restTimerDigits");
      if (digitsEl) {
        digitsEl.textContent = Helpers.formatSeconds(this.restTimeRemaining);
      }

      // Audio beeps at 3, 2, 1
      if (this.restTimeRemaining === 3 || this.restTimeRemaining === 2 || this.restTimeRemaining === 1) {
        window.soundFx.playCountdownTick();
      }

      if (this.restTimeRemaining <= 0) {
        clearInterval(this.restInterval);
        this.isRestRunning = false;
        window.soundFx.playGoTone();
        if (bar) bar.classList.add("hidden");
        window.app.showToast("Rest over! Next set ready.", "info");
      }
    }, 1000);
  }

  adjustRest(delta) {
    this.restTimeRemaining = Math.max(0, this.restTimeRemaining + delta);
    const digitsEl = document.getElementById("restTimerDigits");
    if (digitsEl) {
      digitsEl.textContent = Helpers.formatSeconds(this.restTimeRemaining);
    }
  }

  skipRest() {
    if (this.restInterval) clearInterval(this.restInterval);
    this.isRestRunning = false;
    const bar = document.getElementById("restTimerBar");
    if (bar) bar.classList.add("hidden");
  }

  updateHUDStats(session) {
    const volEl = document.getElementById("activeSessionLiveVol");
    if (volEl) {
      const vol = this.calculateSessionVolume(session);
      const unit = window.appState.getSettings().unit || "kg";
      volEl.innerHTML = `${vol.toLocaleString()} <small>${unit}</small>`;
    }
  }

  // --- FINISH & CELEBRATION ---
  finishWorkout() {
    const session = window.appState.getActiveSession();
    if (!session) return;

    const totalVolume = this.calculateSessionVolume(session);
    const calories = this.calculateEstimatedCalories(session);
    const duration = session.durationSeconds || 60;
    const settings = window.appState.getSettings();
    const unit = settings.unit || "kg";

    let totalCompletedSets = 0;
    session.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) totalCompletedSets++;
      });
    });

    const logEntry = {
      id: "log_" + Date.now(),
      routineId: session.routineId,
      title: session.title,
      date: new Date().toISOString(),
      durationSeconds: duration,
      caloriesBurned: calories,
      totalVolume,
      completedSetsCount: totalCompletedSets,
      exercises: session.exercises
    };

    // Save to logs
    window.appState.addLog(logEntry);
    window.appState.clearActiveSession();

    // Sound fanfare
    window.soundFx.playVictoryFanfare();

    // Show summary modal
    this.showFinishCelebration(logEntry, unit);
  }

  showFinishCelebration(logEntry, unit) {
    const backdrop = document.getElementById("finishModalBackdrop");
    const grid = document.getElementById("summaryStatsGrid");
    if (!backdrop || !grid) return;

    grid.innerHTML = `
      <div class="summary-stat-box">
        <span class="stat-box-label">Duration</span>
        <span class="stat-box-val">${Helpers.formatSeconds(logEntry.durationSeconds)}</span>
      </div>
      <div class="summary-stat-box">
        <span class="stat-box-label">Total Volume</span>
        <span class="stat-box-val">${logEntry.totalVolume.toLocaleString()} ${unit}</span>
      </div>
      <div class="summary-stat-box">
        <span class="stat-box-label">Completed Sets</span>
        <span class="stat-box-val">${logEntry.completedSetsCount || 0}</span>
      </div>
      <div class="summary-stat-box">
        <span class="stat-box-label">Calories Burned</span>
        <span class="stat-box-val">${logEntry.caloriesBurned} kcal</span>
      </div>
    `;

    backdrop.classList.remove("hidden");
    this.launchConfetti();
  }

  launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 8 + 4,
      color: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"][
        Math.floor(Math.random() * 6)
      ],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    }));

    let animFrame = null;
    let frames = 0;

    const renderConfetti = () => {
      frames++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (frames < 240) {
        animFrame = requestAnimationFrame(renderConfetti);
      }
    };

    renderConfetti();
  }

  closeFinishModal() {
    const backdrop = document.getElementById("finishModalBackdrop");
    if (backdrop) backdrop.classList.add("hidden");
    window.app.switchTab("dashboard");
  }

  confirmDiscard() {
    if (confirm("Are you sure you want to discard this in-progress workout? Progress will not be logged.")) {
      window.appState.clearActiveSession();
      if (this.restInterval) clearInterval(this.restInterval);
      this.isRestRunning = false;
      this.render();
      window.app.showToast("Workout discarded", "info");
    }
  }
}

window.WorkoutSessionComponent = WorkoutSessionComponent;
