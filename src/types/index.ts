
export interface QuizOption {
  id: string; // e.g., 'A', 'B', 'C'
  text: string;
}

export interface QuizQuestion {
  id: string; // e.g., 'q1'
  text: string;
  options: QuizOption[];
  correctAnswerId: string; // The id of the correct QuizOption
}

export interface ClassItem {
  id: string;
  title: string; // Título de la lección
  subtitle?: string; // Subtítulo opcional de la lección
  content: string; // Contenido HTML de la lección
  estimatedTime: string; // e.g., "45 minutos de lectura y reflexión"
  imageUrl?: string;
  imageHint?: string;
}

export interface Period {
  id: string;
  title: string; // Título del módulo
  description: string; // Descripción del módulo
  classes: ClassItem[]; // Array de lecciones
}

export interface Grade {
  id: string;
  title: string; // Título del ciclo de estudio (e.g., "Introducción a la Filosofía")
  periods: Period[]; // Array de módulos
}

export interface CourseContent {
  grades: Grade[];
}

export interface UserProgress {
  completedClasses: Record<string, Record<string, string[]>>; // { [gradeId]: { [periodId]: classId[] } }
  completedPeriodQuizzes: Record<string, string[]>; // { [gradeId]: periodId[] }
}
