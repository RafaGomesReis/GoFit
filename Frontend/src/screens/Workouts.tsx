import React from 'react';
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

export default function Workouts() {
  const { state } = useApp();

  const handleCreateWorkout = () => {
    console.log('Criar novo treino');
  };

  const handleStartWorkout = (workoutId: string) => {
    console.log('Iniciar treino:', workoutId);
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
});
