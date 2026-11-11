/**
 * Routine Builder & Workout Programs Component
 * Create, edit, clone, and manage customized workout splits and routines dynamically.
 */

class RoutineBuilderComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.editingRoutineId = null;
    this.selectedExerciseIds = [];
    this.bindEvents();
  }

  bindEvents() {
    window.appState.on("routinesChanged", () => this.render());
  }

  render() {
    if (!this.container) return;
    const routines = window.appState.getRoutines();
    const allExercises = window.appState.getExercises();

    this.container.innerHTML = `
      <div class="routines-wrapper">
        <div class="section-header-row">
          <div>
            <h2 class="page-title">Workout Routines & Splits</h2>
            <p class="page-subtitle">Choose a pre-designed training regimen or build your personalized split.</p>
          </div>
          <button class="btn btn-primary" onclick="window.routineBuilder.openBuilderModal()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Build Custom Routine
          </button>
        </div>

        <div class="routines-grid">
          ${routines
            .map((r) => {
              const exercisesInRoutine = (r.exerciseIds || [])
                .map((eid) => allExercises.find((e) => e.id === eid))
                .filter(Boolean);

              return `
              <div class="routine-card ${r.isCustom ? "routine-card-custom" : ""}">
                <div class="routine-card-header">
                  <div class="routine-badges">
                    <span class="badge badge-primary">${Helpers.escapeHtml(r.category || "General")}</span>
                    <span class="badge badge-subtle">${r.durationMinutes || 45} mins</span>
                    ${r.isCustom ? `<span class="badge badge-amber">Custom Plan</span>` : ""}
                  </div>
                  <span class="diff-tag diff-${(r.difficulty || "intermediate").toLowerCase()}">
                    ${r.difficulty || "Intermediate"}
                  </span>
                </div>

                <h3 class="routine-card-title">${Helpers.escapeHtml(r.title)}</h3>
                <p class="routine-card-desc">${Helpers.escapeHtml(r.description || "")}</p>

                <div class="routine-target-muscles">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  <span>${Helpers.escapeHtml(r.targetMuscle || "Full Body")}</span>
                </div>

                <div class="routine-exercises-preview">
                  <div class="preview-label">
                    <span>${exercisesInRoutine.length} Exercises Included</span>
                  </div>
                  <ul class="preview-list">
                    ${exercisesInRoutine
                      .slice(0, 4)
                      .map(
                        (ex) => `
                        <li>
                          <span class="bullet" style="background-color: ${Helpers.getMuscleColor(
                            ex.muscleGroup
                          )}"></span>
                          <span>${Helpers.escapeHtml(ex.name)}</span>
                        </li>
                      `
                      )
                      .join("")}
                    ${
                      exercisesInRoutine.length > 4
                        ? `<li class="more-exercises">+ ${exercisesInRoutine.length - 4} more exercises</li>`
                        : ""
                    }
                  </ul>
                </div>

                <div class="routine-card-footer">
                  <button class="btn btn-primary w-full" onclick="window.app.startRoutineById('${r.id}')">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Start Workout
                  </button>
                  <div class="routine-sub-actions">
                    <button class="btn btn-sm btn-ghost" onclick="window.routineBuilder.cloneRoutine('${r.id}')" title="Duplicate as custom routine">
                      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      Clone
                    </button>
                    ${
                      r.isCustom
                        ? `
                      <button class="btn btn-sm btn-ghost" onclick="window.routineBuilder.openBuilderModal('${r.id}')" title="Edit routine">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                        Edit
                      </button>
                      <button class="btn btn-sm btn-ghost text-danger" onclick="window.routineBuilder.deleteRoutine('${r.id}')" title="Delete custom routine">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    `
                        : ""
                    }
                  </div>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>

      <!-- Routine Builder Modal -->
      <div id="routineBuilderModalBackdrop" class="modal-backdrop hidden" onclick="window.routineBuilder.closeBuilderModal(event)">
        <div class="modal-content modal-lg" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h3 class="modal-title" id="routineModalTitle">Build Custom Routine</h3>
            <button class="modal-close" onclick="window.routineBuilder.closeBuilderModal()">&times;</button>
          </div>

          <form id="routineBuilderForm" onsubmit="window.routineBuilder.handleSaveSubmit(event)">
            <div class="form-row">
              <div class="form-group flex-2">
                <label>Routine Title *</label>
                <input type="text" id="routineTitle" class="input" placeholder="e.g., Upper Body Power Blast" required />
              </div>

              <div class="form-group flex-1">
                <label>Category</label>
                <select id="routineCategory" class="select">
                  <option value="Push">Push</option>
                  <option value="Pull">Pull</option>
                  <option value="Legs">Legs</option>
                  <option value="Upper">Upper Body</option>
                  <option value="Lower">Lower Body</option>
                  <option value="Full Body">Full Body</option>
                  <option value="Core">Core</option>
                  <option value="Cardio">Cardio / HIIT</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Target Muscles</label>
                <input type="text" id="routineMuscles" class="input" placeholder="e.g., Chest, Back, Arms" />
              </div>
              <div class="form-group flex-1">
                <label>Est. Duration (mins)</label>
                <input type="number" id="routineDuration" class="input" value="45" min="10" max="180" />
              </div>
              <div class="form-group flex-1">
                <label>Difficulty</label>
                <select id="routineDifficulty" class="select">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate" selected>Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Description / Goals</label>
              <textarea id="routineDesc" class="input textarea" rows="2" placeholder="Brief summary of program goals and pacing..."></textarea>
            </div>

            <!-- Exercises In Routine Selector -->
            <div class="routine-exercise-manager">
              <div class="manager-header">
                <h4>Exercises in Routine (<span id="routineExCount">0</span>)</h4>
                <div class="add-exercise-selector-row">
                  <select id="routineAddExSelect" class="select select-sm">
                    <option value="">-- Choose exercise to add --</option>
                    ${allExercises
                      .map(
                        (e) => `
                      <option value="${e.id}">${e.name} (${e.muscleGroup} - ${e.equipment})</option>
                    `
                      )
                      .join("")}
                  </select>
                  <button type="button" class="btn btn-sm btn-primary" onclick="window.routineBuilder.addSelectedExercise()">
                    + Add to Routine
                  </button>
                </div>
              </div>

              <div id="routineSelectedList" class="routine-selected-list">
                <!-- Dynamically populated selected exercises with reorder & remove -->
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.routineBuilder.closeBuilderModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Routine</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  openBuilderModal(routineId = null) {
    this.editingRoutineId = routineId;
    const backdrop = document.getElementById("routineBuilderModalBackdrop");
    const titleEl = document.getElementById("routineModalTitle");

    if (routineId) {
      const r = window.appState.getRoutineById(routineId);
      if (r) {
        titleEl.textContent = "Edit Routine: " + r.title;
        document.getElementById("routineTitle").value = r.title || "";
        document.getElementById("routineCategory").value = r.category || "Custom";
        document.getElementById("routineMuscles").value = r.targetMuscle || "";
        document.getElementById("routineDuration").value = r.durationMinutes || 45;
        document.getElementById("routineDifficulty").value = r.difficulty || "Intermediate";
        document.getElementById("routineDesc").value = r.description || "";
        this.selectedExerciseIds = [...(r.exerciseIds || [])];
      }
    } else {
      titleEl.textContent = "Build Custom Routine";
      document.getElementById("routineBuilderForm").reset();
      this.selectedExerciseIds = [];
    }

    this.renderSelectedExerciseList();
    if (backdrop) backdrop.classList.remove("hidden");
  }

  closeBuilderModal(e) {
    const backdrop = document.getElementById("routineBuilderModalBackdrop");
    if (backdrop) backdrop.classList.add("hidden");
    this.editingRoutineId = null;
    this.selectedExerciseIds = [];
  }

  addSelectedExercise() {
    const sel = document.getElementById("routineAddExSelect");
    const exId = sel.value;
    if (!exId) return;

    if (this.selectedExerciseIds.includes(exId)) {
      window.app.showToast("Exercise already in routine", "info");
      return;
    }

    this.selectedExerciseIds.push(exId);
    sel.value = "";
    this.renderSelectedExerciseList();
  }

  removeExerciseFromBuilder(idx) {
    this.selectedExerciseIds.splice(idx, 1);
    this.renderSelectedExerciseList();
  }

  moveExercise(idx, direction) {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= this.selectedExerciseIds.length) return;
    const item = this.selectedExerciseIds.splice(idx, 1)[0];
    this.selectedExerciseIds.splice(targetIdx, 0, item);
    this.renderSelectedExerciseList();
  }

  renderSelectedExerciseList() {
    const container = document.getElementById("routineSelectedList");
    const countEl = document.getElementById("routineExCount");
    if (!container) return;

    if (countEl) countEl.textContent = this.selectedExerciseIds.length;

    if (this.selectedExerciseIds.length === 0) {
      container.innerHTML = `
        <div class="empty-routine-builder">
          <p>No exercises added yet. Select an exercise above and click "+ Add to Routine".</p>
        </div>
      `;
      return;
    }

    const allExercises = window.appState.getExercises();

    container.innerHTML = this.selectedExerciseIds
      .map((exId, idx) => {
        const ex = allExercises.find((e) => e.id === exId);
        if (!ex) return "";

        return `
        <div class="builder-item-row">
          <div class="builder-item-drag-controls">
            <button type="button" class="btn-icon-tiny" onclick="window.routineBuilder.moveExercise(${idx}, -1)" ${idx === 0 ? "disabled" : ""}>
              &uarr;
            </button>
            <button type="button" class="btn-icon-tiny" onclick="window.routineBuilder.moveExercise(${idx}, 1)" ${idx === this.selectedExerciseIds.length - 1 ? "disabled" : ""}>
              &darr;
            </button>
          </div>

          <div class="builder-item-index">${idx + 1}</div>

          <div class="builder-item-details">
            <span class="builder-item-name">${Helpers.escapeHtml(ex.name)}</span>
            <span class="builder-item-meta">${ex.muscleGroup} &bull; ${ex.equipment} &bull; ${ex.defaultSets} sets &times; ${ex.defaultReps} reps</span>
          </div>

          <button type="button" class="btn-icon-danger" onclick="window.routineBuilder.removeExerciseFromBuilder(${idx})" title="Remove exercise">
            &times;
          </button>
        </div>
      `;
      })
      .join("");
  }

  handleSaveSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("routineTitle").value.trim();
    const category = document.getElementById("routineCategory").value;
    const targetMuscle = document.getElementById("routineMuscles").value.trim() || category;
    const durationMinutes = parseInt(document.getElementById("routineDuration").value, 10) || 45;
    const difficulty = document.getElementById("routineDifficulty").value;
    const description = document.getElementById("routineDesc").value.trim();

    if (!title) {
      window.app.showToast("Please provide a routine title", "warning");
      return;
    }

    if (this.selectedExerciseIds.length === 0) {
      window.app.showToast("Please add at least one exercise to the routine", "warning");
      return;
    }

    const routineData = {
      title,
      category,
      targetMuscle,
      durationMinutes,
      difficulty,
      description,
      exerciseIds: this.selectedExerciseIds,
      isCustom: true
    };

    if (this.editingRoutineId) {
      routineData.id = this.editingRoutineId;
    }

    window.appState.saveRoutine(routineData);
    this.closeBuilderModal();
    window.app.showToast(`Routine "${title}" saved!`, "success");
  }

  cloneRoutine(routineId) {
    const r = window.appState.getRoutineById(routineId);
    if (!r) return;

    const cloned = {
      ...r,
      id: "routine_custom_" + Date.now(),
      title: r.title + " (My Custom Split)",
      isCustom: true
    };

    window.appState.saveRoutine(cloned);
    window.app.showToast(`Cloned "${r.title}" into custom routines!`, "success");
  }

  deleteRoutine(routineId) {
    if (confirm("Delete this custom routine?")) {
      window.appState.deleteRoutine(routineId);
      window.app.showToast("Routine deleted", "info");
    }
  }
}

window.RoutineBuilderComponent = RoutineBuilderComponent;
