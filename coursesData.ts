import { Course } from "./types";

export const SAMPLE_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Chanakya Advanced Physics",
    subtitle: "Rigor & Insights in Classical & Modern Physics",
    subject: "Physics",
    level: "JEE Advanced",
    duration: "6 Months • 120 Sessions",
    faculty: "Prof. S. Mukherjee (Ex-IIT Kharagpur)",
    topics: [
      "Rotational Mechanics & Classical Torque Methods",
      "Maxwell's Electrostatics & Integral Gauging",
      "Modern Quantum Physics & Photoelectric Dynamics",
      "Advanced Thermodynamics & Phase Transitions"
    ],
    description: "Designed strictly for candidates aspiring for top 500 ranks. Focuses on intuitive concept derivations, intricate multi-concept problems, and mathematical problem-solving methods using calculus modeling.",
    curriculumHighlight: "Includes weekly rigorous problem-sheets from Irodov, Krotov, and Pathfinder.",
    enrolledStudentsCount: 34,
    totalSeats: 40
  },
  {
    id: "course-2",
    title: "Acharya Organic & Physical Mastery",
    subtitle: "Reaction Mechanisms, Kinetics & Equilibrium",
    subject: "Chemistry",
    level: "JEE Advanced",
    duration: "5 Months • 100 Sessions",
    faculty: "Dr. A. Banik (Ex-Jadavpur University)",
    topics: [
      "Stereochemistry & Nucleophilic Substitutions",
      "Ionic Equilibrium & Thermodynamic Potentials",
      "Coordination Compounds & Crystal Field Theory",
      "Spectroscopy & Structure Elucidation Techniques"
    ],
    description: "Navigate Chemistry logically rather than by rote memorization. Master named organic mechanisms step-by-step and unpack the physical thermodynamics that govern real molecular dynamics.",
    curriculumHighlight: "Dedicated lab-video discussions and full-length mechanism worksheets.",
    enrolledStudentsCount: 41,
    totalSeats: 50
  },
  {
    id: "course-3",
    title: "Ramanujan Analytical Mathematics",
    subtitle: "From Fundamentals to Beautiful Calculus & Algebra",
    subject: "Mathematics",
    level: "JEE Advanced",
    duration: "6 Months • 140 Sessions",
    faculty: "Acharya T. Sen (Math Olympiad Mentor)",
    topics: [
      "Integral Calculus & Area Partition Under Curves",
      "Vectors, 3D Geometry & Coordinate Projections",
      "Complex Numbers & De Moivre's Complex Transformations",
      "Permutations, Combinatorics & Binomial Limits"
    ],
    description: "An intensive calculus-driven series highlighting mathematical symmetry, rigorous proofs, and high-speed algebraic simplifications built specifically for the JEE Advanced format.",
    curriculumHighlight: "Access to private mental math vaults and past olympiad challenge solutions.",
    enrolledStudentsCount: 28,
    totalSeats: 35
  },
  {
    id: "course-4",
    title: "Shikhar Integrated Comprehensive Batch",
    subtitle: "Complete Course for Class 12 & Dropper Candidates",
    subject: "Complete JEE",
    level: "JEE Mains",
    duration: "10 Months • 360 Sessions",
    faculty: "EduHub Master Core Panel",
    topics: [
      "Comprehensive Physics (Mechanics to Modern)",
      "General, Inorganic, Organic & Physical Chemistry",
      "Calculus, Vector Algebra & Trigonometric Planes",
      "WBJEE & JEE Main Strategy & Test Simulation"
    ],
    description: "A comprehensive core syllabus program designed to build strong foundations, enhance confidence, and guide students from West Bengal toward state and national premier centers.",
    curriculumHighlight: "Includes full simulation testing suite & 1-on-1 personalized analytical reports.",
    enrolledStudentsCount: 112,
    totalSeats: 150
  }
];
