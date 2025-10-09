import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Exercise, 
  Workout, 
  User, 
  WorkoutSession, 
  UserStats,
  LoadingState 
} from '../types';

// Estado da aplicação
interface AppState {
  user: User | null;
  exercises: Exercise[];
  workouts: Workout[];
  currentWorkout: WorkoutSession | null;
  userStats: UserStats | null;
  loading: LoadingState;
}

// Ações disponíveis
type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_EXERCISES'; payload: Exercise[] }
  | { type: 'ADD_EXERCISE'; payload: Exercise }
  | { type: 'SET_WORKOUTS'; payload: Workout[] }
  | { type: 'ADD_WORKOUT'; payload: Workout }
  | { type: 'UPDATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: string }
  | { type: 'SET_CURRENT_WORKOUT'; payload: WorkoutSession | null }
  | { type: 'SET_USER_STATS'; payload: UserStats }
  | { type: 'SET_LOADING'; payload: LoadingState }
  | { type: 'LOGOUT' };

// Estado inicial
const initialState: AppState = {
  user: null,
  exercises: [],
  workouts: [],
  currentWorkout: null,
  userStats: null,
  loading: { isLoading: false },
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_EXERCISES':
      return { ...state, exercises: action.payload };
    
    case 'ADD_EXERCISE':
      return { ...state, exercises: [...state.exercises, action.payload] };
    
    case 'SET_WORKOUTS':
      return { ...state, workouts: action.payload };
    
    case 'ADD_WORKOUT':
      return { ...state, workouts: [...state.workouts, action.payload] };
    
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map(workout =>
          workout.id === action.payload.id ? action.payload : workout
        ),
      };
    
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout.id !== action.payload),
      };
    
    case 'SET_CURRENT_WORKOUT':
      return { ...state, currentWorkout: action.payload };
    
    case 'SET_USER_STATS':
      return { ...state, userStats: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'LOGOUT':
      return {
        ...initialState,
        loading: { isLoading: false },
      };
    
    default:
      return state;
  }
};

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Funções auxiliares
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  clearStorage: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Salvar dados no AsyncStorage
  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('gofit_user', JSON.stringify(state.user));
      await AsyncStorage.setItem('gofit_workouts', JSON.stringify(state.workouts));
      await AsyncStorage.setItem('gofit_exercises', JSON.stringify(state.exercises));
      await AsyncStorage.setItem('gofit_userStats', JSON.stringify(state.userStats));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Carregar dados do AsyncStorage
  const loadFromStorage = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { isLoading: true } });
      
      const [userData, workoutsData, exercisesData, statsData] = await Promise.all([
        AsyncStorage.getItem('gofit_user'),
        AsyncStorage.getItem('gofit_workouts'),
        AsyncStorage.getItem('gofit_exercises'),
        AsyncStorage.getItem('gofit_userStats'),
      ]);

      if (userData) {
        dispatch({ type: 'SET_USER', payload: JSON.parse(userData) });
      }
      
      if (workoutsData) {
        dispatch({ type: 'SET_WORKOUTS', payload: JSON.parse(workoutsData) });
      }
      
      if (exercisesData) {
        dispatch({ type: 'SET_EXERCISES', payload: JSON.parse(exercisesData) });
      }
      
      if (statsData) {
        dispatch({ type: 'SET_USER_STATS', payload: JSON.parse(statsData) });
      }
      
      dispatch({ type: 'SET_LOADING', payload: { isLoading: false } });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      dispatch({ type: 'SET_LOADING', payload: { isLoading: false, error: 'Erro ao carregar dados' } });
    }
  };

  // Limpar dados do AsyncStorage
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Salvar dados quando o estado mudar
  useEffect(() => {
    if (!state.loading.isLoading) {
      saveToStorage();
    }
  }, [state.user, state.workouts, state.exercises, state.userStats]);

  const value: AppContextType = {
    state,
    dispatch,
    saveToStorage,
    loadFromStorage,
    clearStorage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook para usar o context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
