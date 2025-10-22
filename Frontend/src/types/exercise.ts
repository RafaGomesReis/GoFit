export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  gifUrl?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description?: string;
}

export interface ExerciseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MuscleGroup {
  id: string;
  name: string;
  exercises: string[];
}
