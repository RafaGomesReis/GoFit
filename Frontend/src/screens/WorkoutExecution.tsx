import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { WorkoutSession, SetSession } from '../types';

interface WorkoutExecutionProps {
  workoutId: string;
  onFinish: () => void;
  onCancel: () => void;
}

export default function WorkoutExecution({ 
  workoutId, 
  onFinish, 
  onCancel 
}: WorkoutExecutionProps) {
  const { state, dispatch } = useApp();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [sessionStartTime] = useState(new Date());

  const workout = state.workouts.find(w => w.id === workoutId);
  const currentWorkout = state.currentWorkout;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isResting && restTimeRemaining > 0) {
      timer = setTimeout(() => {
        setRestTimeRemaining(restTimeRemaining - 1);
      }, 1000);
    } else if (isResting && restTimeRemaining === 0) {
      setIsResting(false);
    }
    return () => clearTimeout(timer);
  }, [isResting, restTimeRemaining]);

  if (!workout || !currentWorkout) {
    return (
      <SafeAreaView style={styles.container}>
        <Card>
          <Text style={styles.errorText}>Treino não encontrado</Text>
          <Button title="Voltar" onPress={onCancel} />
        </Card>
      </SafeAreaView>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const progress = ((currentExerciseIndex + 1) / totalExercises) * 100;

  const handleCompleteSet = () => {
    if (currentSetIndex < currentExercise.sets - 1) {
      // Próxima série
      setCurrentSetIndex(currentSetIndex + 1);
      setIsResting(true);
      setRestTimeRemaining(currentExercise.restTime);
    } else if (currentExerciseIndex < totalExercises - 1) {
      // Próximo exercício
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
      setIsResting(true);
      setRestTimeRemaining(currentExercise.restTime);
    } else {
      // Treino completo
      handleFinishWorkout();
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimeRemaining(0);
  };

  const handleFinishWorkout = () => {
    const completedAt = new Date();
    const duration = Math.floor((completedAt.getTime() - sessionStartTime.getTime()) / 1000 / 60);

    const updatedSession: WorkoutSession = {
      ...currentWorkout,
      completedAt,
      totalDuration: duration,
    };

    dispatch({ type: 'SET_CURRENT_WORKOUT', payload: updatedSession });
    
    Alert.alert(
      'Parabéns! 🎉',
      `Treino completado em ${duration} minutos!`,
      [{ text: 'OK', onPress: onFinish }]
    );
  };

  const handleCancelWorkout = () => {
    Alert.alert(
      'Cancelar Treino?',
      'Tem certeza que deseja cancelar este treino? Todo o progresso será perdido.',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'SET_CURRENT_WORKOUT', payload: null });
            onCancel();
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{workout.name}</Text>
          <Text style={styles.subtitle}>
            Exercício {currentExerciseIndex + 1} de {totalExercises}
          </Text>
        </View>
        <TouchableOpacity onPress={handleCancelWorkout}>
          <Text style={styles.cancelText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {isResting ? (
          <Card>
            <View style={styles.restContainer}>
              <Text style={styles.restTitle}>Descanse</Text>
              <Text style={styles.restTimer}>{restTimeRemaining}s</Text>
              <Text style={styles.restText}>
                Prepare-se para a próxima série
              </Text>
              <Button
                title="Pular Descanso"
                onPress={handleSkipRest}
                variant="secondary"
                style={styles.skipButton}
              />
            </View>
          </Card>
        ) : (
          <Card>
            <View style={styles.exerciseContainer}>
              <Text style={styles.exerciseName}>
                {currentExercise.exercise.name}
              </Text>
              <Text style={styles.exerciseCategory}>
                {currentExercise.exercise.category}
              </Text>

              {/* GIF ou Imagem do Exercício */}
              {(currentExercise.exercise.gifUrl || currentExercise.exercise.imageUrl) && (
                <View style={styles.exerciseMediaContainer}>
                  <Image
                    source={{ uri: currentExercise.exercise.gifUrl || currentExercise.exercise.imageUrl }}
                    style={styles.exerciseGif}
                    resizeMode="contain"
                  />
                </View>
              )}

              <View style={styles.currentSetInfo}>
                <Text style={styles.setTitle}>
                  Série {currentSetIndex + 1} de {currentExercise.sets}
                </Text>
                <View style={styles.setDetails}>
                  <View style={styles.setDetail}>
                    <Text style={styles.setDetailLabel}>Repetições</Text>
                    <Text style={styles.setDetailValue}>
                      {currentExercise.reps}
                    </Text>
                  </View>
                  {currentExercise.weight && (
                    <View style={styles.setDetail}>
                      <Text style={styles.setDetailLabel}>Peso</Text>
                      <Text style={styles.setDetailValue}>
                        {currentExercise.weight} kg
                      </Text>
                    </View>
                  )}
                  <View style={styles.setDetail}>
                    <Text style={styles.setDetailLabel}>Descanso</Text>
                    <Text style={styles.setDetailValue}>
                      {currentExercise.restTime}s
                    </Text>
                  </View>
                </View>
              </View>

              {currentExercise.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesLabel}>Observações:</Text>
                  <Text style={styles.notesText}>{currentExercise.notes}</Text>
                </View>
              )}

              <View style={styles.setsProgress}>
                {Array.from({ length: currentExercise.sets }).map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.setIndicator,
                      index < currentSetIndex && styles.setIndicatorCompleted,
                      index === currentSetIndex && styles.setIndicatorCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        styles.setIndicatorText,
                        index <= currentSetIndex && styles.setIndicatorTextActive,
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                ))}
              </View>

              <Button
                title="Concluir Série"
                onPress={handleCompleteSet}
                style={styles.completeButton}
              />
            </View>
          </Card>
        )}

        {/* Próximos exercícios */}
        {currentExerciseIndex < totalExercises - 1 && !isResting && (
          <View style={styles.nextExercisesContainer}>
            <Text style={styles.nextExercisesTitle}>Próximos Exercícios</Text>
            {workout.exercises.slice(currentExerciseIndex + 1).map((exercise, index) => (
              <Card key={exercise.id}>
                <View style={styles.nextExerciseItem}>
                  <Text style={styles.nextExerciseName}>
                    {index + 1}. {exercise.exercise.name}
                  </Text>
                  <Text style={styles.nextExerciseInfo}>
                    {exercise.sets}x{exercise.reps}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  cancelText: {
    fontSize: 24,
    color: '#FF305B',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF305B',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  restContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  restTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  restTimer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FF305B',
    marginBottom: 8,
  },
  restText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  skipButton: {
    minWidth: 200,
  },
  exerciseContainer: {
    paddingVertical: 16,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#FF305B',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  exerciseMediaContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseGif: {
    width: '100%',
    height: '100%',
  },
  currentSetInfo: {
    marginBottom: 20,
  },
  setTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  setDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
  },
  setDetail: {
    alignItems: 'center',
  },
  setDetailLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  setDetailValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF305B',
  },
  notesContainer: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#333333',
  },
  setsProgress: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  setIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setIndicatorCompleted: {
    backgroundColor: '#4CAF50',
  },
  setIndicatorCurrent: {
    backgroundColor: '#FF305B',
  },
  setIndicatorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999999',
  },
  setIndicatorTextActive: {
    color: '#FFFFFF',
  },
  completeButton: {
    marginTop: 8,
  },
  nextExercisesContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  nextExercisesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  nextExerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextExerciseName: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  nextExerciseInfo: {
    fontSize: 14,
    color: '#666666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#FF305B',
    textAlign: 'center',
    marginBottom: 16,
  },
});

