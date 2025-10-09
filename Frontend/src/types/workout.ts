import { Exercise } from './exercise';

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number; // em segundos
  completed: boolean;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startedAt: Date;
  completedAt?: Date;
  exercises: ExerciseSession[];
  totalDuration?: number;
  notes?: string;
}

export interface ExerciseSession {
  exerciseId: string;
  sets: SetSession[];
  completed: boolean;
}

export interface SetSession {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
  restTime?: number;
}

// Re-export Exercise type
export type { Exercise } from './exercise';
