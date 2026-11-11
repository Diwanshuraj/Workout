/**
 * Central State Management & LocalStorage Persistence
 * Everything is dynamic: updates immediately sync to storage and notify listeners.
 */

const STORAGE_KEYS = {
  EXERCISES: "pulse_fit_exercises_v1",
  ROUTINES: "pulse_fit_routines_v1",
  LOGS: "pulse_fit_workout_logs_v1",
  ACTIVE_SESSION: "pulse_fit_active_session_v1",
  USER_SETTINGS: "pulse_fit_user_settings_v1",
  CUSTOM_EXERCISES: "pulse_fit_custom_exercises_v1"
};

class StateManager {
  constructor() {
    this.listeners = new Map();
    this.init();
  }

  init() {
    // 1. Load user settings
    this.settings = this.load(STORAGE_KEYS.USER_SETTINGS, {
      unit: "kg", // or 'lbs'
      sound: true,
      darkMode: true,
      userName: "Athlete",
      weightKg: 75,
      heightCm: 178,
      age: 26,
      gender: "male",
      activityLevel: "moderate",
      goal: "hypertrophy"
    });

    // 2. Load custom exercises and combine with default database
    this.customExercises = this.load(STORAGE_KEYS.CUSTOM_EXERCISES, []);
    this.exercises = [...DEFAULT_EXERCISES, ...this.customExercises];

    // 3. Load routines
    const savedRoutines = this.load(STORAGE_KEYS.ROUTINES, null);
    if (!savedRoutines || savedRoutines.length === 0) {
      this.routines = [...DEFAULT_ROUTINES];
      this.save(STORAGE_KEYS.ROUTINES, this.routines);
    } else {
      this.routines = savedRoutines;
    }

    // 4. Load workout logs
    const savedLogs = this.load(STORAGE_KEYS.LOGS, null);
    if (!savedLogs) {
      // Seed a few realistic recent workouts so the user sees live interactive charts & stats right away!
      const seeded = this.generateSampleLogs();
      this.logs = seeded;
      this.save(STORAGE_KEYS.LOGS, this.logs);
    } else {
      this.logs = savedLogs;
    }

    // 5. Active session state
    this.activeSession = this.load(STORAGE_KEYS.ACTIVE_SESSION, null);
  }

  generateSampleLogs() {
    const now = new Date();
    const d1 = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();
    const d2 = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const d3 = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString();

    return [
      {
        id: "log_" + Date.now() + "_1",
        routineId: "routine_push_hypertrophy",
        title: "Push Day Hypertrophy",
        date: d1,
        durationSeconds: 2700, // 45 min
        caloriesBurned: 340,
        totalVolume: 5120, // kg
        exercises: [
          {
            exerciseId: "ex_bench_press",
            name: "Barbell Bench Press",
            sets: [
              { setNum: 1, reps: 10, weight: 60, completed: true },
              { setNum: 2, reps: 8, weight: 70, completed: true },
              { setNum: 3, reps: 6, weight: 80, completed: true }
            ]
          },
          {
            exerciseId: "ex_incline_db_press",
            name: "Incline Dumbbell Press",
            sets: [
              { setNum: 1, reps: 10, weight: 24, completed: true },
              { setNum: 2, reps: 10, weight: 24, completed: true },
              { setNum: 3, reps: 9, weight: 26, completed: true }
            ]
          },
          {
            exerciseId: "ex_lateral_raise",
            name: "Dumbbell Lateral Raise",
            sets: [
              { setNum: 1, reps: 15, weight: 10, completed: true },
              { setNum: 2, reps: 14, weight: 10, completed: true },
              { setNum: 3, reps: 12, weight: 10, completed: true }
            ]
          }
        ]
      },
      {
        id: "log_" + Date.now() + "_2",
        routineId: "routine_pull_strength",
        title: "Pull Day Strength & Width",
        date: d2,
        durationSeconds: 3120, // 52 min
        caloriesBurned: 390,
        totalVolume: 6480,
        exercises: [
          {
            exerciseId: "ex_barbell_deadlift",
            name: "Conventional Barbell Deadlift",
            sets: [
              { setNum: 1, reps: 8, weight: 100, completed: true },
              { setNum: 2, reps: 5, weight: 120, completed: true },
              { setNum: 3, reps: 5, weight: 130, completed: true }
            ]
          },
          {
            exerciseId: "ex_pullups",
            name: "Pull-Ups",
            sets: [
              { setNum: 1, reps: 10, weight: 0, completed: true },
              { setNum: 2, reps: 8, weight: 0, completed: true },
              { setNum: 3, reps: 8, weight: 0, completed: true }
            ]
          }
        ]
      },
      {
        id: "log_" + Date.now() + "_3",
        routineId: "routine_leg_day",
        title: "Leg Day Foundation",
        date: d3,
        durationSeconds: 3300, // 55 min
        caloriesBurned: 420,
        totalVolume: 7200,
        exercises: [
          {
            exerciseId: "ex_barbell_squat",
            name: "Barbell Back Squat",
            sets: [
              { setNum: 1, reps: 10, weight: 80, completed: true },
              { setNum: 2, reps: 8, weight: 95, completed: true },
              { setNum: 3, reps: 6, weight: 105, completed: true }
            ]
          }
        ]
      }
    ];
  }

