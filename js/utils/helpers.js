/**
 * Helper Utility Functions
 * Dynamic calculations, formatting, and data helpers
 */

const Helpers = {
  // Format seconds into MM:SS or HH:MM:SS
  formatSeconds(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    const pad = (n) => String(n).padStart(2, "0");

    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  },

  // Format date nicely
  formatDate(dateString) {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateString;
    }
  },

  formatTimeOfDay(dateString) {
    try {
      const d = new Date(dateString);
      return d.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit"
      });
    } catch {
      return "";
    }
  },

  // Escape HTML to prevent XSS
  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  // Generate unique ID
  generateId(prefix = "id") {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  },

  // Weight conversions
  kgToLbs(kg) {
    return Math.round(kg * 2.20462 * 10) / 10;
  },

  lbsToKg(lbs) {
    return Math.round((lbs / 2.20462) * 10) / 10;
  },

  formatWeight(val, unit = "kg") {
    const num = parseFloat(val) || 0;
    return `${num} ${unit}`;
  },

  // One Rep Max (1RM) Formulas
  // Brzycki: Weight / (1.0278 - (0.0278 * Reps))
  // Epley: Weight * (1 + 0.0333 * Reps)
  calculate1RM(weight, reps, formula = "brzycki") {
    const w = parseFloat(weight) || 0;
    const r = parseInt(reps, 10) || 1;

    if (r === 1) return w;
    if (w <= 0 || r <= 0) return 0;

    let oneRm = 0;
    if (formula === "epley") {
      oneRm = w * (1 + 0.0333 * r);
    } else {
      // Brzycki formula
      oneRm = w / (1.0278 - 0.0278 * Math.min(r, 36));
    }
    return Math.round(oneRm * 10) / 10;
  },

  // Generate percentage breakdown of 1RM
  get1RMTable(oneRm) {
    const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 50];
    const repEstimates = {
      100: "1 rep",
      95: "2 reps",
      90: "4 reps",
      85: "6 reps",
      80: "8 reps",
      75: "10 reps",
      70: "12 reps",
      65: "15 reps",
      60: "20 reps",
      50: "Warm-up"
    };

    return percentages.map((pct) => ({
      percentage: pct,
      weight: Math.round((oneRm * (pct / 100)) * 10) / 10,
      reps: repEstimates[pct]
    }));
  },

  // TDEE & Macro Calculation using Mifflin-St Jeor formula
  calculateTDEE({ gender, weightKg, heightCm, age, activityLevel, goal }) {
    // BMR
    // Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === "female") {
      bmr -= 161;
    } else {
      bmr += 5;
    }

    // Activity Multiplier
    const multipliers = {
      sedentary: 1.2, // Little to no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Hard exercise 6-7 days/week
      very_active: 1.9 // Athlete / 2x daily training
    };

    const multiplier = multipliers[activityLevel] || 1.55;
    const maintenanceTDEE = Math.round(bmr * multiplier);

    // Goal Adjustments
    let targetCalories = maintenanceTDEE;
    if (goal === "fat_loss") {
      targetCalories = Math.round(maintenanceTDEE - 500); // ~0.5kg/week fat loss
    } else if (goal === "hypertrophy" || goal === "bulk") {
      targetCalories = Math.round(maintenanceTDEE + 350); // Lean surplus
    }

    // Macros:
    // Protein: ~2.0g per kg of bodyweight (4 kcal/g)
    // Fat: ~25% of total calories (9 kcal/g)
    // Carbs: Remaining calories (4 kcal/g)
    const proteinGrams = Math.round(weightKg * 2.0);
    const proteinKcal = proteinGrams * 4;

    const fatKcal = targetCalories * 0.25;
    const fatGrams = Math.round(fatKcal / 9);

    const remainingKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal));
    const carbsGrams = Math.round(remainingKcal / 4);

    return {
      bmr: Math.round(bmr),
      maintenance: maintenanceTDEE,
      targetCalories,
      macros: {
        protein: proteinGrams,
        fat: fatGrams,
        carbs: carbsGrams
      }
    };
  },

  // Plate Math Calculator
  // Given target weight & bar weight (e.g., standard Olympic bar 20kg / 45lb),
  // returns the plates needed per side.
  calculatePlates(targetTotalWeight, barWeight = 20, unit = "kg") {
    const availablePlates =
      unit === "lbs"
        ? [45, 35, 25, 10, 5, 2.5]
        : [25, 20, 15, 10, 5, 2.5, 1.25];

    if (targetTotalWeight <= barWeight) {
      return {
        unit,
        barWeight,
        weightPerSide: 0,
        platesPerSide: [],
        remainder: 0
      };
    }

    let weightPerSide = (targetTotalWeight - barWeight) / 2;
    const platesPerSide = [];
    let remaining = weightPerSide;

    for (const plate of availablePlates) {
      while (remaining >= plate - 0.01) {
        platesPerSide.push(plate);
        remaining -= plate;
        remaining = Math.round(remaining * 100) / 100;
      }
    }

    return {
      unit,
      barWeight,
      weightPerSide,
      platesPerSide,
      remainder: remaining
    };
  },

  // Color mapping for muscle groups
  getMuscleColor(muscle) {
    const colors = {
      Chest: "#ef4444", // red
      Back: "#3b82f6", // blue
      Legs: "#10b981", // emerald
      Shoulders: "#f59e0b", // amber
      Arms: "#8b5cf6", // purple
      Core: "#ec4899", // pink
      Cardio: "#06b6d4", // cyan
      "Full Body": "#6366f1" // indigo
    };
    return colors[muscle] || "#10b981";
  }
};

window.Helpers = Helpers;
