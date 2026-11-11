# 🏋️ PulseFit &bull; Dynamic & Fully Responsive Workout Platform

A modern, high-performance, fully responsive workout web application built with **100% dynamic data models**—no hard-coded HTML tables, workouts, or lists. All content, exercises, programs, session logs, and calculations are computed dynamically and persisted in real time.

---

## 🌟 Key Highlights & Design Principles

### 1. **Zero Hardcoding (100% Data-Driven Architecture)**
* **Dynamic Exercise Database**: Loaded from structured data models covering 50+ exercises across all muscle groups (Chest, Back, Legs, Shoulders, Arms, Core, Cardio, Full Body) with difficulty ratings, equipment types, step-by-step form cues, and caloric burn estimates.
* **Custom Exercise Creator**: Users can add their own custom exercises directly from the UI without modifying any code; custom items are stored in persistent `localStorage`.
* **Dynamic Routine & Split Builder**: Create, edit, clone, and reorder custom training routines (Push/Pull/Legs, Upper/Lower, HIIT, etc.) with custom sets, reps, and target rest intervals.
* **Real-time Workout Session Player**: Tracks live duration, volume ($weight \times reps$), live calorie burn, set completions, and triggers an automated rest countdown with audio synthesizer cues.
* **Dynamic Workout History & Persistence**: Automatically saves every completed workout session with set-by-set breakdown. Supports JSON export and import for full data backups and migrations.
* **Scientific Fitness Calculators**:
  - **1-Rep Max (1RM)**: Dynamically calculates maximum single-rep capacity using Brzycki and Epley equations, generating full intensity percentage breakdowns ($100\%$ down to $50\%$).
  - **TDEE & Macro Calculator**: Mifflin-St Jeor equation computes BMR, maintenance calories, target calories based on goal (fat loss / surplus), and precise protein/fat/carb macros with interactive visual split bars.
  - **Olympic Plate Barbell Visualizer**: Visualizes the exact Olympic plates to slide onto the barbell sleeve for any target weight in kg or lbs.
  - **Custom HIIT / Tabata Interval Clock**: Configurable preparation, work, rest intervals, and rounds with audio chimes and full-screen state indicators.

### 2. **Fully Responsive Across All Devices**
* **Mobile (< 640px)**:
  - Fixed ergonomic **bottom navigation bar** for rapid thumb navigation (Home, Library, Workout, Plans, History, Tools).
  - Touch-friendly stepper controls ($+ / -$ buttons for weights and reps) with tactile checkmark buttons ($44\text{px}+$ touch targets).
  - Floating sticky HUD ribbon displaying elapsed time, volume, and calories during active training.
  - Slide-out mobile drawer menu.
* **Tablet (640px – 1024px)**:
  - Auto-fit 2-column exercise and routine card grids.
  - Side-by-side inputs and interactive results for calculators.
* **Desktop & Laptop (> 1024px)**:
  - Top glassmorphism navigation bar with brand icon, quick status pills, theme toggle, and athlete profile modal.
  - 3-column exercise catalog with instant live search and multi-filtering pills.
  - High-resolution HTML5 Canvas charts rendered with retina display scaling (`window.devicePixelRatio`).

### 3. **Built-in Web Audio API Synthesizer (Zero External Dependencies)**
* No external `.mp3` files or network audio streaming needed!
* Generates synthesized audio frequencies directly in the browser:
  - $800\text{Hz}$ countdown ticks at 3, 2, 1 seconds.
  - Harmonic chord for set completion.
  - High-pitched $1200\text{Hz} \to 1600\text{Hz}$ "GO!" tone.
  - 4-note victory fanfare ($C_5, E_5, G_5, C_6$) upon workout completion with celebratory confetti animation.

---

## 📁 Project Architecture

