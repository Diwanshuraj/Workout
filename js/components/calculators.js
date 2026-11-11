/**
 * Fitness Calculators & Interactive Tools Component
 * 1RM Calculator, TDEE & Macro Calculator, Plate Math Visualizer, and Interval/HIIT Timer.
 */

class CalculatorsComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTool = "1rm"; // '1rm' | 'tdee' | 'plates' | 'interval'

    // Interval Timer State
    this.intervalState = {
      prepSec: 5,
      workSec: 30,
      restSec: 15,
      totalRounds: 8,
      currentRound: 1,
      phase: "idle", // 'idle' | 'prep' | 'work' | 'rest' | 'finished'
      secondsLeft: 30,
      timerId: null,
      isRunning: false
    };
  }

  setTool(toolName) {
    this.activeTool = toolName;
    if (this.intervalState.timerId) {
      clearInterval(this.intervalState.timerId);
      this.intervalState.isRunning = false;
    }
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="calculators-wrapper">
        <div class="section-header-row">
          <div>
            <h2 class="page-title">Fitness Tools & Calculators</h2>
            <p class="page-subtitle">Scientific formulas for progressive overload, body composition, and interval training.</p>
          </div>
        </div>

        <!-- Tool Nav Tabs -->
        <div class="calc-tabs-bar">
          <button class="calc-tab-btn ${this.activeTool === "1rm" ? "active" : ""}" onclick="window.calculators.setTool('1rm')">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4"/></svg>
            1-Rep Max (1RM)
          </button>
          <button class="calc-tab-btn ${this.activeTool === "tdee" ? "active" : ""}" onclick="window.calculators.setTool('tdee')">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            TDEE & Macros
          </button>
          <button class="calc-tab-btn ${this.activeTool === "plates" ? "active" : ""}" onclick="window.calculators.setTool('plates')">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
            Barbell Plate Math
          </button>
          <button class="calc-tab-btn ${this.activeTool === "interval" ? "active" : ""}" onclick="window.calculators.setTool('interval')">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            HIIT / Tabata Timer
          </button>
        </div>

        <!-- Tool Content Area -->
        <div class="calc-content-card">
          ${this.renderActiveToolContent()}
        </div>
      </div>
    `;

    if (this.activeTool === "1rm") {
      this.calculate1RM();
    } else if (this.activeTool === "tdee") {
      this.calculateTDEE();
    } else if (this.activeTool === "plates") {
      this.calculatePlates();
    }
  }

  renderActiveToolContent() {
    switch (this.activeTool) {
      case "1rm":
        return this.render1RMView();
      case "tdee":
        return this.renderTDEEView();
      case "plates":
        return this.renderPlatesView();
      case "interval":
        return this.renderIntervalView();
      default:
        return "";
    }
  }

  // ==========================================
  // 1-REP MAX CALCULATOR
  // ==========================================
  render1RMView() {
    const unit = window.appState.getSettings().unit || "kg";
    return `
      <div class="calc-grid-layout">
        <div class="calc-inputs-pane">
          <h3 class="calc-pane-title">1RM Parameters</h3>
          <p class="calc-pane-desc">Estimate your maximum single-repetition lift capacity from any working set.</p>

          <div class="form-group">
            <label>Weight Lifted (${unit})</label>
            <input type="number" id="ormWeight" class="input" value="100" min="1" max="1000" step="2.5" oninput="window.calculators.calculate1RM()" />
          </div>

          <div class="form-group">
            <label>Reps Completed (1-12)</label>
            <input type="number" id="ormReps" class="input" value="5" min="1" max="15" oninput="window.calculators.calculate1RM()" />
          </div>

          <div class="form-group">
            <label>Formula Model</label>
            <select id="ormFormula" class="select" onchange="window.calculators.calculate1RM()">
              <option value="brzycki" selected>Brzycki Formula (Standard)</option>
              <option value="epley">Epley Formula (Heavy Compound)</option>
            </select>
          </div>
        </div>

        <div class="calc-results-pane">
          <div class="orm-hero-card">
            <span class="orm-hero-label">Estimated 1-Rep Max</span>
            <div class="orm-hero-number" id="ormResultValue">112.5 <small>${unit}</small></div>
            <div class="orm-formula-tag" id="ormFormulaName">Based on Brzycki Equation</div>
          </div>

          <h4 class="mt-4 mb-2">Training Percentages & Rep Targets</h4>
          <div class="orm-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Intensity</th>
                  <th>Weight (${unit})</th>
                  <th>Estimated Reps</th>
                </tr>
              </thead>
              <tbody id="ormTableBody">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  calculate1RM() {
    const weightEl = document.getElementById("ormWeight");
    const repsEl = document.getElementById("ormReps");
    const formulaEl = document.getElementById("ormFormula");
    const resultEl = document.getElementById("ormResultValue");
    const tableBody = document.getElementById("ormTableBody");

    if (!weightEl || !repsEl || !resultEl) return;

    const weight = parseFloat(weightEl.value) || 0;
    const reps = parseInt(repsEl.value, 10) || 1;
    const formula = formulaEl ? formulaEl.value : "brzycki";
    const unit = window.appState.getSettings().unit || "kg";

    const oneRm = Helpers.calculate1RM(weight, reps, formula);
    resultEl.innerHTML = `${oneRm} <small>${unit}</small>`;

    if (tableBody) {
      const tableData = Helpers.get1RMTable(oneRm);
      tableBody.innerHTML = tableData
        .map(
          (row) => `
        <tr>
          <td><span class="badge ${row.percentage >= 85 ? "badge-rose" : row.percentage >= 70 ? "badge-primary" : "badge-subtle"}">${row.percentage}%</span></td>
          <td><strong>${row.weight} ${unit}</strong></td>
          <td class="text-muted">${row.reps}</td>
        </tr>
      `
        )
        .join("");
    }
  }

  // ==========================================
  // TDEE & MACRO CALCULATOR
  // ==========================================
  renderTDEEView() {
    const settings = window.appState.getSettings();
    return `
      <div class="calc-grid-layout">
        <div class="calc-inputs-pane">
          <h3 class="calc-pane-title">Metabolic Profile</h3>
          <p class="calc-pane-desc">Calculated via the scientifically validated Mifflin-St Jeor equation.</p>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Gender</label>
              <select id="tdeeGender" class="select" onchange="window.calculators.calculateTDEE()">
                <option value="male" ${settings.gender === "male" ? "selected" : ""}>Male</option>
                <option value="female" ${settings.gender === "female" ? "selected" : ""}>Female</option>
              </select>
            </div>
            <div class="form-group flex-1">
              <label>Age</label>
              <input type="number" id="tdeeAge" class="input" value="${settings.age || 26}" min="14" max="100" oninput="window.calculators.calculateTDEE()" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Weight (kg)</label>
              <input type="number" id="tdeeWeight" class="input" value="${settings.weightKg || 75}" min="30" max="250" step="0.5" oninput="window.calculators.calculateTDEE()" />
            </div>
            <div class="form-group flex-1">
              <label>Height (cm)</label>
              <input type="number" id="tdeeHeight" class="input" value="${settings.heightCm || 178}" min="100" max="230" oninput="window.calculators.calculateTDEE()" />
            </div>
          </div>

          <div class="form-group">
            <label>Weekly Activity Level</label>
            <select id="tdeeActivity" class="select" onchange="window.calculators.calculateTDEE()">
              <option value="sedentary">Sedentary (desk job, minimal exercise)</option>
              <option value="light">Light Activity (1-2 workouts / week)</option>
              <option value="moderate" selected>Moderate Activity (3-5 workouts / week)</option>
              <option value="active">High Activity (6-7 intense sessions / week)</option>
              <option value="very_active">Athlete / 2x Daily Training</option>
            </select>
          </div>

          <div class="form-group">
            <label>Primary Fitness Goal</label>
            <select id="tdeeGoal" class="select" onchange="window.calculators.calculateTDEE()">
              <option value="fat_loss">Fat Loss (-500 kcal deficit)</option>
              <option value="maintain">Maintenance (Maintain current weight)</option>
              <option value="hypertrophy" selected>Lean Muscle Growth (+350 kcal surplus)</option>
            </select>
          </div>
        </div>

        <div class="calc-results-pane">
          <div class="tdee-hero-cards">
            <div class="tdee-metric-box">
              <span class="tdee-metric-title">Basal Metabolic Rate</span>
              <span class="tdee-metric-num" id="tdeeBmrVal">0</span>
              <span class="tdee-metric-sub">kcal / day at rest</span>
            </div>
            <div class="tdee-metric-box tdee-metric-target">
              <span class="tdee-metric-title">Target Daily Intake</span>
              <span class="tdee-metric-num text-primary" id="tdeeTargetVal">0</span>
              <span class="tdee-metric-sub" id="tdeeGoalLabel">kcal / day</span>
            </div>
          </div>

          <h4 class="mt-4 mb-2">Optimal Daily Macronutrients</h4>
          <!-- Macro Split Bar -->
          <div class="macro-bar-container">
            <div id="macroBarProtein" class="macro-bar-seg bg-emerald" style="width: 30%"></div>
            <div id="macroBarFat" class="macro-bar-seg bg-amber" style="width: 25%"></div>
            <div id="macroBarCarbs" class="macro-bar-seg bg-cyan" style="width: 45%"></div>
          </div>

          <div class="macro-cards-grid mt-3">
            <div class="macro-card border-emerald">
              <span class="macro-title">Protein</span>
              <span class="macro-val" id="macroValProtein">0g</span>
              <span class="macro-cal" id="macroCalProtein">0 kcal</span>
            </div>
            <div class="macro-card border-amber">
              <span class="macro-title">Fats</span>
              <span class="macro-val" id="macroValFat">0g</span>
              <span class="macro-cal" id="macroCalFat">0 kcal</span>
            </div>
            <div class="macro-card border-cyan">
              <span class="macro-title">Carbohydrates</span>
              <span class="macro-val" id="macroValCarbs">0g</span>
              <span class="macro-cal" id="macroCalCarbs">0 kcal</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  calculateTDEE() {
    const gender = document.getElementById("tdeeGender")?.value || "male";
    const age = parseInt(document.getElementById("tdeeAge")?.value, 10) || 26;
    const weightKg = parseFloat(document.getElementById("tdeeWeight")?.value) || 75;
    const heightCm = parseFloat(document.getElementById("tdeeHeight")?.value) || 178;
    const activityLevel = document.getElementById("tdeeActivity")?.value || "moderate";
    const goal = document.getElementById("tdeeGoal")?.value || "hypertrophy";

    const res = Helpers.calculateTDEE({ gender, age, weightKg, heightCm, activityLevel, goal });

    const bmrEl = document.getElementById("tdeeBmrVal");
    const targetEl = document.getElementById("tdeeTargetVal");
    const goalLabelEl = document.getElementById("tdeeGoalLabel");

    if (bmrEl) bmrEl.textContent = res.bmr.toLocaleString();
    if (targetEl) targetEl.textContent = res.targetCalories.toLocaleString();
    if (goalLabelEl) {
      goalLabelEl.textContent =
        goal === "fat_loss" ? "Deficit for fat loss" : goal === "hypertrophy" ? "Lean surplus target" : "Maintenance target";
    }

    const pGrams = res.macros.protein;
    const fGrams = res.macros.fat;
    const cGrams = res.macros.carbs;

    const pKcal = pGrams * 4;
    const fKcal = fGrams * 9;
    const cKcal = cGrams * 4;
    const totalKcal = pKcal + fKcal + cKcal || 1;

    document.getElementById("macroValProtein").textContent = `${pGrams}g`;
    document.getElementById("macroCalProtein").textContent = `${pKcal} kcal (${Math.round((pKcal / totalKcal) * 100)}%)`;

    document.getElementById("macroValFat").textContent = `${fGrams}g`;
    document.getElementById("macroCalFat").textContent = `${fKcal} kcal (${Math.round((fKcal / totalKcal) * 100)}%)`;

    document.getElementById("macroValCarbs").textContent = `${cGrams}g`;
    document.getElementById("macroCalCarbs").textContent = `${cKcal} kcal (${Math.round((cKcal / totalKcal) * 100)}%)`;

    document.getElementById("macroBarProtein").style.width = `${(pKcal / totalKcal) * 100}%`;
    document.getElementById("macroBarFat").style.width = `${(fKcal / totalKcal) * 100}%`;
    document.getElementById("macroBarCarbs").style.width = `${(cKcal / totalKcal) * 100}%`;
  }

  // ==========================================
  // BARBELL PLATE MATH CALCULATOR
  // ==========================================
  renderPlatesView() {
    const unit = window.appState.getSettings().unit || "kg";
    return `
      <div class="calc-grid-layout">
        <div class="calc-inputs-pane">
          <h3 class="calc-pane-title">Plate Loading Specs</h3>
          <p class="calc-pane-desc">Quickly find the exact plate combination needed per side of the barbell.</p>

          <div class="form-group">
            <label>Target Lift Weight</label>
            <input type="number" id="plateTarget" class="input" value="${unit === "lbs" ? 225 : 100}" min="20" max="600" step="${unit === "lbs" ? 5 : 2.5}" oninput="window.calculators.calculatePlates()" />
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Barbell Weight</label>
              <select id="plateBar" class="select" onchange="window.calculators.calculatePlates()">
                <option value="20" selected>Standard Olympic Bar (20kg / ~45lb)</option>
                <option value="15">Technique / Women's Bar (15kg / ~35lb)</option>
                <option value="10">Training Bar (10kg)</option>
              </select>
            </div>

            <div class="form-group flex-1">
              <label>Unit System</label>
              <select id="plateUnit" class="select" onchange="window.calculators.calculatePlates()">
                <option value="kg" ${unit === "kg" ? "selected" : ""}>Kilograms (KG)</option>
                <option value="lbs" ${unit === "lbs" ? "selected" : ""}>Pounds (LBS)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="calc-results-pane">
          <div class="plate-results-banner">
            <div>
              <span class="text-muted">Weight Per Side:</span>
              <h3 class="plate-per-side-num" id="plateWeightPerSide">40 kg</h3>
            </div>
            <div id="plateRemainderWarning" class="plate-warning hidden">
              ⚠️ Cannot load exact remainder
            </div>
          </div>

          <h4 class="mt-4 mb-2">Visual Barbell Sleeve (Per Side)</h4>
          <div class="barbell-visualizer" id="barbellVisualizer">
            <!-- Visual plates rendered here -->
          </div>

          <div class="plate-list-breakdown" id="plateListBreakdown">
            <!-- Plate chips -->
          </div>
        </div>
      </div>
    `;
  }

  calculatePlates() {
    const targetEl = document.getElementById("plateTarget");
    const barEl = document.getElementById("plateBar");
    const unitEl = document.getElementById("plateUnit");
    if (!targetEl || !barEl || !unitEl) return;

    const target = parseFloat(targetEl.value) || 0;
    const bar = parseFloat(barEl.value) || 20;
    const unit = unitEl.value;

    const res = Helpers.calculatePlates(target, bar, unit);

    const perSideEl = document.getElementById("plateWeightPerSide");
    const warnEl = document.getElementById("plateRemainderWarning");
    const visualizer = document.getElementById("barbellVisualizer");
    const listEl = document.getElementById("plateListBreakdown");

    if (perSideEl) {
      perSideEl.textContent = `${res.weightPerSide} ${unit}`;
    }

    if (warnEl) {
      if (res.remainder > 0) {
        warnEl.textContent = `⚠️ Leftover: ${res.remainder} ${unit}`;
        warnEl.classList.remove("hidden");
      } else {
        warnEl.classList.add("hidden");
      }
    }

    // Color definitions for Olympic plates
    const plateColors = {
      25: { bg: "#ef4444", text: "#fff", h: 100 }, // Red
      20: { bg: "#3b82f6", text: "#fff", h: 92 }, // Blue
      15: { bg: "#eab308", text: "#000", h: 84 }, // Yellow
      10: { bg: "#10b981", text: "#fff", h: 76 }, // Green
      5: { bg: "#f8fafc", text: "#000", h: 64 }, // White
      2.5: { bg: "#475569", text: "#fff", h: 52 }, // Slate
      1.25: { bg: "#94a3b8", text: "#000", h: 44 },
      // Lbs
      45: { bg: "#3b82f6", text: "#fff", h: 100 },
      35: { bg: "#eab308", text: "#000", h: 88 },
      "25_lb": { bg: "#10b981", text: "#fff", h: 78 }
    };

    if (visualizer) {
      visualizer.innerHTML = `
        <div class="sleeve-bar">
          <div class="bar-collar"></div>
          <div class="plates-stack">
            ${
              res.platesPerSide.length === 0
                ? `<span class="empty-plates-text">Empty Bar</span>`
                : res.platesPerSide
                    .map((p) => {
                      const spec = plateColors[p] || { bg: "#64748b", text: "#fff", h: 60 };
                      return `
                      <div class="visual-plate" style="height: ${spec.h}px; background-color: ${spec.bg}; color: ${spec.text};">
                        <span>${p}</span>
                      </div>
                    `;
                    })
                    .join("")
            }
          </div>
          <div class="bar-sleeve-end"></div>
        </div>
      `;
    }

    if (listEl) {
      if (res.platesPerSide.length === 0) {
        listEl.innerHTML = `<span class="text-muted">No plates needed for this weight.</span>`;
      } else {
        // Group plates count
        const counts = {};
        res.platesPerSide.forEach((p) => {
          counts[p] = (counts[p] || 0) + 1;
        });

        listEl.innerHTML = Object.entries(counts)
          .map(
            ([plate, count]) => `
            <div class="plate-count-badge">
              <strong>${count}&times;</strong> ${plate} ${unit}
            </div>
          `
          )
          .join("");
      }
    }
  }

  // ==========================================
  // HIIT / TABATA INTERVAL TIMER
  // ==========================================
  renderIntervalView() {
    const s = this.intervalState;
    return `
      <div class="interval-timer-container">
        <!-- Digital Display Screen -->
        <div class="timer-display-screen phase-${s.phase}">
          <div class="timer-round-badge">
            ${
              s.phase === "finished"
                ? "COMPLETED!"
                : `ROUND ${s.currentRound} / ${s.totalRounds}`
            }
          </div>
          <div class="timer-phase-badge" id="intervalPhaseBadge">
            ${s.phase.toUpperCase()}
          </div>
          <div class="timer-big-digits" id="intervalBigDigits">
            ${Helpers.formatSeconds(s.secondsLeft)}
          </div>
        </div>

        <!-- Controls -->
        <div class="timer-controls-row">
          ${
            !s.isRunning
              ? `<button class="btn btn-lg btn-primary" onclick="window.calculators.startIntervalTimer()">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Start Interval
                 </button>`
              : `<button class="btn btn-lg btn-warning" onclick="window.calculators.pauseIntervalTimer()">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  Pause
                 </button>`
          }
          <button class="btn btn-lg btn-secondary" onclick="window.calculators.resetIntervalTimer()">
            Reset
          </button>
        </div>

        <!-- Configuration Settings -->
        <div class="interval-settings-card">
          <h4 class="mb-3">Interval Parameters</h4>
          <div class="form-row">
            <div class="form-group flex-1">
              <label>Prep Time (s)</label>
              <input type="number" id="intPrep" class="input" value="${s.prepSec}" min="3" max="60" onchange="window.calculators.updateIntervalConfig()" />
            </div>
            <div class="form-group flex-1">
              <label>Work Interval (s)</label>
              <input type="number" id="intWork" class="input" value="${s.workSec}" min="5" max="300" onchange="window.calculators.updateIntervalConfig()" />
            </div>
            <div class="form-group flex-1">
              <label>Rest Interval (s)</label>
              <input type="number" id="intRest" class="input" value="${s.restSec}" min="5" max="180" onchange="window.calculators.updateIntervalConfig()" />
            </div>
            <div class="form-group flex-1">
              <label>Total Rounds</label>
              <input type="number" id="intRounds" class="input" value="${s.totalRounds}" min="1" max="50" onchange="window.calculators.updateIntervalConfig()" />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  updateIntervalConfig() {
    const prep = parseInt(document.getElementById("intPrep")?.value, 10) || 5;
    const work = parseInt(document.getElementById("intWork")?.value, 10) || 30;
    const rest = parseInt(document.getElementById("intRest")?.value, 10) || 15;
    const rounds = parseInt(document.getElementById("intRounds")?.value, 10) || 8;

    this.intervalState.prepSec = prep;
    this.intervalState.workSec = work;
    this.intervalState.restSec = rest;
    this.intervalState.totalRounds = rounds;

    if (!this.intervalState.isRunning) {
      this.intervalState.secondsLeft = prep;
      this.render();
    }
  }

  startIntervalTimer() {
    if (this.intervalState.timerId) clearInterval(this.intervalState.timerId);

    if (this.intervalState.phase === "idle" || this.intervalState.phase === "finished") {
      this.intervalState.phase = "prep";
      this.intervalState.currentRound = 1;
      this.intervalState.secondsLeft = this.intervalState.prepSec;
    }

    this.intervalState.isRunning = true;
    this.render();

    this.intervalState.timerId = setInterval(() => {
      this.intervalTick();
    }, 1000);
  }

  intervalTick() {
    const s = this.intervalState;
    s.secondsLeft--;

    // Audio cue
    if (s.secondsLeft <= 3 && s.secondsLeft > 0) {
      window.soundFx.playCountdownTick();
    }

    if (s.secondsLeft <= 0) {
      if (s.phase === "prep") {
        s.phase = "work";
        s.secondsLeft = s.workSec;
        window.soundFx.playGoTone();
      } else if (s.phase === "work") {
        if (s.currentRound >= s.totalRounds) {
          s.phase = "finished";
          s.isRunning = false;
          clearInterval(s.timerId);
          window.soundFx.playVictoryFanfare();
        } else {
          s.phase = "rest";
          s.secondsLeft = s.restSec;
          window.soundFx.playSetComplete();
        }
      } else if (s.phase === "rest") {
        s.currentRound++;
        s.phase = "work";
        s.secondsLeft = s.workSec;
        window.soundFx.playGoTone();
      }
    }

    this.render();
  }

  pauseIntervalTimer() {
    if (this.intervalState.timerId) clearInterval(this.intervalState.timerId);
    this.intervalState.isRunning = false;
    this.render();
  }

  resetIntervalTimer() {
    if (this.intervalState.timerId) clearInterval(this.intervalState.timerId);
    this.intervalState.isRunning = false;
    this.intervalState.phase = "idle";
    this.intervalState.currentRound = 1;
    this.intervalState.secondsLeft = this.intervalState.prepSec;
    this.render();
  }
}

window.CalculatorsComponent = CalculatorsComponent;