  // --- CRUD: EXERCISES ---
  getExercises() {
    return this.exercises;
  }

  getExerciseById(id) {
    return this.exercises.find((e) => e.id === id);
  }

  addCustomExercise(exerciseData) {
    const newEx = {
      ...exerciseData,
      id: "cust_ex_" + Date.now(),
      isCustom: true
    };
    this.customExercises.push(newEx);
    this.save(STORAGE_KEYS.CUSTOM_EXERCISES, this.customExercises);
    this.exercises.push(newEx);
    this.emit("exercisesChanged", this.exercises);
    return newEx;
  }

  deleteCustomExercise(id) {
    this.customExercises = this.customExercises.filter((e) => e.id !== id);
    this.save(STORAGE_KEYS.CUSTOM_EXERCISES, this.customExercises);
    this.exercises = [...DEFAULT_EXERCISES, ...this.customExercises];
    this.emit("exercisesChanged", this.exercises);
  }

  // --- CRUD: ROUTINES ---
  getRoutines() {
    return this.routines;
  }

  getRoutineById(id) {
    return this.routines.find((r) => r.id === id);
  }

  saveRoutine(routineData) {
    if (routineData.id) {
      const idx = this.routines.findIndex((r) => r.id === routineData.id);
      if (idx !== -1) {
        this.routines[idx] = { ...this.routines[idx], ...routineData };
      } else {
        this.routines.push(routineData);
      }
    } else {
      const newRoutine = {
        ...routineData,
        id: "routine_custom_" + Date.now(),
        isCustom: true
      };
      this.routines.push(newRoutine);
    }
    this.save(STORAGE_KEYS.ROUTINES, this.routines);
    this.emit("routinesChanged", this.routines);
  }

  deleteRoutine(id) {
    this.routines = this.routines.filter((r) => r.id !== id);
    this.save(STORAGE_KEYS.ROUTINES, this.routines);
    this.emit("routinesChanged", this.routines);
  }

  // --- WORKOUT LOGS ---
  getLogs() {
    return this.logs;
  }

  addLog(logEntry) {
    this.logs.unshift(logEntry);
    this.save(STORAGE_KEYS.LOGS, this.logs);
    this.emit("logsChanged", this.logs);
  }

  deleteLog(id) {
    this.logs = this.logs.filter((l) => l.id !== id);
    this.save(STORAGE_KEYS.LOGS, this.logs);
    this.emit("logsChanged", this.logs);
  }

  clearLogs() {
    this.logs = [];
    this.save(STORAGE_KEYS.LOGS, this.logs);
    this.emit("logsChanged", this.logs);
  }

  // --- ACTIVE WORKOUT SESSION ---
  getActiveSession() {
    return this.activeSession;
  }

  setActiveSession(session) {
    this.activeSession = session;
    this.save(STORAGE_KEYS.ACTIVE_SESSION, session);
    this.emit("sessionChanged", session);
  }

  clearActiveSession() {
    this.activeSession = null;
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    this.emit("sessionChanged", null);
  }

  // --- USER SETTINGS ---
  getSettings() {
    return this.settings;
  }

  updateSettings(partial) {
    this.settings = { ...this.settings, ...partial };
    this.save(STORAGE_KEYS.USER_SETTINGS, this.settings);
    this.emit("settingsChanged", this.settings);
  }

  // --- IMPORT / EXPORT DATA ---
  exportAllData() {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      settings: this.settings,
      customExercises: this.customExercises,
      routines: this.routines,
      logs: this.logs
    };
    return JSON.stringify(data, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) this.updateSettings(data.settings);
      if (data.customExercises) {
        this.customExercises = data.customExercises;
        this.save(STORAGE_KEYS.CUSTOM_EXERCISES, this.customExercises);
        this.exercises = [...DEFAULT_EXERCISES, ...this.customExercises];
      }
      if (data.routines) {
        this.routines = data.routines;
        this.save(STORAGE_KEYS.ROUTINES, this.routines);
      }
      if (data.logs) {
        this.logs = data.logs;
        this.save(STORAGE_KEYS.LOGS, this.logs);
      }
      this.emit("dataReloaded", null);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // --- PUB/SUB ---
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, payload) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => {
        try {
          cb(payload);
        } catch (e) {
          console.error(`Error in listener for ${event}:`, e);
        }
      });
    }
  }

  // --- HELPER STORAGE ---
  load(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      console.warn("Storage load error:", e);
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }
}

// Global singleton instance
window.appState = new StateManager();
