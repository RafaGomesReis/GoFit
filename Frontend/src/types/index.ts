// Re-export all types
export type { Exercise, ExerciseCategory, MuscleGroup } from './exercise';
export type { 
  Workout, 
  WorkoutExercise, 
  WorkoutSession, 
  ExerciseSession, 
  SetSession 
} from './workout';
export type { 
  User, 
  UserStats, 
  WeightProgress, 
  UserSettings 
} from './user';

// Common types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}
