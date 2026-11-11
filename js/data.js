/**
 * Dynamic Exercise Database and Default Routines
 * Completely data-driven: no hardcoded markup in HTML!
 */

const DEFAULT_EXERCISES = [
  // --- CHEST ---
  {
    id: "ex_bench_press",
    name: "Barbell Bench Press",
    muscleGroup: "Chest",
    secondaryMuscles: ["Triceps", "Front Delts"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    category: "Strength",
    caloriesPerMin: 7.5,
    defaultSets: 4,
    defaultReps: 8,
    restSeconds: 90,
    instructions: [
      "Lie flat on the bench with eyes directly under the bar.",
      "Grip the bar slightly wider than shoulder-width with wrists straight.",
      "Unrack the bar and stabilize it directly over your chest with arms locked.",
      "Lower the bar under control until it gently touches your mid-chest.",
      "Press the bar explosively back up to the starting position, exhaling on the way up."
    ],
    tips: "Keep your feet planted flat, retract your scapula (shoulder blades pinched), and do not bounce the bar off your sternum."
  },
  {
    id: "ex_incline_db_press",
    name: "Incline Dumbbell Press",
    muscleGroup: "Chest",
    secondaryMuscles: ["Front Delts", "Triceps"],
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    category: "Hypertrophy",
    caloriesPerMin: 6.8,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 75,
    instructions: [
      "Set an adjustable bench to a 30-45 degree angle.",
      "Sit with dumbbells resting on your thighs, then kick them up to shoulder level as you lie back.",
      "Rotate wrists so palms face forward and elbows are at roughly 45 degrees to your torso.",
      "Press dumbbells upward until arms are extended, keeping tension on the upper chest.",
      "Lower smoothly until you feel a deep stretch in the upper pectorals."
    ],
    tips: "Avoid excessive arching in your lower back. Maintain a steady 2-second eccentric lowering phase."
  },
  {
    id: "ex_pushups",
    name: "Standard Push-Ups",
    muscleGroup: "Chest",
    secondaryMuscles: ["Core", "Triceps", "Front Delts"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    category: "Endurance",
    caloriesPerMin: 6.0,
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 60,
    instructions: [
      "Place hands on the floor slightly wider than shoulder-width.",
      "Extend legs back so your body forms a straight line from crown of head to heels.",
      "Engage your core and squeeze glutes to prevent hip sagging.",
      "Lower your chest until it hover an inch above the floor.",
      "Push forcefully through the palms to return to top plank position."
    ],
    tips: "Keep your neck neutral and elbows tracking at a 45-degree angle, not flared out 90 degrees."
  },
  {
    id: "ex_cable_fly",
    name: "Cable Chest Fly",
    muscleGroup: "Chest",
    secondaryMuscles: ["Front Delts"],
    equipment: "Cable",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.5,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Position pulleys at chest height with single handles attached.",
      "Step forward into a staggered stance with arms extended wide and slight elbow bend.",
      "Bring hands together in a hugging motion across the front of your chest.",
      "Squeeze your chest muscles hard at the peak contraction for 1 second.",
      "Slowly reverse the movement until you feel a comfortable stretch across the pectorals."
    ],
    tips: "Focus on bringing your inner elbows together rather than just your hands."
  },
  {
    id: "ex_chest_dips",
    name: "Chest Dips",
    muscleGroup: "Chest",
    secondaryMuscles: ["Triceps", "Front Delts"],
    equipment: "Bodyweight",
    difficulty: "Advanced",
    category: "Strength",
    caloriesPerMin: 8.0,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 90,
    instructions: [
      "Grasp parallel dip bars and hoist yourself up to straight-arm support.",
      "Lean your torso forward roughly 20-30 degrees and bend knees slightly.",
      "Lower your body by bending elbows until upper arms are parallel to the floor.",
      "Push smoothly through your chest and triceps to return to the starting position."
    ],
    tips: "Leaning forward shifts focus to the lower chest; an upright torso emphasizes triceps."
  },

  // --- BACK ---
  {
    id: "ex_pullups",
    name: "Pull-Ups",
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Forearms", "Core"],
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    category: "Strength",
    caloriesPerMin: 8.5,
    defaultSets: 4,
    defaultReps: 8,
    restSeconds: 90,
    instructions: [
      "Grip an overhead pull-up bar with an overhand grip wider than shoulders.",
      "Hang with arms fully extended and engage your lats by depressing shoulders.",
      "Pull yourself up by driving your elbows down towards your hips.",
      "Continue until your chin clears the bar.",
      "Lower your body under control back to a full dead hang stretch."
    ],
    tips: "Avoid kicking or swinging your legs (kipping). Keep your core tight throughout."
  },
  {
    id: "ex_barbell_deadlift",
    name: "Conventional Barbell Deadlift",
    muscleGroup: "Back",
    secondaryMuscles: ["Hamstrings", "Glutes", "Traps", "Forearms"],
    equipment: "Barbell",
    difficulty: "Advanced",
    category: "Strength",
    caloriesPerMin: 9.5,
    defaultSets: 4,
    defaultReps: 5,
    restSeconds: 120,
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot (about 1 inch from shins).",
      "Hinge at the hips, bend knees, and grip the bar just outside your legs.",
      "Pull chest up, flatten your back, pack your lats, and take the slack out of the bar.",
      "Drive through your heels and extend hips and knees simultaneously to stand tall.",
      "Lock out hips without hyperextending your spine, then reverse the hinge to lower the bar."
    ],
    tips: "Never let your lower back round. Keep the bar path as close to your shins and thighs as possible."
  },
  {
    id: "ex_bent_over_row",
    name: "Barbell Bent-Over Row",
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Rear Delts", "Lats"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    category: "Strength",
    caloriesPerMin: 7.5,
    defaultSets: 4,
    defaultReps: 8,
    restSeconds: 90,
    instructions: [
      "Stand holding a barbell with shoulder-width pronated grip.",
      "Hinge forward at the hips until your torso is approximately 45 degrees to the floor.",
      "Keep a slight bend in your knees and maintain a flat, neutral spine.",
      "Pull the barbell up toward your lower ribcage, driving elbows toward the ceiling.",
      "Pause for a brief squeeze, then lower the bar with control to full extension."
    ],
    tips: "Do not yank with momentum or stand up as you pull the bar up."
  },
  {
    id: "ex_lat_pulldown",
    name: "Lat Pulldown",
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Rear Delts"],
    equipment: "Cable",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 6.2,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Sit at lat pulldown machine and adjust thigh pads so your legs are securely locked.",
      "Grasp the wide bar with an overhand grip slightly wider than your shoulders.",
      "Lean back slightly (10-15 degrees) and look upward towards the cable.",
      "Pull the bar down toward upper chest by driving your elbows down and back.",
      "Control the bar back up until your lats are fully stretched."
    ],
    tips: "Think of your hands as hooks; focus on pulling with the elbows and back muscles."
  },
  {
    id: "ex_seated_cable_row",
    name: "Seated Cable Row",
    muscleGroup: "Back",
    secondaryMuscles: ["Biceps", "Rhomboids", "Middle Traps"],
    equipment: "Cable",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 6.0,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Sit on the bench with feet on footplates and slight knee bend.",
      "Reach forward to grab the V-handle attachment while keeping spine neutral.",
      "Sit tall with shoulders pulled down and chest proud.",
      "Pull the handle toward your navel, pinching shoulder blades together.",
      "Slowly extend your arms back to starting position without leaning forward excessively."
    ],
    tips: "Avoid rocking your torso back and forth to generate momentum."
  },

  // --- LEGS (QUADS, HAMSTRINGS, GLUTES, CALVES) ---
  {
    id: "ex_barbell_squat",
    name: "Barbell Back Squat",
    muscleGroup: "Legs",
    secondaryMuscles: ["Glutes", "Hamstrings", "Core"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    category: "Strength",
    caloriesPerMin: 8.8,
    defaultSets: 4,
    defaultReps: 6,
    restSeconds: 120,
    instructions: [
      "Set the barbell at upper-chest height on squat rack.",
      "Step under the bar, resting it across your upper traps; grip bar firmly.",
      "Unrack the bar and take two clean steps back; position feet slightly wider than shoulder-width with toes slightly pointed out.",
      "Inhale into your diaphragm, brace your core, and initiate by pushing hips back and knees out.",
      "Descend until thighs are at least parallel to the floor.",
      "Drive straight up through mid-foot to starting position while exhaling."
    ],
    tips: "Ensure knees track in the same direction as toes; keep chest elevated and spine neutral."
  },
  {
    id: "ex_bulgarian_split_squat",
    name: "Bulgarian Split Squat",
    muscleGroup: "Legs",
    secondaryMuscles: ["Glutes", "Quads", "Adductors"],
    equipment: "Dumbbell",
    difficulty: "Advanced",
    category: "Hypertrophy",
    caloriesPerMin: 7.8,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 75,
    instructions: [
      "Stand about two feet in front of a flat bench holding dumbbells at your sides.",
      "Place top of one foot rearward onto the bench surface.",
      "Lower your rear knee toward the floor by bending both legs.",
      "Descend until front thigh is nearly parallel to floor.",
      "Drive through the front heel to rise back to starting position."
    ],
    tips: "Maintain an upright torso to hit quads, or lean slightly forward at 15 degrees to hit more glutes."
  },
  {
    id: "ex_leg_press",
    name: "45° Leg Press",
    muscleGroup: "Legs",
    secondaryMuscles: ["Glutes", "Hamstrings"],
    equipment: "Machine",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 7.0,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 90,
    instructions: [
      "Sit back firmly in the leg press seat with lower back pinned against pad.",
      "Place feet shoulder-width apart in the center of the sled platform.",
      "Release safety pins and lower the weight until knees reach approximately 90 degrees.",
      "Press through full foot back to starting position, stopping just short of locking knees."
    ],
    tips: "Do not allow lower back or tailbone to lift or roll off the seat pad at bottom depth."
  },
  {
    id: "ex_romanian_deadlift",
    name: "Romanian Deadlift (RDL)",
    muscleGroup: "Legs",
    secondaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    category: "Hypertrophy",
    caloriesPerMin: 7.2,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 90,
    instructions: [
      "Hold barbell at hip height with shoulder-width overhand grip.",
      "Unlock your knees with a soft 10-degree bend (keep knees fixed at this angle).",
      "Hinge at hips, pushing your butt back as far as possible while sliding bar down thighs.",
      "Stop when you feel a deep stretch in hamstrings (typically just below knees).",
      "Drive hips forward and contract glutes to return to standing upright."
    ],
    tips: "The movement is a pure hip hinge, not a squat. Keep bar glued to your legs."
  },
  {
    id: "ex_leg_extension",
    name: "Leg Extension",
    muscleGroup: "Legs",
    secondaryMuscles: ["Quads"],
    equipment: "Machine",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.5,
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 60,
    instructions: [
      "Adjust machine backrest so knees align perfectly with machine's pivot axis.",
      "Position padded roller against lower shins just above ankles.",
      "Grip handles firmly and extend legs until straight, squeezing quads hard at the top.",
      "Slowly lower the weight back down over 2-3 seconds."
    ],
    tips: "Do not swing the weight; maintain controlled tempo throughout."
  },
  {
    id: "ex_standing_calf_raise",
    name: "Standing Calf Raise",
    muscleGroup: "Legs",
    secondaryMuscles: ["Calves", "Soleus"],
    equipment: "Machine",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.0,
    defaultSets: 4,
    defaultReps: 15,
    restSeconds: 45,
    instructions: [
      "Place balls of feet on platform edge with heels hanging off freely.",
      "Rest padded levers comfortably on shoulders and straighten knees.",
      "Lower heels down as far as possible for a full deep calf stretch.",
      "Push up onto the tips of your toes as high as possible and pause for 1 second.",
      "Slowly lower back to full stretch."
    ],
    tips: "Avoid bouncing at bottom; pause 1-2 seconds in full stretch for maximum muscle activation."
  },

  // --- SHOULDERS ---
  {
    id: "ex_overhead_press",
    name: "Standing Overhead Barbell Press (OHP)",
    muscleGroup: "Shoulders",
    secondaryMuscles: ["Triceps", "Upper Chest", "Core"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    category: "Strength",
    caloriesPerMin: 7.6,
    defaultSets: 4,
    defaultReps: 6,
    restSeconds: 90,
    instructions: [
      "Stand tall holding barbell across front collarbone with overhand grip just outside shoulders.",
      "Brace glutes and abs tight, creating a solid base.",
      "Press the bar vertically upwards, moving head slightly backward to clear chin.",
      "Once bar clears head, move head back forward and lock out arms overhead.",
      "Lower smoothly back to collarbone position."
    ],
    tips: "Do not hyperextend your lower back. Squeeze glutes firmly throughout."
  },
  {
    id: "ex_lateral_raise",
    name: "Dumbbell Lateral Raise",
    muscleGroup: "Shoulders",
    secondaryMuscles: ["Side Delts"],
    equipment: "Dumbbell",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.2,
    defaultSets: 4,
    defaultReps: 15,
    restSeconds: 60,
    instructions: [
      "Stand holding dumbbells by your sides with a slight forward torso tilt.",
      "Maintain a soft bend in elbows.",
      "Raise dumbbells out to the sides in the scapular plane (slightly forward from direct sideways).",
      "Stop when arms reach shoulder height (parallel to floor).",
      "Lower dumbbells smoothly under 2-second control."
    ],
    tips: "Lead with your elbows, not hands. Avoid swinging torso or using trap momentum."
  },
  {
    id: "ex_face_pull",
    name: "Cable Face Pull",
    muscleGroup: "Shoulders",
    secondaryMuscles: ["Rear Delts", "Rotator Cuff", "Rhomboids"],
    equipment: "Cable",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.4,
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 60,
    instructions: [
      "Attach rope accessory to a cable set at upper chest or eye level.",
      "Grip rope with thumbs pointing backward or palms facing in.",
      "Step back into a balanced stance with arms extended.",
      "Pull rope straight toward bridge of nose or forehead, flaring elbows out wide.",
      "Rotate wrists back at end to achieve external shoulder rotation.",
      "Hold squeeze for 1 second, then control back to start."
    ],
    tips: "Crucial exercise for shoulder health and posture balance against heavy pressing."
  },
  {
    id: "ex_arnold_press",
    name: "Arnold Dumbbell Press",
    muscleGroup: "Shoulders",
    secondaryMuscles: ["Front Delts", "Side Delts", "Triceps"],
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    category: "Hypertrophy",
    caloriesPerMin: 6.5,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 75,
    instructions: [
      "Sit on an upright bench holding dumbbells at chest height, palms facing your body.",
      "As you press overhead, rotate wrists smoothly so palms face forward at top.",
      "Lock out gently overhead without banging weights.",
      "Reverse the rotation seamlessly as you lower dumbbells back to starting position."
    ],
    tips: "Smooth and continuous rotation ensures constant front and lateral delt recruitment."
  },

  // --- ARMS (BICEPS, TRICEPS, FOREARMS) ---
  {
    id: "ex_barbell_curl",
    name: "Standing Barbell Bicep Curl",
    muscleGroup: "Arms",
    secondaryMuscles: ["Biceps", "Forearms"],
    equipment: "Barbell",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.8,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 60,
    instructions: [
      "Stand upright holding a barbell with underhand shoulder-width grip.",
      "Pin elbows close to sides of your torso.",
      "Curl the bar upward by contracting biceps while keeping upper arms motionless.",
      "Squeeze biceps hard at chest level peak contraction.",
      "Lower bar slowly until arms are fully straightened."
    ],
    tips: "Do not swing your torso or sway backward to heave the weight."
  },
  {
    id: "ex_tricep_rope_pushdown",
    name: "Cable Tricep Rope Pushdown",
    muscleGroup: "Arms",
    secondaryMuscles: ["Triceps"],
    equipment: "Cable",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.5,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Attach rope attachment to high cable pulley.",
      "Grasp rope ends with neutral grip, tuck elbows tight against ribcage.",
      "Push rope straight down until arms are locked out.",
      "Spread rope ends apart outward at bottom to maximize lateral tricep head contraction.",
      "Slowly allow hands to rise back to 90 degrees elbow bend."
    ],
    tips: "Keep elbows glued in place like door hinges; don't let them drift forward or back."
  },
  {
    id: "ex_hammer_curl",
    name: "Dumbbell Hammer Curl",
    muscleGroup: "Arms",
    secondaryMuscles: ["Brachialis", "Forearms", "Biceps"],
    equipment: "Dumbbell",
    difficulty: "Beginner",
    category: "Hypertrophy",
    caloriesPerMin: 5.4,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Stand holding dumbbells at your sides with neutral grip (palms facing inward).",
      "Keep upper arms still and curl weights upward towards shoulders.",
      "Hold peak squeeze for a brief count.",
      "Lower dumbbells with control back to starting position."
    ],
    tips: "Builds the brachialis muscle beneath the bicep, pushing the peak up higher and widening arms."
  },
  {
    id: "ex_skullcrushers",
    name: "EZ-Bar Skull Crushers (Lying Triceps Extension)",
    muscleGroup: "Arms",
    secondaryMuscles: ["Triceps Long Head"],
    equipment: "Barbell",
    difficulty: "Intermediate",
    category: "Hypertrophy",
    caloriesPerMin: 6.0,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 75,
    instructions: [
      "Lie on flat bench holding an EZ-curl bar directly above chest with narrow overhand grip.",
      "Angle upper arms slightly back toward your head (not straight up).",
      "Bending only at elbows, lower bar slowly until it hovers just above your forehead or crown.",
      "Extend elbows to press weight back up to starting position."
    ],
    tips: "Keep elbows pointed forward rather than flared out wide to spare the elbow joints."
  },

  // --- CORE & ABS ---
  {
    id: "ex_hanging_leg_raise",
    name: "Hanging Leg / Knee Raise",
    muscleGroup: "Core",
    secondaryMuscles: ["Hip Flexors", "Lower Abs"],
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    category: "Strength",
    caloriesPerMin: 6.8,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Hang from a pull-up bar with overhand grip and engaged shoulders.",
      "Brace core and raise legs straight in front of you (or bend knees for an easier variation).",
      "Raise until legs are at least parallel to floor, rounding pelvis up slightly.",
      "Lower legs slowly without swinging into the next rep."
    ],
    tips: "Focus on curling your pelvis upward, not just lifting your thigh muscles."
  },
  {
    id: "ex_plank",
    name: "Front Forearm Plank",
    muscleGroup: "Core",
    secondaryMuscles: ["Glutes", "Shoulders", "Transverse Abdominis"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    category: "Endurance",
    caloriesPerMin: 5.0,
    defaultSets: 3,
    defaultReps: 45, // Seconds
    restSeconds: 45,
    instructions: [
      "Place forearms on floor with elbows directly under shoulders.",
      "Extend legs back on toes, body forming a rigid straight plank line.",
      "Tuck pelvis slightly, squeeze glutes, and draw navel toward spine.",
      "Hold position while breathing steadily without letting hips sag or pike."
    ],
    tips: "Quality of tension beats duration. Squeeze every muscle as if bracing for a punch."
  },
  {
    id: "ex_cable_woodchopper",
    name: "Cable Woodchopper",
    muscleGroup: "Core",
    secondaryMuscles: ["Obliques", "Shoulders"],
    equipment: "Cable",
    difficulty: "Intermediate",
    category: "Functional",
    caloriesPerMin: 6.5,
    defaultSets: 3,
    defaultReps: 12,
    restSeconds: 60,
    instructions: [
      "Set cable pulley at shoulder or high level with single handle.",
      "Stand sideways to machine with feet shoulder-width apart, gripping handle with both hands.",
      "Rotate torso diagonally across body and downward toward opposite hip.",
      "Pivot back foot slightly and engage obliques throughout rotational drive.",
      "Control the weight back to start with controlled tempo."
    ],
    tips: "Power should come from rotational hips and core torso, not pulling with arms alone."
  },

  // --- CARDIO & FULL BODY ---
  {
    id: "ex_burpees",
    name: "Full Burpees",
    muscleGroup: "Cardio",
    secondaryMuscles: ["Full Body", "Chest", "Quads"],
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    category: "Endurance",
    caloriesPerMin: 12.0,
    defaultSets: 3,
    defaultReps: 15,
    restSeconds: 60,
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Drop into a squat, place hands on floor, and kick feet back into a pushup plank.",
      "Perform a full pushup with chest touching the ground.",
      "Jump feet back toward hands, landing in a squat.",
      "Explode vertically into the air with hands reaching overhead."
    ],
    tips: "Pace yourself with steady rhythmic breathing. Land softly on the balls of your feet."
  },
  {
    id: "ex_kettlebell_swing",
    name: "Russian Kettlebell Swing",
    muscleGroup: "Full Body",
    secondaryMuscles: ["Glutes", "Hamstrings", "Back", "Shoulders"],
    equipment: "Kettlebell",
    difficulty: "Intermediate",
    category: "Functional",
    caloriesPerMin: 11.5,
    defaultSets: 4,
    defaultReps: 15,
    restSeconds: 60,
    instructions: [
      "Stand with feet shoulder-width, kettlebell one foot in front of you.",
      "Hinge at hips, reach forward, and tilt kettlebell towards you with overhand grip.",
      "Hike kettlebell back between legs like a football center hike.",
      "Snap hips forward forcefully and contract glutes to float kettlebell to chest height.",
      "Let kettlebell free fall as you hinge back to absorb the bell into next rep."
    ],
    tips: "This is a hip hinge power movement, never a front delt shoulder raise or squat."
  },
  {
    id: "ex_mountain_climbers",
    name: "Mountain Climbers",
    muscleGroup: "Cardio",
    secondaryMuscles: ["Core", "Shoulders", "Hip Flexors"],
    equipment: "Bodyweight",
    difficulty: "Beginner",
    category: "Endurance",
    caloriesPerMin: 10.0,
    defaultSets: 3,
    defaultReps: 30, // Reps or seconds
    restSeconds: 45,
    instructions: [
      "Start in a high plank position with hands under shoulders.",
      "Drive right knee towards your chest without raising hips.",
      "Quickly step right foot back while simultaneously driving left knee forward.",
      "Alternate knees rapidly in a fluid running motion while keeping core tight."
    ],
    tips: "Do not bounce your hips up and down; keep your back flat and stable."
  },
  {
    id: "ex_box_jumps",
    name: "Plyometric Box Jumps",
    muscleGroup: "Full Body",
    secondaryMuscles: ["Quads", "Glutes", "Calves"],
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    category: "Power",
    caloriesPerMin: 9.0,
    defaultSets: 3,
    defaultReps: 10,
    restSeconds: 75,
    instructions: [
      "Stand about one foot away from a sturdy plyometric box.",
      "Bend knees and swing arms back to load your hips in an athletic quarter squat.",
      "Explode upward through legs and swing arms forward.",
      "Land softly on the box with knees bent to absorb impact.",
      "Stand fully upright, then step down carefully one foot at a time."
    ],
    tips: "Step down rather than jumping down to protect Achilles tendons and knees."
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
      "ex_face_pull",
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
      "ex_leg_extension",
      "ex_standing_calf_raise"
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
      "ex_mountain_climbers",
      "ex_plank"
    ]
  },
  {
    id: "routine_home_dumbbell",
    title: "At-Home Dumbbell Sculpt",
    category: "Home",
    durationMinutes: 35,
    difficulty: "Beginner",
    description: "No gym required! A balanced full body sculpting routine using only a pair of dumbbells.",
    targetMuscle: "Shoulders, Chest, Legs, Arms",
    exerciseIds: [
      "ex_incline_db_press",
      "ex_lateral_raise",
      "ex_arnold_press",
      "ex_hammer_curl",
      "ex_bulgarian_split_squat"
    ]
  },
  {
    id: "routine_core_shred",
    title: "Core & Abs Crusher",
    category: "Core",
    durationMinutes: 20,
    difficulty: "Beginner",
    description: "Target rectus abdominis, obliques, and deep transverse stabilizers for rotational power and core stability.",
    targetMuscle: "Core, Obliques, Lower Back",
    exerciseIds: [
      "ex_hanging_leg_raise",
      "ex_cable_woodchopper",
      "ex_plank",
      "ex_mountain_climbers"
    ]
  }
];

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
