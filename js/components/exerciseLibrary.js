/**
 * Exercise Library Component
 * Dynamic search, multi-filter by muscle/equipment/difficulty, custom exercise creation & details modal.
 */

class ExerciseLibraryComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.searchQuery = "";
    this.selectedMuscle = "All";
    this.selectedEquipment = "All";
    this.selectedDifficulty = "All";

    this.bindEvents();
  }

  bindEvents() {
    window.appState.on("exercisesChanged", () => this.render());
  }

  getFilteredExercises() {
    const all = window.appState.getExercises();
    return all.filter((ex) => {
      const matchesSearch =
        !this.searchQuery ||
        ex.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        ex.muscleGroup.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (ex.secondaryMuscles &&
          ex.secondaryMuscles.some((m) =>
            m.toLowerCase().includes(this.searchQuery.toLowerCase())
          ));

      const matchesMuscle =
        this.selectedMuscle === "All" || ex.muscleGroup === this.selectedMuscle;

      const matchesEquipment =
        this.selectedEquipment === "All" ||
        ex.equipment === this.selectedEquipment;

      const matchesDiff =
        this.selectedDifficulty === "All" ||
        ex.difficulty === this.selectedDifficulty;

      return (
        matchesSearch && matchesMuscle && matchesEquipment && matchesDiff
      );
    });
  }

  render() {
    if (!this.container) return;
    const filtered = this.getFilteredExercises();

    this.container.innerHTML = `
      <div class="library-wrapper">
        <!-- Library Top Header -->
        <div class="section-header-row">
          <div>
            <h2 class="page-title">Exercise Database</h2>
            <p class="page-subtitle">Explore 50+ movements with form guides, or create your own custom exercise.</p>
          </div>
          <button class="btn btn-primary" onclick="window.exerciseLibrary.openCreateModal()">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Create Custom Exercise
          </button>
        </div>

        <!-- Filter Controls -->
        <div class="filter-panel">
          <!-- Search Bar -->
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              class="input search-input" 
              placeholder="Search exercise, muscle, or equipment..." 
              value="${Helpers.escapeHtml(this.searchQuery)}"
              oninput="window.exerciseLibrary.onSearch(this.value)"
            />
            ${
              this.searchQuery
                ? `<button class="search-clear-btn" onclick="window.exerciseLibrary.clearSearch()">&times;</button>`
                : ""
            }
          </div>

          <!-- Muscle Pills -->
          <div class="filter-pills-scroll">
            ${MUSCLE_GROUPS.map(
              (m) => `
              <button 
                class="filter-pill ${this.selectedMuscle === m ? "active" : ""}" 
                onclick="window.exerciseLibrary.setMuscle('${m}')">
                ${m}
              </button>
            `
            ).join("")}
          </div>

          <!-- Secondary Filters Row -->
          <div class="secondary-filters-row">
            <div class="filter-select-group">
              <label>Equipment</label>
              <select class="select" onchange="window.exerciseLibrary.setEquipment(this.value)">
                ${EQUIPMENT_TYPES.map(
                  (eq) => `
                  <option value="${eq}" ${this.selectedEquipment === eq ? "selected" : ""}>${eq}</option>
                `
                ).join("")}
              </select>
            </div>

            <div class="filter-select-group">
              <label>Difficulty</label>
              <select class="select" onchange="window.exerciseLibrary.setDifficulty(this.value)">
                ${DIFFICULTY_LEVELS.map(
                  (d) => `
                  <option value="${d}" ${this.selectedDifficulty === d ? "selected" : ""}>${d}</option>
                `
                ).join("")}
              </select>
            </div>

            <div class="filter-results-count">
              Showing <strong>${filtered.length}</strong> exercises
            </div>
          </div>
        </div>

        <!-- Exercise Cards Grid -->
        ${
          filtered.length === 0
            ? `<div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <h3>No exercises match your filter</h3>
                <p>Try searching with another keyword or resetting the filter options.</p>
                <button class="btn btn-secondary mt-3" onclick="window.exerciseLibrary.resetFilters()">Reset All Filters</button>
              </div>`
            : `<div class="exercise-grid">
                ${filtered
                  .map(
                    (ex) => `
                  <div class="exercise-card">
                    <div class="exercise-card-media" onclick="window.exerciseLibrary.openDetailModal('${ex.id}')">
                      ${ex.gifUrl ? `
                        <img src="${ex.gifUrl}" alt="${Helpers.escapeHtml(ex.name)}" loading="lazy" class="exercise-card-video" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                        <div class="exercise-media-fallback hidden">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      ` : `
                        <div class="exercise-media-fallback">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      `}
                      <div class="media-overlay-badge">
                        <span class="pulse-dot"></span>
                        <span>ANIMATED VIDEO</span>
                      </div>
                      <span class="diff-tag diff-${ex.difficulty.toLowerCase()}">${ex.difficulty}</span>
                    </div>

                    <div class="exercise-card-body">
                      <div class="exercise-card-header">
                        <div class="exercise-badges">
                          <span class="badge" style="background-color: ${Helpers.getMuscleColor(
                            ex.muscleGroup
                          )}20; color: ${Helpers.getMuscleColor(ex.muscleGroup)}; border: 1px solid ${Helpers.getMuscleColor(
                            ex.muscleGroup
                          )}40;">
                            ${Helpers.escapeHtml(ex.muscleGroup)}
                          </span>
                          <span class="badge badge-subtle">${Helpers.escapeHtml(ex.equipment)}</span>
                          ${ex.isCustom ? `<span class="badge badge-amber">Custom</span>` : ""}
                        </div>
                      </div>

                      <h3 class="exercise-card-title" onclick="window.exerciseLibrary.openDetailModal('${ex.id}')" style="cursor: pointer;">${Helpers.escapeHtml(ex.name)}</h3>
                      
                      <div class="exercise-card-meta">
                        <div class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                          <span>${ex.defaultSets} sets &times; ${ex.defaultReps} reps</span>
                        </div>
                        <div class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          <span>${ex.restSeconds}s rest</span>
                        </div>
                        <div class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                          <span>~${ex.caloriesPerMin} cal/min</span>
                        </div>
                      </div>

                      <div class="exercise-card-actions">
                        <button class="btn btn-secondary btn-sm flex-1" onclick="window.exerciseLibrary.openDetailModal('${ex.id}')">
                          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Form & Video
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="window.app.addExerciseToWorkout('${ex.id}')" title="Add to current workout">
                          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>`
        }
      </div>

      <!-- Detail Modal Mount Point -->
      <div id="exerciseModalBackdrop" class="modal-backdrop hidden" onclick="window.exerciseLibrary.closeDetailModal(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div id="exerciseModalBody"></div>
        </div>
      </div>

      <!-- Create Custom Exercise Modal -->
      <div id="createExerciseModalBackdrop" class="modal-backdrop hidden" onclick="window.exerciseLibrary.closeCreateModal(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h3 class="modal-title">Create Custom Exercise</h3>
            <button class="modal-close" onclick="window.exerciseLibrary.closeCreateModal()">&times;</button>
          </div>
          <form id="createExerciseForm" onsubmit="window.exerciseLibrary.handleCreateSubmit(event)">
            <div class="form-group">
              <label>Exercise Name *</label>
              <input type="text" id="custName" class="input" placeholder="e.g., Incline Cable Fly" required />
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Target Muscle *</label>
                <select id="custMuscle" class="select" required>
                  ${MUSCLE_GROUPS.filter((m) => m !== "All").map((m) => `<option value="${m}">${m}</option>`).join("")}
                </select>
              </div>

              <div class="form-group flex-1">
                <label>Equipment *</label>
                <select id="custEquip" class="select" required>
                  ${EQUIPMENT_TYPES.filter((e) => e !== "All").map((e) => `<option value="${e}">${e}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Difficulty</label>
                <select id="custDiff" class="select">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate" selected>Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div class="form-group flex-1">
                <label>Est. Cal / Min</label>
                <input type="number" id="custCal" class="input" value="6.5" step="0.5" min="1" max="25" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group flex-1">
                <label>Default Sets</label>
                <input type="number" id="custSets" class="input" value="3" min="1" max="10" />
              </div>
              <div class="form-group flex-1">
                <label>Default Reps</label>
                <input type="number" id="custReps" class="input" value="10" min="1" max="100" />
              </div>
              <div class="form-group flex-1">
                <label>Rest (sec)</label>
                <input type="number" id="custRest" class="input" value="60" min="10" max="300" step="5" />
              </div>
            </div>

            <div class="form-group">
              <label>Step-by-Step Instructions (one per line)</label>
              <textarea id="custInstructions" class="input textarea" rows="3" placeholder="Step 1: Set up position...&#10;Step 2: Lower the weight slowly...&#10;Step 3: Press firmly back to start..."></textarea>
            </div>

            <div class="form-group">
              <label>Form Tips / Safety Cues</label>
              <input type="text" id="custTips" class="input" placeholder="e.g., Keep chest proud and do not flare elbows" />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onclick="window.exerciseLibrary.closeCreateModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Exercise</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  onSearch(query) {
    this.searchQuery = query;
    this.render();
  }

  clearSearch() {
    this.searchQuery = "";
    this.render();
  }

  setMuscle(m) {
    this.selectedMuscle = m;
    this.render();
  }

  setEquipment(eq) {
    this.selectedEquipment = eq;
    this.render();
  }

  setDifficulty(d) {
    this.selectedDifficulty = d;
    this.render();
  }

  resetFilters() {
    this.searchQuery = "";
    this.selectedMuscle = "All";
    this.selectedEquipment = "All";
    this.selectedDifficulty = "All";
    this.render();
  }

  openDetailModal(id) {
    const ex = window.appState.getExerciseById(id);
    if (!ex) return;

    const modalBody = document.getElementById("exerciseModalBody");
    const backdrop = document.getElementById("exerciseModalBackdrop");

    modalBody.innerHTML = `
      <div class="modal-header">
        <div>
          <div class="exercise-badges mb-2">
            <span class="badge" style="background-color: ${Helpers.getMuscleColor(
              ex.muscleGroup
            )}20; color: ${Helpers.getMuscleColor(ex.muscleGroup)}; border: 1px solid ${Helpers.getMuscleColor(
      ex.muscleGroup
    )}40;">
              ${Helpers.escapeHtml(ex.muscleGroup)}
            </span>
            <span class="badge badge-subtle">${Helpers.escapeHtml(ex.equipment)}</span>
            <span class="badge badge-subtle">${ex.difficulty}</span>
          </div>
          <h2 class="modal-title">${Helpers.escapeHtml(ex.name)}</h2>
        </div>
        <button class="modal-close" onclick="window.exerciseLibrary.closeDetailModal()">&times;</button>
      </div>

      <!-- Animated Workout Demonstration Video Player -->
      <div class="modal-video-container">
        ${ex.gifUrl ? `
          <img src="${ex.gifUrl}" alt="${Helpers.escapeHtml(ex.name)}" class="modal-exercise-video" loading="lazy" />
          <div class="modal-video-banner">
            <div class="video-indicator">
              <span class="pulse-dot"></span>
              <span>LIVE ANIMATED FORM & TECHNIQUE GUIDE</span>
            </div>
            <span class="video-target-tag">${Helpers.escapeHtml(ex.equipment)} &bull; ${Helpers.escapeHtml(ex.muscleGroup)}</span>
          </div>
        ` : `
          <div class="modal-video-placeholder">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Animated Workout Demo Loading...</span>
          </div>
        `}
      </div>

      <div class="modal-detail-content">
        <!-- Anatomy & Target Muscles -->
        <div class="detail-section">
          <h4 class="detail-heading">Muscles Engaged</h4>
          <div class="muscle-tags-wrap">
            <span class="muscle-tag primary">Primary: ${Helpers.escapeHtml(ex.muscleGroup)}</span>
            ${
              ex.secondaryMuscles && ex.secondaryMuscles.length > 0
                ? ex.secondaryMuscles
                    .map((m) => `<span class="muscle-tag secondary">Secondary: ${Helpers.escapeHtml(m)}</span>`)
                    .join("")
                : ""
            }
          </div>
        </div>

        <!-- Metrics Overview -->
        <div class="detail-metrics-row">
          <div class="detail-metric-card">
            <span class="detail-metric-label">Suggested Sets</span>
            <span class="detail-metric-val">${ex.defaultSets}</span>
          </div>
          <div class="detail-metric-card">
            <span class="detail-metric-label">Target Reps</span>
            <span class="detail-metric-val">${ex.defaultReps}</span>
          </div>
          <div class="detail-metric-card">
            <span class="detail-metric-label">Rest Between Sets</span>
            <span class="detail-metric-val">${ex.restSeconds}s</span>
          </div>
          <div class="detail-metric-card">
            <span class="detail-metric-label">Caloric Burn</span>
            <span class="detail-metric-val">~${ex.caloriesPerMin} /min</span>
          </div>
        </div>

        <!-- Instructions List -->
        <div class="detail-section">
          <h4 class="detail-heading">Step-by-Step Technique</h4>
          <ol class="instructions-stepper">
            ${
              ex.instructions && ex.instructions.length > 0
                ? ex.instructions
                    .map(
                      (step) => `<li>${Helpers.escapeHtml(step)}</li>`
                    )
                    .join("")
                : "<li>Execute with steady control and strict form.</li>"
            }
          </ol>
        </div>

        <!-- Form Tips -->
        ${
          ex.tips
            ? `
          <div class="detail-tips-box">
            <svg class="tip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            <div>
              <strong>Coach's Tip:</strong>
              <p>${Helpers.escapeHtml(ex.tips)}</p>
            </div>
          </div>
        `
            : ""
        }

        <div class="modal-footer mt-4">
          ${
            ex.isCustom
              ? `<button class="btn btn-danger mr-auto" onclick="window.exerciseLibrary.deleteCustom('${ex.id}')">Delete Exercise</button>`
              : ""
          }
          <button class="btn btn-secondary" onclick="window.exerciseLibrary.closeDetailModal()">Close</button>
          <button class="btn btn-primary" onclick="window.app.addExerciseToWorkout('${ex.id}'); window.exerciseLibrary.closeDetailModal();">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add to Active Workout
          </button>
        </div>
      </div>
    `;

    backdrop.classList.remove("hidden");
  }

  closeDetailModal(e) {
    const backdrop = document.getElementById("exerciseModalBackdrop");
    if (backdrop) backdrop.classList.add("hidden");
  }

  openCreateModal() {
    const backdrop = document.getElementById("createExerciseModalBackdrop");
    if (backdrop) backdrop.classList.remove("hidden");
  }

  closeCreateModal() {
    const backdrop = document.getElementById("createExerciseModalBackdrop");
    if (backdrop) backdrop.classList.add("hidden");
  }

  handleCreateSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("custName").value.trim();
    const muscleGroup = document.getElementById("custMuscle").value;
    const equipment = document.getElementById("custEquip").value;
    const difficulty = document.getElementById("custDiff").value;
    const caloriesPerMin = parseFloat(document.getElementById("custCal").value) || 6.0;
    const defaultSets = parseInt(document.getElementById("custSets").value, 10) || 3;
    const defaultReps = parseInt(document.getElementById("custReps").value, 10) || 10;
    const restSeconds = parseInt(document.getElementById("custRest").value, 10) || 60;

    const instructionsRaw = document.getElementById("custInstructions").value.trim();
    const instructions = instructionsRaw
      ? instructionsRaw.split("\n").map((s) => s.trim()).filter(Boolean)
      : ["Perform movement with smooth cadence and strict control."];

    const tips = document.getElementById("custTips").value.trim();

    if (!name) {
      window.app.showToast("Please enter an exercise name", "warning");
      return;
    }

    window.appState.addCustomExercise({
      name,
      muscleGroup,
      secondaryMuscles: [],
      equipment,
      difficulty,
      category: "Custom",
      caloriesPerMin,
      defaultSets,
      defaultReps,
      restSeconds,
      instructions,
      tips
    });

    this.closeCreateModal();
    window.app.showToast(`Custom exercise "${name}" added!`, "success");
    document.getElementById("createExerciseForm").reset();
  }

  deleteCustom(id) {
    if (confirm("Are you sure you want to delete this custom exercise?")) {
      window.appState.deleteCustomExercise(id);
      this.closeDetailModal();
      window.app.showToast("Custom exercise deleted", "info");
    }
  }
}

window.ExerciseLibraryComponent = ExerciseLibraryComponent;
