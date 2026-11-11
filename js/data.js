/**
 * Dynamic Exercise Database, Routines, and GymLife Fitness Data
 * Completely data-driven: no hardcoded markup in HTML!
 */

const DEFAULT_EXERCISES = [
  {
    "id": "ex_bench_press",
    "name": "Barbell Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Front Delts"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7.5,
    "defaultSets": 4,
    "defaultReps": 8,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-bench-press.gif",
    "instructions": [
      "Lie flat on the bench with eyes directly under the bar.",
      "Grip the bar slightly wider than shoulder-width with wrists straight.",
      "Unrack the bar and stabilize it directly over your chest with arms locked.",
      "Lower the bar under control until it gently touches your mid-chest.",
      "Press the bar explosively back up to the starting position, exhaling on the way up."
    ],
    "tips": "Keep your feet planted flat, retract your scapula (shoulder blades pinched), and do not bounce the bar off your sternum."
  },
  {
    "id": "ex_incline_db_press",
    "name": "Incline Dumbbell Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Front Delts",
      "Triceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 6.8,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-incline-alternate-press.gif",
    "instructions": [
      "Set an adjustable bench to a 30-45 degree incline angle.",
      "Kick the dumbbells up to shoulder height as you lie back onto the pad.",
      "Press weights upwards over upper chest, palms facing forward.",
      "Lower under control until you feel a deep stretch in the upper pectorals.",
      "Drive back to lockout without letting dumbbells clang together."
    ],
    "tips": "Keep elbows at a 45-degree angle to protect your rotator cuffs."
  },
  {
    "id": "ex_pushups",
    "name": "Standard Push-Ups",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Core",
      "Front Delts"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "category": "Endurance",
    "caloriesPerMin": 6,
    "defaultSets": 3,
    "defaultReps": 15,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/push-up.gif",
    "instructions": [
      "Assume a high plank with hands slightly wider than shoulder-width.",
      "Lock your core and glutes so your body forms a straight line from head to heels.",
      "Bend your elbows to lower your chest until it hovers an inch above the floor.",
      "Press firmly through your palms to return to full arm extension."
    ],
    "tips": "Do not let your hips sag or hike up; imagine pulling your belly button toward your spine."
  },
  {
    "id": "ex_chest_dips",
    "name": "Chest Dips",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Front Delts"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7.2,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/chest-dip-on-dip-pull-up-cage.gif",
    "instructions": [
      "Grip the parallel dip bars and hoist yourself up to arm extension.",
      "Lean your torso slightly forward (about 30 degrees) to emphasize lower chest.",
      "Bend elbows and descend until your upper arms are parallel to the floor.",
      "Press through your palms to push back up, squeezing your chest at the top."
    ],
    "tips": "Avoid dropping too deep if you experience shoulder discomfort; keep the forward lean consistent."
  },
  {
    "id": "ex_cable_fly",
    "name": "Cable Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Front Delts"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.5,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/cable-decline-fly.gif",
    "instructions": [
      "Set cable pulleys at chest height with D-handles attached.",
      "Step forward into a staggered stance with a slight bend in your elbows.",
      "Bring handles forward in a wide hugging motion until palms nearly meet in front of your chest.",
      "Slowly reverse the motion under cable tension for a peak pectoral stretch."
    ],
    "tips": "Maintain the slight bend in your elbows throughout; do not turn the fly into a pressing movement."
  },
  {
    "id": "ex_decline_bench_press",
    "name": "Barbell Decline Bench Press",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Triceps",
      "Lower Chest"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/barbell-decline-bench-press.gif",
    "instructions": [
      "Secure legs under pads on a decline bench and grip the barbell shoulder-width apart.",
      "Unrack the bar and position it over lower chest with wrists firm.",
      "Lower smoothly to bottom of sternum.",
      "Press forcefully upwards until elbows are extended."
    ],
    "tips": "Targets the lower pectoral fibers with less strain on the front shoulders."
  },
  {
    "id": "ex_dumbbell_fly",
    "name": "Dumbbell Chest Fly",
    "muscleGroup": "Chest",
    "secondaryMuscles": [
      "Front Delts"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.8,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/dumbbell-fly-on-exercise-ball.gif",
    "instructions": [
      "Lie on flat bench with dumbbells held above chest, palms facing each other.",
      "With slight elbow bend, arc dumbbells outward until you feel a deep pectoral stretch.",
      "Squeeze chest muscles to return dumbbells back to starting position."
    ],
    "tips": "Never hyperextend the shoulders beyond bench level to avoid shoulder impingement."
  },
  {
    "id": "ex_barbell_deadlift",
    "name": "Conventional Barbell Deadlift",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Hamstrings",
      "Glutes",
      "Traps",
      "Forearms"
    ],
    "equipment": "Barbell",
    "difficulty": "Advanced",
    "category": "Strength",
    "caloriesPerMin": 9,
    "defaultSets": 4,
    "defaultReps": 5,
    "restSeconds": 120,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-deadlift.gif",
    "instructions": [
      "Stand with mid-foot directly under the bar, feet hip-width apart.",
      "Hinge at hips and grip the bar just outside your shins.",
      "Drop hips slightly, pull chest up, flatten your back, and engage your lats.",
      "Drive the floor away through your heels, extending hips and knees simultaneously.",
      "Lock out hips and knees at top; reverse hips back to lower the weight under control."
    ],
    "tips": "Never round your lumbar spine. Think of the movement as pushing the floor away rather than pulling the bar."
  },
  {
    "id": "ex_bent_over_row",
    "name": "Barbell Bent-Over Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Lats",
      "Rhomboids",
      "Biceps",
      "Rear Delts"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7.8,
    "defaultSets": 4,
    "defaultReps": 8,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/barbell-bent-over-row.gif",
    "instructions": [
      "Hold bar with an overhand grip slightly wider than shoulder-width.",
      "Hinge forward at hips until torso is roughly 45 degrees to the floor, back neutral.",
      "Pull bar towards lower ribcage / navel by driving elbows straight back.",
      "Squeeze shoulder blades together at peak contraction, then lower with control."
    ],
    "tips": "Do not jerk torso up and down to generate momentum; maintain a rock-solid hip hinge."
  },
  {
    "id": "ex_lat_pulldown",
    "name": "Cable Lat Pulldown",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Biceps",
      "Upper Back"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 6.2,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/cable-lat-pulldown-full-range-of-motion.gif",
    "instructions": [
      "Sit on machine with thigh pads snug over quads; grip wide bar overhand.",
      "Lean back slightly (10-15 degrees) and draw chest toward the ceiling.",
      "Pull bar down towards upper chest by pulling elbows downward and in.",
      "Pause for a beat, feeling your lats contract, then let bar return to top stretch."
    ],
    "tips": "Initiate the movement by depressing your scapula, not by flexing your biceps."
  },
  {
    "id": "ex_pullups",
    "name": "Pull-Ups",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Lats",
      "Biceps",
      "Core"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "category": "Strength",
    "caloriesPerMin": 8.5,
    "defaultSets": 3,
    "defaultReps": 8,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/biceps-narrow-pull-ups.gif",
    "instructions": [
      "Hang from overhead pull-up bar with overhand grip just outside shoulder-width.",
      "Pull shoulder blades down and back to engage back musculature.",
      "Drive elbows towards your ribs until your chin clears the bar.",
      "Lower under control until arms are fully extended at dead-hang."
    ],
    "tips": "Avoid kipping or swinging; cross your ankles and keep your core braced tightly."
  },
  {
    "id": "ex_seated_cable_row",
    "name": "Seated Cable Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Rhomboids",
      "Biceps",
      "Lats"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 6.5,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/band-one-arm-twisting-seated-row.gif",
    "instructions": [
      "Sit on bench with feet flat on foot plates, knees slightly bent.",
      "Grip V-bar handle with arms outstretched and sit upright with neutral spine.",
      "Pull handle into lower abdomen by retracting shoulder blades.",
      "Slowly extend arms forward for a full lat stretch."
    ],
    "tips": "Avoid leaning far forward or swinging back; let your back muscles do the work."
  },
  {
    "id": "ex_t_bar_row",
    "name": "T-Bar Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Lats",
      "Biceps",
      "Erectors"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7.4,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/lats/cable-pulldown-pro-lat-bar.gif",
    "instructions": [
      "Straddle the T-bar apparatus with knees bent and torso hinged forward.",
      "Grip handles firmly and pull weight toward chest while keeping back flat.",
      "Squeeze back at top, then lower weight smoothly."
    ],
    "tips": "Brace your core tightly to protect your lower spine throughout the lift."
  },
  {
    "id": "ex_one_arm_db_row",
    "name": "Single-Arm Dumbbell Row",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Lats",
      "Rhomboids",
      "Biceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 6.7,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/upper-back/bodyweight-standing-close-grip-one-arm-row.gif",
    "instructions": [
      "Place one knee and same-side hand on a flat bench for stability.",
      "With opposite hand, hold dumbbell and let arm hang straight down.",
      "Pull dumbbell up towards hip, keeping elbow close to torso.",
      "Lower under control for full stretch."
    ],
    "tips": "Keep your chest parallel to the floor without rotating your torso to lift the weight."
  },
  {
    "id": "ex_hyperextension",
    "name": "Back Hyperextension",
    "muscleGroup": "Back",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Lower Back"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "category": "Endurance",
    "caloriesPerMin": 5.5,
    "defaultSets": 3,
    "defaultReps": 15,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/lever-reverse-hyperextension.gif",
    "instructions": [
      "Position yourself on hyperextension bench with thighs on pads and ankles secured.",
      "Cross arms over chest and bend at waist until torso is lowered.",
      "Raise torso until body is straight, squeezing lower back and glutes at top."
    ],
    "tips": "Do not hyperextend past parallel with your legs to avoid pinching lower back joints."
  },
  {
    "id": "ex_barbell_squat",
    "name": "Barbell Back Squat",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core"
    ],
    "equipment": "Barbell",
    "difficulty": "Advanced",
    "category": "Strength",
    "caloriesPerMin": 9.5,
    "defaultSets": 4,
    "defaultReps": 6,
    "restSeconds": 120,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/barbell-bench-squat.gif",
    "instructions": [
      "Step under the barbell resting it across your upper traps.",
      "Unrack with feet shoulder-width apart, toes flared slightly out 15-30 degrees.",
      "Take a deep diaphragmatic breath, brace your core, and initiate by pushing hips back and knees out.",
      "Squat down until hip crease descends below top of knee (parallel or deeper).",
      "Drive up through the mid-foot/heels, maintaining an upright torso until hips are locked."
    ],
    "tips": "Ensure knees track in the same line as your toes; never let knees cave inward."
  },
  {
    "id": "ex_romanian_deadlift",
    "name": "Romanian Deadlift (RDL)",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Hamstrings",
      "Glutes",
      "Lower Back"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 7.5,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/barbell-romanian-deadlift.gif",
    "instructions": [
      "Hold barbell in front of thighs with an overhand grip, feet hip-width.",
      "With slight knee bend, push hips backward as bar glides down shins.",
      "Descend until you feel a deep stretch in hamstrings without rounding back.",
      "Drive hips forward to return upright, squeezing glutes hard at the top."
    ],
    "tips": "Keep the bar in contact with your legs the entire duration."
  },
  {
    "id": "ex_leg_press",
    "name": "45° Leg Press",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Quads",
      "Glutes"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 8,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/calves/lever-seated-squat-calf-raise-on-leg-press-machine.gif",
    "instructions": [
      "Sit back firmly into seat with lower back pressed against pad.",
      "Place feet shoulder-width on sled; release safety catches.",
      "Lower sled until knees bend at 90 degrees without lower back peeling off pad.",
      "Press platform away through heels until knees are almost locked."
    ],
    "tips": "Never lock your knees out aggressively at the top of the movement."
  },
  {
    "id": "ex_leg_extension",
    "name": "Leg Extension",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Quads"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.5,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/lever-leg-extension.gif",
    "instructions": [
      "Align knee joints with pivot point of machine, roller pad resting above ankles.",
      "Extend legs upwards against resistance until knees are fully extended.",
      "Pause for 1 second at top contraction, then lower with control."
    ],
    "tips": "Control the negative phase to maximize quad muscle fiber recruitment."
  },
  {
    "id": "ex_leg_curl",
    "name": "Lying Leg Curl",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Hamstrings",
      "Calves"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.6,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/hamstrings/cable-assisted-inverse-leg-curl.gif",
    "instructions": [
      "Lie face down on machine with roller pad positioned just below calves.",
      "Keep hips flat on bench and curl legs upward toward your glutes.",
      "Hold peak contraction for a second, then lower slowly."
    ],
    "tips": "Do not let your hips rise off the bench as you curl the weight."
  },
  {
    "id": "ex_bulgarian_split_squat",
    "name": "Bulgarian Split Squat",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Glutes",
      "Quads",
      "Core"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 7.2,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/quads/band-one-arm-single-leg-split-squat.gif",
    "instructions": [
      "Stand 2-3 feet ahead of bench, placing one foot lace-down on the bench behind you.",
      "Holding dumbbells at your sides, descend straight down until back knee hovers near floor.",
      "Drive through lead heel to rise back to top position."
    ],
    "tips": "Keep your torso slightly leaned forward to emphasize the lead glute and quad."
  },
  {
    "id": "ex_calf_raise",
    "name": "Standing Calf Raise",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Calves"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 4.8,
    "defaultSets": 4,
    "defaultReps": 15,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/calves/band-single-leg-calf-raise.gif",
    "instructions": [
      "Place balls of feet on edge of platform with heels hanging down.",
      "Lower heels below platform level for a full calf stretch.",
      "Push up through the balls of your feet onto your toes as high as possible."
    ],
    "tips": "Pause at bottom and top to eliminate Achilles tendon spring momentum."
  },
  {
    "id": "ex_walking_lunge",
    "name": "Dumbbell Walking Lunge",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Glutes",
      "Quads",
      "Hamstrings"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 7.8,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/lunge-with-twist.gif",
    "instructions": [
      "Hold dumbbells at sides with tall posture.",
      "Step forward with right foot and sink into lunge until both knees are at 90 degrees.",
      "Push off back foot and step left leg forward into next lunge."
    ],
    "tips": "Maintain an upright torso and prevent your front knee from traveling past your toes."
  },
  {
    "id": "ex_hip_thrust",
    "name": "Barbell Hip Thrust",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 8.2,
    "defaultSets": 4,
    "defaultReps": 10,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/resistance-band-hip-thrusts-on-knees-female.gif",
    "instructions": [
      "Sit on floor with upper back against bench and loaded barbell across hips.",
      "Plant feet shoulder-width on floor with shins vertical at top of movement.",
      "Drive through heels to extend hips upward until thighs and torso align.",
      "Squeeze glutes hard at top for 1 full second, then lower."
    ],
    "tips": "Use a barbell pad across your pelvic bone for comfort; tuck chin to avoid hyperextending spine."
  },
  {
    "id": "ex_goblet_squat",
    "name": "Kettlebell Goblet Squat",
    "muscleGroup": "Legs",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Core"
    ],
    "equipment": "Kettlebell",
    "difficulty": "Beginner",
    "category": "Strength",
    "caloriesPerMin": 7,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/kettlebell-goblet-squat.gif",
    "instructions": [
      "Hold kettlebell or dumbbell vertically against your chest with both hands.",
      "Squat down between knees, keeping chest high and elbows inside knees.",
      "Drive back to standing position through mid-foot."
    ],
    "tips": "Great for mastering squat depth and maintaining an upright spine."
  },
  {
    "id": "ex_overhead_press",
    "name": "Standing Overhead Barbell Press (OHP)",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Upper Chest",
      "Core"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7,
    "defaultSets": 4,
    "defaultReps": 6,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/band-twisting-overhead-press.gif",
    "instructions": [
      "Rest barbell on front deltoids with hands just outside shoulders.",
      "Squeeze glutes and brace core tightly to lock pelvis in position.",
      "Press bar vertically, tilting head slightly back until bar clears forehead.",
      "Lock out arms overhead and shrug shoulders slightly at top."
    ],
    "tips": "Avoid arching lower back; keep glutes clenched like a stone throughout."
  },
  {
    "id": "ex_lateral_raise",
    "name": "Dumbbell Lateral Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Traps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.2,
    "defaultSets": 4,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-lateral-raise.gif",
    "instructions": [
      "Stand holding dumbbells at your sides with palms facing inward, slight elbow bend.",
      "Raise arms out to sides in wide arc until elbows reach shoulder level.",
      "Pour invisible water (pinky slightly higher than thumb) at top.",
      "Lower under control, stopping just shy of thighs to maintain delt tension."
    ],
    "tips": "Lead with elbows, not wrists. Use moderate weight to avoid shrugging with your traps."
  },
  {
    "id": "ex_face_pull",
    "name": "Cable Face Pull",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Rear Delts",
      "Rotator Cuff",
      "Upper Back"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5,
    "defaultSets": 3,
    "defaultReps": 15,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/band-standing-rear-delt-row.gif",
    "instructions": [
      "Set rope on high cable pulley; grasp with thumbs backward grip.",
      "Step back, pull rope handles toward your eyes while flaring elbows high and wide.",
      "Externally rotate hands back at end of movement, holding for a beat."
    ],
    "tips": "Essential for shoulder health, posture restoration, and bulletproofing rotator cuffs."
  },
  {
    "id": "ex_arnold_press",
    "name": "Arnold Dumbbell Press",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Triceps",
      "Front & Side Delts"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 6.8,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/dumbbell-arnold-press-v-2.gif",
    "instructions": [
      "Sit holding dumbbells at chest height with palms facing your chest.",
      "As you press upward, rotate wrists so palms face forward at lockout.",
      "Reverse rotation as you descend back to starting position."
    ],
    "tips": "Provides continuous tension across all three deltoid heads through rotation."
  },
  {
    "id": "ex_front_raise",
    "name": "Dumbbell Front Raise",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Front Delts"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/band-front-raise.gif",
    "instructions": [
      "Hold dumbbells resting against front of thighs.",
      "Raise arms forward until parallel to floor, keeping elbows softly unlocked.",
      "Lower under control without swinging."
    ],
    "tips": "Keep core locked so you do not rock back and forth."
  },
  {
    "id": "ex_reverse_fly",
    "name": "Reverse Cable / Dumbbell Fly",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Rear Delts",
      "Rhomboids"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.3,
    "defaultSets": 3,
    "defaultReps": 15,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/band-reverse-fly.gif",
    "instructions": [
      "Hinge forward with flat back, holding light dumbbells beneath chest.",
      "Open arms outward in a reverse hug motion until level with back.",
      "Squeeze rear delts at peak."
    ],
    "tips": "Use light weights; this is an isolation movement for the smaller posterior delts."
  },
  {
    "id": "ex_upright_row",
    "name": "Barbell Upright Row",
    "muscleGroup": "Shoulders",
    "secondaryMuscles": [
      "Traps",
      "Side Delts",
      "Biceps"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 6.5,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/delts/barbell-upright-row-v-2.gif",
    "instructions": [
      "Hold barbell with shoulder-width grip in front of thighs.",
      "Pull bar vertically along torso until elbows reach shoulder height.",
      "Lower slowly back to start."
    ],
    "tips": "Take a wider grip if narrow grip causes wrist or shoulder discomfort."
  },
  {
    "id": "ex_barbell_curl",
    "name": "Standing Barbell Bicep Curl",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Forearms",
      "Biceps Brachii"
    ],
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.5,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-curl.gif",
    "instructions": [
      "Stand tall holding barbell with shoulder-width underhand grip.",
      "Pin elbows against ribs and curl bar towards shoulders.",
      "Contract biceps hard at top without letting elbows drift forward.",
      "Lower under control over 2 seconds to full extension."
    ],
    "tips": "Do not swing your hips or arch your lower back to complete the curl."
  },
  {
    "id": "ex_hammer_curl",
    "name": "Dumbbell Hammer Curl",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Brachialis",
      "Forearms"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.4,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/cable-hammer-curl-with-rope.gif",
    "instructions": [
      "Stand holding dumbbells with palms facing each other (neutral grip).",
      "Keep elbows fixed and curl weights toward shoulders.",
      "Squeeze forearms and brachialis at the top before lowering."
    ],
    "tips": "Builds upper arm thickness and forearm grip strength."
  },
  {
    "id": "ex_preacher_curl",
    "name": "Barbell Preacher Curl",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Biceps"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.2,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-lying-preacher-curl.gif",
    "instructions": [
      "Sit at preacher bench with upper arms resting snugly against angled pad.",
      "Curl bar upward to top range, then lower until arms are almost fully extended."
    ],
    "tips": "Eliminates cheating by locking upper arm position."
  },
  {
    "id": "ex_incline_bicep_curl",
    "name": "Incline Dumbbell Bicep Curl",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Biceps Long Head"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.3,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/biceps/barbell-prone-incline-curl.gif",
    "instructions": [
      "Lie back on bench set to 45-degree incline with dumbbells hanging down.",
      "Curl weights upward while keeping elbows back behind torso."
    ],
    "tips": "Places the biceps long head in a deep stretch for superior peak development."
  },
  {
    "id": "ex_tricep_rope_pushdown",
    "name": "Cable Tricep Rope Pushdown",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Lateral & Medial Triceps"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.2,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/cable-one-arm-tricep-pushdown.gif",
    "instructions": [
      "Attach rope to high pulley; grip ends with palms facing each other.",
      "Tuck elbows into ribs and hinge forward slightly at hips.",
      "Push rope down, spreading handles apart at bottom lockout.",
      "Pause for peak triceps squeeze, then allow forearms to rise to 90 degrees."
    ],
    "tips": "Do not let elbows flare or drift forward away from your torso."
  },
  {
    "id": "ex_skull_crushers",
    "name": "Lying Triceps Extension (Skull Crusher)",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Triceps Long Head"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Hypertrophy",
    "caloriesPerMin": 6,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 75,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/barbell-lying-triceps-extension-skull-crusher.gif",
    "instructions": [
      "Lie on flat bench holding EZ-bar with hands close, arms vertical.",
      "Keeping upper arms stationary, bend elbows to lower bar toward forehead.",
      "Extend elbows to press weight back to top lockout."
    ],
    "tips": "Angle upper arms slightly back past vertical to maintain constant triceps tension."
  },
  {
    "id": "ex_overhead_tricep_ext",
    "name": "Overhead Dumbbell Tricep Extension",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Triceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 5.5,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/triceps/barbell-seated-overhead-triceps-extension.gif",
    "instructions": [
      "Hold dumbbell overhead with both hands cupping the top plate.",
      "Lower dumbbell behind head by bending elbows, then press back to full extension."
    ],
    "tips": "Keep elbows tucked inward rather than letting them splay wide."
  },
  {
    "id": "ex_close_grip_bench",
    "name": "Close-Grip Barbell Bench Press",
    "muscleGroup": "Arms",
    "secondaryMuscles": [
      "Triceps",
      "Chest",
      "Front Delts"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 7.2,
    "defaultSets": 3,
    "defaultReps": 8,
    "restSeconds": 90,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/pectorals/smith-machine-reverse-decline-close-grip-bench-press.gif",
    "instructions": [
      "Lie on flat bench and grip bar shoulder-width apart.",
      "Lower bar to lower chest, keeping elbows tucked close to sides.",
      "Press back up using triceps power to lockout."
    ],
    "tips": "Do not grip too narrow (less than shoulder-width) to protect wrist joints."
  },
  {
    "id": "ex_hanging_leg_raise",
    "name": "Hanging Leg / Knee Raise",
    "muscleGroup": "Core",
    "secondaryMuscles": [
      "Hip Flexors",
      "Forearms / Grip"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "category": "Strength",
    "caloriesPerMin": 6.5,
    "defaultSets": 3,
    "defaultReps": 12,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/hanging-leg-raise.gif",
    "instructions": [
      "Hang from pull-up bar with arms straight and body still.",
      "Engage lower abs to curl pelvis upward as legs raise to parallel or higher.",
      "Slowly lower legs without letting body swing like a pendulum."
    ],
    "tips": "Focus on curling your pelvis upward towards your chest, not just lifting legs."
  },
  {
    "id": "ex_cable_woodchopper",
    "name": "Cable Woodchopper / Twist",
    "muscleGroup": "Core",
    "secondaryMuscles": [
      "Obliques",
      "Shoulders"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "category": "Hypertrophy",
    "caloriesPerMin": 6,
    "defaultSets": 3,
    "defaultReps": 15,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/cable-twist-up-down.gif",
    "instructions": [
      "Grip cable handle with both hands at high pulley.",
      "Rotate torso diagonally across body down towards opposite knee.",
      "Control resistance as you return to start position."
    ],
    "tips": "Pivot on back foot and initiate movement from your core oblique rotation."
  },
  {
    "id": "ex_crunch",
    "name": "Bicycle / Abdominal Crunch",
    "muscleGroup": "Core",
    "secondaryMuscles": [
      "Rectus Abdominis"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "category": "Endurance",
    "caloriesPerMin": 5,
    "defaultSets": 3,
    "defaultReps": 20,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/band-bicycle-crunch.gif",
    "instructions": [
      "Lie on back with knees bent and fingertips behind head.",
      "Curl ribcage down toward pelvis, lifting shoulder blades off floor.",
      "Exhale and squeeze abs hard at peak."
    ],
    "tips": "Do not pull on your neck with your hands."
  },
  {
    "id": "ex_plank",
    "name": "Isometric Forearm Plank",
    "muscleGroup": "Core",
    "secondaryMuscles": [
      "Transverse Abdominis",
      "Glutes",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "category": "Endurance",
    "caloriesPerMin": 4.5,
    "defaultSets": 3,
    "defaultReps": 60,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/bodyweight-incline-side-plank.gif",
    "instructions": [
      "Rest on forearms and toes with body in straight line.",
      "Tuck pelvis under, engage abs, and squeeze glutes hard.",
      "Breathe steadily while holding position."
    ],
    "tips": "Think about pulling elbows toward your toes to generate maximum tension."
  },
  {
    "id": "ex_russian_twist",
    "name": "Seated Russian Twist",
    "muscleGroup": "Core",
    "secondaryMuscles": [
      "Obliques",
      "Hip Flexors"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "category": "Endurance",
    "caloriesPerMin": 5.5,
    "defaultSets": 3,
    "defaultReps": 20,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/assisted-motion-russian-twist.gif",
    "instructions": [
      "Sit with knees bent, lean back 45 degrees, and elevate feet slightly.",
      "Rotate torso side to side, touching hands to floor on each side."
    ],
    "tips": "Keep your chest open and rotate through your ribcage, not just moving arms."
  },
  {
    "id": "ex_ab_wheel",
    "name": "Ab Wheel Rollout",
    "muscleGroup": "Core",
    "secondaryMuscles": [
      "Lats",
      "Shoulders",
      "Lower Back"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "category": "Strength",
    "caloriesPerMin": 6.8,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/band-assisted-wheel-rollerout.gif",
    "instructions": [
      "Kneel on floor holding wheel with both hands.",
      "Roll wheel forward, extending body as low as possible without arching lower back.",
      "Pull back using abs to return to start position."
    ],
    "tips": "Keep posterior pelvic tilt (tucked tailbone) to protect lower back."
  },
  {
    "id": "ex_burpees",
    "name": "Full Burpees",
    "muscleGroup": "Cardio",
    "secondaryMuscles": [
      "Legs",
      "Chest",
      "Core",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "category": "Cardio",
    "caloriesPerMin": 11,
    "defaultSets": 3,
    "defaultReps": 15,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/burpee.gif",
    "instructions": [
      "From standing, drop into squat and place hands on floor.",
      "Jump feet back into plank and perform a push-up.",
      "Jump feet back forward to hands, then explode upward into a vertical jump with arms overhead."
    ],
    "tips": "Pace yourself steadily to sustain energy through the set."
  },
  {
    "id": "ex_kettlebell_swing",
    "name": "Russian Kettlebell Swing",
    "muscleGroup": "Full Body",
    "secondaryMuscles": [
      "Glutes",
      "Hamstrings",
      "Core",
      "Shoulders"
    ],
    "equipment": "Kettlebell",
    "difficulty": "Intermediate",
    "category": "Endurance",
    "caloriesPerMin": 10.5,
    "defaultSets": 4,
    "defaultReps": 15,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/glutes/kettlebell-swing.gif",
    "instructions": [
      "Stand feet wider than hips, kettlebell on floor 1 foot in front of you.",
      "Hinge hips and hike kettlebell back between legs like a football snap.",
      "Snap hips forward explosively, driving kettlebell to chest height.",
      "Let kettlebell freefall back into hip hinge and repeat in continuous rhythm."
    ],
    "tips": "Power comes strictly from hip extension and glute snap, not your shoulder arms."
  },
  {
    "id": "ex_jumping_jacks",
    "name": "Jumping Jacks",
    "muscleGroup": "Cardio",
    "secondaryMuscles": [
      "Calves",
      "Delts",
      "Core"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "category": "Cardio",
    "caloriesPerMin": 8,
    "defaultSets": 3,
    "defaultReps": 30,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/jack-jump-male.gif",
    "instructions": [
      "Start standing feet together, hands at sides.",
      "Jump feet out wide while clapping hands above head.",
      "Jump back to starting position with soft landings on balls of feet."
    ],
    "tips": "Land softly with knees slightly bent to absorb impact."
  },
  {
    "id": "ex_mountain_climber",
    "name": "Mountain Climbers",
    "muscleGroup": "Cardio",
    "secondaryMuscles": [
      "Core",
      "Shoulders",
      "Hip Flexors"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "category": "Cardio",
    "caloriesPerMin": 9.5,
    "defaultSets": 3,
    "defaultReps": 30,
    "restSeconds": 45,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/cardio/mountain-climber.gif",
    "instructions": [
      "Start in top push-up plank position with wrists under shoulders.",
      "Drive right knee towards chest, then quickly switch legs in a running motion.",
      "Maintain a flat back and level hips throughout."
    ],
    "tips": "Keep hips low and do not bounce up and down."
  },
  {
    "id": "ex_box_jump",
    "name": "Plyometric Box Jump",
    "muscleGroup": "Cardio",
    "secondaryMuscles": [
      "Quads",
      "Glutes",
      "Calves"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "category": "Cardio",
    "caloriesPerMin": 9.8,
    "defaultSets": 3,
    "defaultReps": 10,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/calves/box-jump-down-with-one-leg-stabilization.gif",
    "instructions": [
      "Stand facing sturdy plyo box 1-2 feet away.",
      "Swing arms back, hinge hips, and explode onto box landing softly in partial squat.",
      "Step down carefully and reset."
    ],
    "tips": "Focus on quiet, soft landings to protect knee joints."
  },
  {
    "id": "ex_battle_ropes",
    "name": "Battle Ropes Slams",
    "muscleGroup": "Cardio",
    "secondaryMuscles": [
      "Shoulders",
      "Arms",
      "Core",
      "Back"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "category": "Cardio",
    "caloriesPerMin": 11.5,
    "defaultSets": 3,
    "defaultReps": 30,
    "restSeconds": 60,
    "gifUrl": "https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0/abs/cable-standing-crunch-with-rope-attachment.gif",
    "instructions": [
      "Hold rope ends in quarter squat stance with braced core.",
      "Alternate whipping arms rapidly up and down to create continuous wave patterns."
    ],
    "tips": "Keep your stance athletic and power through your core."
  }
];

const DEFAULT_ROUTINES = [
  {
    id: "routine_push_hypertrophy",
    title: "Push Day Hypertrophy",
    category: "Push",
    durationMinutes: 45,
    difficulty: "Intermediate",
    description: "Focus on chest, front/side delts, and triceps for upper body pressing power and muscle growth.",
    targetMuscle: "Chest, Shoulders, Triceps",
    exerciseIds: [
      "ex_bench_press",
      "ex_incline_db_press",
      "ex_overhead_press",
      "ex_lateral_raise",
      "ex_tricep_rope_pushdown"
    ]
  },
  {
    id: "routine_pull_strength",
    title: "Pull Day Strength & Width",
    category: "Pull",
    durationMinutes: 50,
    difficulty: "Intermediate",
    description: "Build a wide V-taper lat profile, thick mid-back, rear delts, and bulging biceps.",
    targetMuscle: "Back, Rear Delts, Biceps",
    exerciseIds: [
      "ex_barbell_deadlift",
      "ex_pullups",
      "ex_bent_over_row",
      "ex_barbell_curl"
    ]
  },
  {
    id: "routine_leg_day",
    title: "Leg Day Foundation",
    category: "Legs",
    durationMinutes: 55,
    difficulty: "Advanced",
    description: "Complete lower body workout targeting quads, hamstrings, glutes, and calves with compound movements.",
    targetMuscle: "Quads, Hamstrings, Glutes, Calves",
    exerciseIds: [
      "ex_barbell_squat",
      "ex_romanian_deadlift",
      "ex_bulgarian_split_squat",
      "ex_leg_extension"
    ]
  },
  {
    id: "routine_full_body_burner",
    title: "Full Body Functional HIIT",
    category: "Full Body",
    durationMinutes: 30,
    difficulty: "Intermediate",
    description: "High-intensity metabolic conditioning combining kettlebell swings, burpees, pushups, and core.",
    targetMuscle: "Full Body, Cardio, Core",
    exerciseIds: [
      "ex_kettlebell_swing",
      "ex_burpees",
      "ex_pushups",
      "ex_hanging_leg_raise"
    ]
  }
];

// --- GYMLIFE SIGNATURE DATA (Classes, Timetable, Trainers, Pricing, Contact Info) ---
const GYMLIFE_CLASSES = [
  {
    id: "cls_weightlifting",
    title: "WEIGHTLIFTING & POWER",
    category: "Strength",
    coach: "Rachel Hunter",
    desc: "Build ultimate raw power, compound technique mastery, and pure muscular density.",
    badge: "STRENGTH"
  },
  {
    id: "cls_cycling",
    title: "INDOOR CYCLING & RPM",
    category: "Cardio",
    coach: "Marcus Cole",
    desc: "High-cadence interval cycling with live rhythm tracks to maximize VO2 max and calorie burn.",
    badge: "CARDIO"
  },
  {
    id: "cls_bodybuilding",
    title: "HYPERTROPHY BODYBUILDING",
    category: "Aesthetics",
    coach: "Alex Rivera",
    desc: "Targeted mind-muscle isolation, drop sets, and peak volume for balanced sculpted aesthetics.",
    badge: "MUSCLE"
  },
  {
    id: "cls_kettlebell",
    title: "KETTLEBELL COMBAT",
    category: "Crossfit",
    coach: "Sarah Connor",
    desc: "Dynamic ballistic conditioning, rotational swings, snatches, and tactical conditioning.",
    badge: "CROSSFIT"
  },
  {
    id: "cls_boxing",
    title: "BOXING & STRIKING",
    category: "Combat",
    coach: "David Hayes",
    desc: "Heavy bag drill combos, footwork, speed rope, and high-intensity combat conditioning.",
    badge: "BOXING"
  },
  {
    id: "cls_yoga",
    title: "MOBILITY & FLOW YOGA",
    category: "Mobility",
    coach: "Elena Rostova",
    desc: "Restore joint integrity, hip mobility, spinal decompression, and athletic recovery.",
    badge: "MOBILITY"
  }
];

const GYMLIFE_PRICING = [
  {
    id: "plan_dropin",
    title: "Class drop-in",
    price: "39.0",
    period: "SINGLE CLASS",
    popular: false,
    features: [
      "Free riding equipment",
      "Unlimited gym access",
      "Personal trainer guide",
      "Weight loss program",
      "No commitment"
    ]
  },
  {
    id: "plan_12month",
    title: "12 Month unlimited",
    price: "99.0",
    period: "SINGLE CLASS",
    popular: true,
    features: [
      "Free riding equipment",
      "Unlimited gym access",
      "Dedicated personal coach",
      "Custom nutrition plan",
      "Locker room & Sauna pass",
      "Free guest pass monthly"
    ]
  },
  {
    id: "plan_6month",
    title: "6 Month unlimited",
    price: "59.0",
    period: "SINGLE CLASS",
    popular: false,
    features: [
      "Free riding equipment",
      "Unlimited gym access",
      "Personal trainer guide",
      "Weight loss program",
      "Month-to-month flexibility"
    ]
  }
];

const GYMLIFE_TRAINERS = [
  {
    name: "Rachel Hunter",
    role: "GYM Trainer",
    specialty: "Powerlifting & Barbell Strength",
    experience: "8+ Years"
  },
  {
    name: "Alex Rivera",
    role: "Head Coach",
    specialty: "Hypertrophy & Physique Architecture",
    experience: "12+ Years"
  },
  {
    name: "Marcus Cole",
    role: "Cardio Specialist",
    specialty: "HIIT, Sprinting & Functional Conditioning",
    experience: "7+ Years"
  },
  {
    name: "Elena Rostova",
    role: "Mobility Master",
    specialty: "Athletic Yoga & Physical Recovery",
    experience: "10+ Years"
  }
];

const GYMLIFE_CONTACT_INFO = {
  address: "333 Middle Winchendon Rd, Rindge, NH 03461",
  phone: "125-711-811 / 125-668-886",
  email: "Support.gymlife@gmail.com",
  hours: "Mon - Fri: 6:00am - 10:00pm | Sat - Sun: 7:00am - 9:00pm"
};

const MUSCLE_GROUPS = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Cardio",
  "Full Body"
];

const EQUIPMENT_TYPES = [
  "All",
  "Barbell",
  "Dumbbell",
  "Bodyweight",
  "Cable",
  "Machine",
  "Kettlebell"
];

const DIFFICULTY_LEVELS = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced"
];
