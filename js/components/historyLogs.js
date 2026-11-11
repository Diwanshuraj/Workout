/**
 * Workout History & Analytics Log Component
 * Detailed workout archive, set-by-set breakdown, JSON export/import data management.
 */

class HistoryLogsComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.searchQuery = "";
    this.expandedLogIds = new Set();
    this.bindEvents();
  }

  bindEvents() {
    window.appState.on("logsChanged", () => this.render());
  }

  toggleExpand(logId) {
    if (this.expandedLogIds.has(logId)) {
      this.expandedLogIds.delete(logId);
    } else {
      this.expandedLogIds.add(logId);
    }
    this.render();
  }

  onSearch(query) {
    this.searchQuery = query;
    this.render();
  }

  getFilteredLogs() {
    const logs = window.appState.getLogs();
    if (!this.searchQuery) return logs;
    const q = this.searchQuery.toLowerCase();
    return logs.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.exercises && l.exercises.some((e) => e.name.toLowerCase().includes(q)))
    );
  }

  render() {
    if (!this.container) return;
    const logs = this.getFilteredLogs();
    const settings = window.appState.getSettings();
    const unit = settings.unit || "kg";

    this.container.innerHTML = `
      <div class="history-wrapper">
        <div class="section-header-row">
          <div>
            <h2 class="page-title">Workout History & Logs</h2>
            <p class="page-subtitle">Track your progressive overload and inspect set-by-set performance over time.</p>
          </div>
          <div class="history-action-buttons">
            <button class="btn btn-secondary" onclick="window.historyLogs.exportData()">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export JSON
            </button>
            <button class="btn btn-secondary" onclick="document.getElementById('importFileInput').click()">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Import Data
            </button>
            <input type="file" id="importFileInput" class="hidden" accept=".json" onchange="window.historyLogs.handleImportFile(event)" />
          </div>
        </div>

        <!-- Filter bar -->
        <div class="filter-panel">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              class="input search-input" 
              placeholder="Search past logs or exercises..." 
              value="${Helpers.escapeHtml(this.searchQuery)}"
              oninput="window.historyLogs.onSearch(this.value)"
            />
          </div>
        </div>

        <!-- Logs list -->
        ${
          logs.length === 0
            ? `<div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <h3>No Workout Logs Found</h3>
                <p>Complete a workout session to see your training records and overload metrics here.</p>
                <button class="btn btn-primary mt-3" onclick="window.app.startQuickWorkout()">Start a Workout Now</button>
              </div>`
            : `<div class="logs-list">
                ${logs
                  .map((log) => {
                    const isExpanded = this.expandedLogIds.has(log.id);
                    const exerciseCount = log.exercises ? log.exercises.length : 0;

                    return `
                    <div class="card log-card ${isExpanded ? "log-card-expanded" : ""}">
                      <div class="log-card-header" onclick="window.historyLogs.toggleExpand('${log.id}')">
                        <div class="log-header-left">
                          <span class="log-date-badge">${Helpers.formatDate(log.date)}</span>
                          <h3 class="log-title">${Helpers.escapeHtml(log.title)}</h3>
                          <div class="log-pills">
                            <span class="pill-stat">⏱ ${Helpers.formatSeconds(log.durationSeconds)}</span>
                            <span class="pill-stat">🔥 ${log.caloriesBurned} kcal</span>
                            <span class="pill-stat">🏋️ ${(log.totalVolume || 0).toLocaleString()} ${unit}</span>
                            <span class="pill-stat">📋 ${exerciseCount} exercises</span>
                          </div>
                        </div>

                        <div class="log-header-right">
                          <button class="btn btn-xs btn-ghost" onclick="event.stopPropagation(); window.historyLogs.rerunWorkout('${log.id}')" title="Re-run this workout">
                            Repeat Workout
                          </button>
                          <button class="btn-icon-danger" onclick="event.stopPropagation(); window.historyLogs.deleteLog('${log.id}')" title="Delete log">
                            &times;
                          </button>
                          <span class="expand-chevron ${isExpanded ? "rotated" : ""}">&#9660;</span>
                        </div>
                      </div>

                      ${
                        isExpanded
                          ? `
                        <div class="log-card-expanded-body">
                          <div class="log-exercises-breakdown">
                            ${(log.exercises || [])
                              .map(
                                (ex) => `
                              <div class="log-exercise-item">
                                <div class="log-ex-name">
                                  <strong>${Helpers.escapeHtml(ex.name)}</strong>
                                  <span class="text-muted">(${ex.muscleGroup || "Compound"})</span>
                                </div>
                                <div class="log-sets-chips">
                                  ${(ex.sets || [])
                                    .map(
                                      (s) => `
                                    <span class="log-set-chip ${s.completed ? "completed" : "skipped"}">
                                      Set ${s.setNum}: ${s.weight} ${unit} &times; ${s.reps} reps
                                    </span>
                                  `
                                    )
                                    .join("")}
                                </div>
                              </div>
                            `
                              )
                              .join("")}
                          </div>
                        </div>
                      `
                          : ""
                      }
                    </div>
                  `;
                  })
                  .join("")}
              </div>`
        }
      </div>
    `;
  }

  exportData() {
    const dataStr = window.appState.exportAllData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `workout_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.app.showToast("Workout data exported successfully!", "success");
  }

  handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const res = window.appState.importData(e.target.result);
      if (res.success) {
        window.app.showToast("Data imported successfully!", "success");
        this.render();
      } else {
        window.app.showToast("Import failed: " + res.error, "error");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  deleteLog(id) {
    if (confirm("Delete this workout log?")) {
      window.appState.deleteLog(id);
      window.app.showToast("Log entry deleted", "info");
    }
  }

  rerunWorkout(logId) {
    const log = window.appState.getLogs().find((l) => l.id === logId);
    if (!log) return;

    const session = {
      id: "session_" + Date.now(),
      routineId: log.routineId,
      title: log.title + " (Repeat)",
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      paused: false,
      exercises: (log.exercises || []).map((ex) => ({
        exerciseId: ex.exerciseId,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        equipment: ex.equipment,
        restSeconds: 60,
        sets: (ex.sets || []).map((s, idx) => ({
          setNum: idx + 1,
          weight: s.weight || 0,
          reps: s.reps || 10,
          completed: false
        }))
      }))
    };

    window.appState.setActiveSession(session);
    window.app.switchTab("workout-session");
    window.app.showToast("Workout loaded from history!", "success");
  }
}

window.HistoryLogsComponent = HistoryLogsComponent;
