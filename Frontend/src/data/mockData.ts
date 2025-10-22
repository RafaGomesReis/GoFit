import { Exercise, Workout, User, UserStats } from '../types';

export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Flexão de Braço',
    category: 'Peito',
    muscleGroups: ['Peito', 'Tríceps', 'Ombros'],
    equipment: ['Nenhum'],
    instructions: [
      'Deite-se de bruços no chão',
      'Posicione as mãos na largura dos ombros',
      'Mantenha o corpo reto',
      'Desça o corpo até quase tocar o chão',
      'Empurre para cima até a posição inicial'
    ],
    gifUrl: 'https://i.pinimg.com/originals/18/27/be/1827be178c019b1dc6f8a8d211191f80.gif',
    difficulty: 'Beginner',
    description: 'Exercício clássico para desenvolvimento do peito e braços',
  },
  {
    id: '2',
    name: 'Agachamento',
    category: 'Pernas',
    muscleGroups: ['Quadríceps', 'Glúteos', 'Panturrilhas'],
    equipment: ['Nenhum'],
    instructions: [
      'Fique em pé com os pés na largura dos ombros',
      'Mantenha as costas retas',
      'Desça como se fosse sentar em uma cadeira',
      'Vá até onde conseguir manter o equilíbrio',
      'Suba de volta à posição inicial'
    ],
    gifUrl: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/03/bodyweight-squat.gif',
    difficulty: 'Beginner',
    description: 'Exercício fundamental para fortalecimento das pernas',
  },
  {
    id: '3',
    name: 'Prancha',
    category: 'Core',
    muscleGroups: ['Abdômen', 'Ombros', 'Costas'],
    equipment: ['Nenhum'],
    instructions: [
      'Deite-se de bruços no chão',
      'Apoie-se nos antebraços e pontas dos pés',
      'Mantenha o corpo reto como uma prancha',
      'Contraia o abdômen',
      'Mantenha a posição pelo tempo determinado'
    ],
    gifUrl: 'https://thumbs.gfycat.com/UniformUnsteadyBlackwidowspider-size_restricted.gif',
    difficulty: 'Beginner',
    description: 'Excelente para fortalecimento do core',
  },
  {
    id: '4',
    name: 'Supino Reto',
    category: 'Peito',
    muscleGroups: ['Peito', 'Tríceps', 'Ombros'],
    equipment: ['Barra', 'Banco'],
    instructions: [
      'Deite-se no banco com a barra acima do peito',
      'Segure a barra com as mãos na largura dos ombros',
      'Desça a barra até tocar levemente o peito',
      'Empurre a barra para cima até a posição inicial',
      'Mantenha o controle durante todo o movimento'
    ],
    gifUrl: 'https://www.hipertrofia.org/blog/wp-content/uploads/2023/07/barbell-lying-closegrip-press.gif',
    difficulty: 'Intermediate',
    description: 'Exercício clássico para desenvolvimento do peito',
  },
  {
    id: '5',
    name: 'Rosca Direta',
    category: 'Braços',
    muscleGroups: ['Bíceps'],
    equipment: ['Halteres'],
    instructions: [
      'Fique em pé segurando halteres nas mãos',
      'Mantenha os cotovelos próximos ao corpo',
      'Flexione os braços levando os halteres aos ombros',
      'Desça controladamente à posição inicial',
      'Mantenha o controle durante todo o movimento'
    ],
    gifUrl: 'https://newlife.com.cy/wp-content/uploads/2019/11/00181301-Barbell-Curl_Upper-Arms_360.gif',
    difficulty: 'Beginner',
    description: 'Exercício isolado para desenvolvimento dos bíceps',
  },
];

export const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Treino de Costas',
    description: 'Treino básico para quem está começando',
    exercises: [
      {
        id: '1-1',
        exercise: mockExercises[0], // Flexão de Braço
        sets: 3,
        reps: 10,
        restTime: 60,
        completed: false,
      },
      {
        id: '1-2',
        exercise: mockExercises[1], // Agachamento
        sets: 3,
        reps: 15,
        restTime: 60,
        completed: false,
      },
      {
        id: '1-3',
        exercise: mockExercises[2], // Prancha
        sets: 3,
        reps: 30, // segundos
        restTime: 60,
        completed: false,
      },
    ],
    duration: 30,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    difficulty: 'Beginner',
    category: 'Full Body',
  },
  {
    id: '2',
    name: 'Treino de Peito',
    description: 'Foco no desenvolvimento do peitoral',
    exercises: [
      {
        id: '2-1',
        exercise: mockExercises[3], // Supino Reto
        sets: 4,
        reps: 8,
        weight: 60,
        restTime: 90,
        completed: false,
      },
      {
        id: '2-2',
        exercise: mockExercises[0], // Flexão de Braço
        sets: 3,
        reps: 12,
        restTime: 60,
        completed: false,
      },
    ],
    duration: 45,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    difficulty: 'Intermediate',
    category: 'Peito',
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Usuário GoFit',
  email: 'usuario@gofit.com',
  fitnessLevel: 'Beginner',
  goals: ['Ganhar massa muscular', 'Melhorar condicionamento'],
  createdAt: new Date('2024-01-01'),
  lastWorkout: new Date('2024-01-15'),
  workoutStreak: 5,
  totalWorkouts: 12,
};

export const mockUserStats: UserStats = {
  totalWorkouts: 12,
  totalWorkoutTime: 480, // 8 horas
  currentStreak: 5,
  longestStreak: 8,
  favoriteExercises: ['Flexão de Braço', 'Agachamento', 'Prancha'],
  averageWorkoutDuration: 40,
  weightProgress: [
    { date: new Date('2024-01-01'), weight: 70 },
    { date: new Date('2024-01-15'), weight: 71 },
  ],
};
