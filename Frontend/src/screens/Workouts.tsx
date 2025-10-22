import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import WorkoutExecution from './WorkoutExecution';
import CreateWorkout from './CreateWorkout';
import { WorkoutSession } from '../types';

export default function Workouts() {
  const { state, dispatch } = useApp();
  const [showExecution, setShowExecution] = useState(false);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  const handleCreateWorkout = () => {
    setShowCreateWorkout(true);
  };

  const handleStartWorkout = (workoutId: string) => {
    const workout = state.workouts.find(w => w.id === workoutId);
    if (!workout) return;

    const session: WorkoutSession = {
      id: Date.now().toString(),
      workoutId,
      startedAt: new Date(),
      exercises: workout.exercises.map(we => ({
        exerciseId: we.id,
        sets: [],
        completed: false,
      })),
    };

    dispatch({ type: 'SET_CURRENT_WORKOUT', payload: session });
    setSelectedWorkoutId(workoutId);
    setShowExecution(true);
  };

  const renderWorkoutCard = (workout: any) => (
    <Card
      key={workout.id}
      title={workout.name}
      subtitle={workout.description}
      onPress={() => handleStartWorkout(workout.id)}
    >
      <View style={styles.workoutInfo}>
        <View style={styles.workoutStats}>
          <Text style={styles.statText}>
            {workout.exercises.length} exercícios
          </Text>
          <Text style={styles.statText}>
            {workout.duration} min
          </Text>
          <Text style={styles.statText}>
            {workout.difficulty}
          </Text>
        </View>
        <Button
          title="Iniciar"
          onPress={() => handleStartWorkout(workout.id)}
          size="small"
          style={styles.startButton}
        />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Meus Treinos</Text>
          <Button
            title="+ Novo"
            onPress={handleCreateWorkout}
            size="small"
            variant="primary"
          />
        </View>

        {state.workouts.length === 0 ? (
          <Card>
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                Você ainda não tem treinos criados
              </Text>
              <Button
                title="Criar Primeiro Treino"
                onPress={handleCreateWorkout}
                style={styles.createButton}
              />
            </View>
          </Card>
        ) : (
          state.workouts.map(renderWorkoutCard)
        )}
      </ScrollView>

      {/* Tela de Execução de Treino */}
      {showExecution && selectedWorkoutId && (
        <View style={styles.overlayContainer}>
          <WorkoutExecution
            workoutId={selectedWorkoutId}
            onFinish={() => {
              setShowExecution(false);
              setSelectedWorkoutId(null);
            }}
            onCancel={() => {
              setShowExecution(false);
              setSelectedWorkoutId(null);
            }}
          />
        </View>
      )}

      {/* Tela de Criar Treino */}
      {showCreateWorkout && (
        <View style={styles.overlayContainer}>
          <CreateWorkout
            onSave={() => setShowCreateWorkout(false)}
            onCancel={() => setShowCreateWorkout(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  workoutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  startButton: {
    minWidth: 80,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
  },
  createButton: {
    minWidth: 200,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
});
