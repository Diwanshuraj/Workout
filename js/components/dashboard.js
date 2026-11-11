/**
 * Dashboard Component
 * Dynamically computes and displays athlete stats, weekly volume chart, streak, and recent logs.
 */

class DashboardComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.bindEvents();
  }

  bindEvents() {
    window.appState.on("logsChanged", () => this.render());
    window.appState.on("sessionChanged", () => this.render());
    window.appState.on("settingsChanged", () => this.render());
  }

  calculateStats() {
    const logs = window.appState.getLogs();
    const settings = window.appState.getSettings();
    const unit = settings.unit || "kg";

    const totalWorkouts = logs.length;
    let totalSeconds = 0;
    let totalCalories = 0;
    let totalVolume = 0;

    logs.forEach((log) => {
      totalSeconds += log.durationSeconds || 0;
      totalCalories += log.caloriesBurned || 0;
      totalVolume += log.totalVolume || 0;
    });

    // Calculate Streak (consecutive days with at least one workout)
    const streak = this.calculateStreak(logs);

    return {
      totalWorkouts,
      totalDurationFormatted: Helpers.formatSeconds(totalSeconds),
      totalCalories,
      totalVolume: Math.round(totalVolume),
      unit,
      streak
    };
  }

  calculateStreak(logs) {
    if (!logs || logs.length === 0) return 0;

    const uniqueDates = [
      ...new Set(
        logs.map((l) => {
          const d = new Date(l.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        })
      )
    ].sort().reverse();

    if (uniqueDates.length === 0) return 0;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

    // If no workout today or yesterday, streak is broken
    let currentIdx = 0;
    if (uniqueDates[0] === todayStr) {
      currentIdx = 0;
    } else if (uniqueDates[0] === yesterdayStr) {
      currentIdx = 0;
    } else {
      return 0;
    }

    let streakCount = 1;
    let checkDate = new Date(uniqueDates[currentIdx]);

    for (let i = currentIdx + 1; i < uniqueDates.length; i++) {
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
      const expectedStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
      if (uniqueDates[i] === expectedStr) {
        streakCount++;
      } else {
        break;
      }
    }

    return streakCount;
  }

  render() {
    if (!this.container) return;
    const stats = this.calculateStats();
    const activeSession = window.appState.getActiveSession();
    const logs = window.appState.getLogs().slice(0, 4);
    const routines = window.appState.getRoutines();

    this.container.innerHTML = `
      <div class="dashboard-wrapper">
        <!-- Hero Header -->
        <div class="dashboard-hero">
          <div class="hero-text">
            <span class="hero-badge"><span class="pulse-dot"></span> Ready to Train</span>
            <h1 class="hero-title">Elevate Your Performance</h1>
            <p class="hero-subtitle">Track every rep, calculate your maximums, and fuel your progress dynamically.</p>
          </div>
          <div class="hero-actions">
            ${
              activeSession
                ? `<button class="btn btn-warning btn-pulse" onclick="window.app.switchTab('workout-session')">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Resume In-Progress Workout
                   </button>`
                : `<button class="btn btn-primary" onclick="window.app.startQuickWorkout()">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                    Start Empty Workout
                   </button>
                   <button class="btn btn-secondary" onclick="window.app.switchTab('routines')">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                    Explore Routines
                   </button>`
            }
          </div>
        </div>

        <!-- Metrics Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon-wrap icon-emerald">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Total Workouts</div>
              <div class="stat-value">${stats.totalWorkouts}</div>
              <div class="stat-meta">Completed sessions</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap icon-amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Current Streak</div>
              <div class="stat-value">${stats.streak} <span class="unit-text">Days</span></div>
              <div class="stat-meta">Consistency score</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap icon-cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Total Volume</div>
              <div class="stat-value">${stats.totalVolume.toLocaleString()} <span class="unit-text">${stats.unit}</span></div>
              <div class="stat-meta">Weight lifted</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrap icon-rose">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="stat-content">
              <div class="stat-label">Time Trained</div>
              <div class="stat-value">${stats.totalDurationFormatted}</div>
              <div class="stat-meta">Active training</div>
            </div>
          </div>
        </div>

        <!-- Charts & Analytics Section -->
        <div class="dashboard-analytics-row">
          <!-- Weekly Volume Canvas Chart -->
          <div class="card analytics-card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Training Volume (Last 7 Days)</h3>
                <p class="card-subtitle">Daily weight volume lifted in ${stats.unit}</p>
              </div>
              <span class="badge badge-emerald">Dynamic Data</span>
            </div>
            <div class="card-body">
              <div class="canvas-container">
                <canvas id="weeklyVolumeCanvas" height="220"></canvas>
              </div>
            </div>
          </div>

          <!-- Muscle Group Distribution -->
          <div class="card analytics-card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Target Muscle Balance</h3>
                <p class="card-subtitle">Exercise focus distribution</p>
              </div>
              <button class="btn-text" onclick="window.app.switchTab('exercises')">Browse Library &rarr;</button>
            </div>
            <div class="card-body">
              <div id="muscleDistributionBars" class="muscle-bars-list">
                <!-- Dynamically rendered -->
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Access Routines & Recent Logs -->
        <div class="dashboard-lower-row">
          <!-- Recommended Routines -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Popular Routines</h3>
                <p class="card-subtitle">Jump straight into a proven workout plan</p>
              </div>
              <button class="btn-text" onclick="window.app.switchTab('routines')">View All (${routines.length}) &rarr;</button>
            </div>
            <div class="card-body">
              <div class="mini-routines-grid">
                ${routines
                  .slice(0, 3)
                  .map(
                    (r) => `
                    <div class="mini-routine-card">
                      <div class="mini-routine-top">
                        <span class="badge badge-primary">${Helpers.escapeHtml(r.category)}</span>
                        <span class="mini-duration">${r.durationMinutes} mins</span>
                      </div>
                      <h4 class="mini-routine-title">${Helpers.escapeHtml(r.title)}</h4>
                      <p class="mini-routine-muscles">${Helpers.escapeHtml(r.targetMuscle)}</p>
                      <button class="btn btn-sm btn-primary w-full" onclick="window.app.startRoutineById('${r.id}')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        Start Routine
                      </button>
                    </div>
                  `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <div class="card-header">
              <div>
                <h3 class="card-title">Recent Activity</h3>
                <p class="card-subtitle">Latest completed sessions</p>
              </div>
              <button class="btn-text" onclick="window.app.switchTab('logs')">Full History &rarr;</button>
            </div>
            <div class="card-body">
              ${
                logs.length === 0
                  ? `<div class="empty-state">
                      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <p>No workouts recorded yet. Start your first session today!</p>
                    </div>`
                  : `<div class="recent-logs-list">
                      ${logs
                        .map(
                          (l) => `
                        <div class="recent-log-item">
                          <div class="recent-log-info">
                            <div class="recent-log-title">${Helpers.escapeHtml(l.title)}</div>
                            <div class="recent-log-meta">
                              <span>${Helpers.formatDate(l.date)}</span>
                              <span>&bull;</span>
                              <span>${Helpers.formatSeconds(l.durationSeconds)}</span>
                              <span>&bull;</span>
                              <span>${l.totalVolume.toLocaleString()} ${stats.unit}</span>
                            </div>
                          </div>
                          <button class="btn btn-sm btn-ghost" onclick="window.app.viewLogDetails('${l.id}')">
                            Details
                          </button>
                        </div>
                      `
                        )
                        .join("")}
                    </div>`
              }
            </div>
          </div>
        </div>
      </div>
    `;

    // Render Canvas Chart and Muscle Distribution Bars
    setTimeout(() => {
      this.drawWeeklyChart();
      this.renderMuscleDistribution();
    }, 50);
  }

  drawWeeklyChart() {
    const canvas = document.getElementById("weeklyVolumeCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI retina display
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 220 * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = 220;

    // Generate last 7 days data
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      days.push({
        dayName: d.toLocaleDateString(undefined, { weekday: "short" }),
        dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
        volume: 0
      });
    }

    const logs = window.appState.getLogs();
    logs.forEach((log) => {
      const ld = new Date(log.date);
      const lStr = `${ld.getFullYear()}-${String(ld.getMonth() + 1).padStart(2, "0")}-${String(ld.getDate()).padStart(2, "0")}`;
      const found = days.find((d) => d.dateStr === lStr);
      if (found) {
        found.volume += log.totalVolume || 0;
      }
    });

    const maxVolume = Math.max(...days.map((d) => d.volume), 1000);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Padding
    const padLeft = 40;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 35;
    const chartWidth = width - padLeft - padRight;
    const chartHeight = height - padTop - padBottom;

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padTop + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      // Axis labels
      const val = Math.round(maxVolume * (1 - i / 4));
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "11px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val, padLeft - 8, y + 4);
    }

    // Draw Bars
    const barCount = days.length;
    const barWidth = Math.min(36, (chartWidth / barCount) * 0.55);
    const step = chartWidth / barCount;

    // Get dynamic theme color from CSS variables
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() ||
      getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#f36100';

    days.forEach((day, idx) => {
      const x = padLeft + idx * step + (step - barWidth) / 2;
      const barHeight = (day.volume / maxVolume) * chartHeight;
      const y = padTop + chartHeight - barHeight;

      // Gradient based on active theme
      const grad = ctx.createLinearGradient(0, y, 0, padTop + chartHeight);
      grad.addColorStop(0, accentColor);
      grad.addColorStop(1, "rgba(255, 255, 255, 0.04)");

      ctx.fillStyle = day.volume > 0 ? grad : "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      const radius = 4;
      const drawHeight = Math.max(day.volume > 0 ? barHeight : 4, 4);
      const drawY = day.volume > 0 ? y : padTop + chartHeight - 4;

      ctx.roundRect
        ? ctx.roundRect(x, drawY, barWidth, drawHeight, [radius, radius, 0, 0])
        : ctx.rect(x, drawY, barWidth, drawHeight);
      ctx.fill();

      // Day label
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "12px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(day.dayName, x + barWidth / 2, height - 12);
    });
  }

  renderMuscleDistribution() {
    const el = document.getElementById("muscleDistributionBars");
    if (!el) return;

    const logs = window.appState.getLogs();
    const muscleCount = {};
    const exercises = window.appState.getExercises();

    logs.forEach((log) => {
      if (log.exercises) {
        log.exercises.forEach((exItem) => {
          const fullEx = exercises.find((e) => e.id === exItem.exerciseId);
          const muscle = fullEx ? fullEx.muscleGroup : "Full Body";
          muscleCount[muscle] = (muscleCount[muscle] || 0) + (exItem.sets ? exItem.sets.length : 1);
        });
      }
    });

    const categories = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
    const totalSets = Object.values(muscleCount).reduce((a, b) => a + b, 0) || 1;

    el.innerHTML = categories
      .map((cat) => {
        const count = muscleCount[cat] || 0;
        const pct = Math.round((count / totalSets) * 100);
        const color = Helpers.getMuscleColor(cat);

        return `
        <div class="muscle-bar-row">
          <div class="muscle-bar-info">
            <span class="muscle-bar-name">${cat}</span>
            <span class="muscle-bar-value">${count} sets (${pct}%)</span>
          </div>
          <div class="muscle-bar-track">
            <div class="muscle-bar-fill" style="width: ${Math.max(pct, 5)}%; background-color: ${color}"></div>
          </div>
        </div>
      `;
      })
      .join("");
  }
}

window.DashboardComponent = DashboardComponent;
