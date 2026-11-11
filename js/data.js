/**
 * Dynamic Exercise Database, Routines, and GymLife Fitness Data
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
      "Lower your chest until it hovers an inch above the floor.",
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

  // --- LEGS ---
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

  // --- ARMS ---
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

  // --- CORE & CARDIO ---
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
      "Brace core and raise legs straight in front of you.",
      "Raise until legs are at least parallel to floor, rounding pelvis up slightly.",
      "Lower legs slowly without swinging into the next rep."
    ],
    tips: "Focus on curling your pelvis upward, not just lifting your thigh muscles."
  },
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
