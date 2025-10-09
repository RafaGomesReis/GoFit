export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  goals: string[];
  createdAt: Date;
  lastWorkout?: Date;
  workoutStreak: number;
  totalWorkouts: number;
}

export interface UserStats {
  totalWorkouts: number;
  totalWorkoutTime: number;
  currentStreak: number;
  longestStreak: number;
  favoriteExercises: string[];
  averageWorkoutDuration: number;
  weightProgress: WeightProgress[];
}

export interface WeightProgress {
  date: Date;
  weight: number;
  notes?: string;
}

export interface UserSettings {
  notifications: boolean;
  workoutReminders: boolean;
  restTimeReminders: boolean;
  theme: 'light' | 'dark';
  units: 'metric' | 'imperial';
  language: string;
}
