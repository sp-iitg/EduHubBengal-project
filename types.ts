export interface MaterialItem {
  id: string;
  title: string;
  subject: "Physics" | "Chemistry" | "Mathematics";
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Complete JEE";
  level: "JEE Mains" | "JEE Advanced" | "Foundation";
  duration: string;
  faculty: string;
  topics: string[];
  description: string;
  curriculumHighlight: string;
  enrolledStudentsCount: number;
  totalSeats: number;
}

export type AppView = "home" | "courses" | "materials" | "admin";
export type SubjectFilter = "All" | "Physics" | "Chemistry" | "Mathematics";