```
workout/
├── index.html                 # Semantic HTML shell with dynamic SPA mount points & modals
├── package.json               # Project manifest with npm start / dev scripts
├── server.js                  # Zero-dependency local Node.js static server
├── README.md                  # Comprehensive project documentation
├── css/
│   └── styles.css             # Responsive design system, CSS variables, glassmorphism, animations
└── js/
    ├── app.js                 # App orchestrator, tab routing, drawer, settings, toasts
    ├── state.js               # Central reactive state manager & LocalStorage synchronization
    ├── data.js                # Rich default exercise catalog (50+ exercises) & pre-made routines
    ├── components/
    │   ├── dashboard.js       # Athlete dashboard, weekly volume canvas chart, streak calculation
    │   ├── exerciseLibrary.js # Dynamic search, muscle pills, filter by equipment/difficulty, custom creator
    │   ├── routineBuilder.js  # Split builder, exercise reordering, custom routines CRUD
    │   ├── workoutSession.js  # Live workout player, steppers, rest timer, celebration confetti modal
    │   ├── historyLogs.js     # Past workout logs, set-by-set breakdown, JSON export/import
    │   └── calculators.js     # 1RM, TDEE & Macros, Barbell Plate Visualizer, HIIT Interval Timer
    └── utils/
        ├── audio.js           # Web Audio API sound synthesizer (offline sound effects)
        └── helpers.js         # Formatting, 1RM formulas, Mifflin-St Jeor TDEE, plate math
```

---

## 🚀 How to Run the Website

### Option 1: Direct File Launch (Zero Setup)
Simply **double-click `index.html`** in Windows Explorer or open it in any web browser (Chrome, Edge, Firefox, Safari). The app is engineered so that all scripts, data, and audio synthesize locally without CORS errors.

### Option 2: Local Node.js Server
If you prefer running a local HTTP server:
```bash
# In the workout directory:
npm start
# or:
node server.js
```
Then navigate to:
```
http://localhost:3000
```

---

## ⚙️ Features Walkthrough

### 📊 Dashboard & Analytics
- **Live Stats Cards**: Total completed sessions, active training streak in days, total volume lifted (in kg or lbs), and active time trained.
- **Weekly Volume Chart**: Custom HTML5 Canvas bar chart rendering daily volume over the past 7 days with automatic dynamic scaling and retina sharpness.
- **Muscle Group Distribution**: Visual progress bars showing proportional training volume per muscle group.

### 🏋️ Dynamic Exercise Library
- **Live Search**: Instant substring search across exercise names, targeted muscle groups, and secondary muscles.
- **Filter Pills**: One-click filtering by Muscle Group (Chest, Back, Legs, Shoulders, Arms, Core, Cardio, Full Body).
- **Secondary Filters**: Filter by Equipment (Barbell, Dumbbell, Bodyweight, Cable, Machine, Kettlebell) and Difficulty.
- **Form & Guide Modal**: Complete step-by-step instructions, coach's form tips, secondary muscle tags, and caloric burn rates.
- **Create Custom Exercise**: Add custom exercises on the fly with custom sets, reps, equipment, and instructions.

### 📋 Routines & Split Builder
- **Pre-made Splits**: Push Day Hypertrophy, Pull Day Strength, Leg Day Foundation, Full Body HIIT, At-Home Dumbbell Sculpt, Core & Abs Crusher.
- **Custom Routine Builder**: Add custom routines, select any exercise from the database, reorder exercises with up/down controls, configure target sets/reps, and save.
- **Clone Routine**: One-click duplication to customize any pre-made routine into your own split.

### ⏱️ Live Workout Session Player
- **Real-time Stopwatch**: Live timer tracking elapsed duration.
- **Live Metrics HUD**: Dynamically recalculates total volume lifted and estimated caloric burn as sets are completed.
- **Sets Table**: Quick stepper buttons ($-2.5 / +2.5$ for weight, $-1 / +1$ for reps) and completion checkmark button.
- **Rest Timer**: Automatically triggers upon set completion with audio countdown and $+30\text{s} / -15\text{s}$ adjustments.
- **On-the-fly Additions**: Add any exercise directly into an active workout session.
- **Victory Celebration**: Finishing a workout triggers a victory fanfare, summary recap, and particle confetti animation.

### 🧮 Fitness Tools & Calculators
1. **1-Rep Max (1RM)**: Uses Brzycki ($W / (1.0278 - 0.0278 \times R)$) and Epley ($W \times (1 + 0.0333 \times R)$) equations to estimate maximum strength and generate a complete rep/intensity chart.
2. **TDEE & Macro Calculator**: Mifflin-St Jeor formula calculating Basal Metabolic Rate, daily energy expenditure, and target macronutrient breakdown (Protein, Fats, Carbs) with visual colored distribution bars.
3. **Barbell Plate Visualizer**: Calculates and renders exact Olympic color-coded bumper plates loaded onto the sleeve.
4. **HIIT / Tabata Interval Clock**: Full-screen interval training timer with color-coded preparation, work, and rest states accompanied by audio beeps.
