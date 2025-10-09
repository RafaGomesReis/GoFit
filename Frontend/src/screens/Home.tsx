import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { mockExercises, mockWorkouts, mockUser, mockUserStats } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function Home() {
  const { state, dispatch } = useApp();

  // Carregar dados mockados na primeira vez
  useEffect(() => {
    if (state.exercises.length === 0) {
      dispatch({ type: 'SET_EXERCISES', payload: mockExercises });
      dispatch({ type: 'SET_WORKOUTS', payload: mockWorkouts });
      dispatch({ type: 'SET_USER', payload: mockUser });
      dispatch({ type: 'SET_USER_STATS', payload: mockUserStats });
    }
  }, []);

  const handleStartWorkout = () => {
    // TODO: Implementar navegação para iniciar treino
    console.log('Iniciar treino');
  };

  const handleQuickStats = () => {
    // TODO: Implementar navegação para estatísticas
    console.log('Ver estatísticas');
  };

  const renderQuickStats = () => (
    <Card title="Suas Estatísticas">
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{state.userStats?.totalWorkouts || 0}</Text>
          <Text style={styles.statLabel}>Treinos</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{state.userStats?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Sequência</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {Math.floor((state.userStats?.totalWorkoutTime || 0) / 60)}
          </Text>
          <Text style={styles.statLabel}>Minutos</Text>
        </View>
      </View>
    </Card>
  );

  const renderTodayWorkout = () => {
    const todayWorkout = state.workouts[0]; // Pegar o primeiro treino como exemplo
    
    return (
      <Card 
        title="Treino de Hoje" 
        subtitle={todayWorkout?.name || 'Nenhum treino agendado'}
        onPress={handleStartWorkout}
      >
        {todayWorkout && (
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutDescription}>
              {todayWorkout.description}
            </Text>
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutDetail}>
                {todayWorkout.exercises.length} exercícios
              </Text>
              <Text style={styles.workoutDetail}>
                {todayWorkout.duration} min
              </Text>
              <Text style={styles.workoutDetail}>
                {todayWorkout.difficulty}
              </Text>
            </View>
          </View>
        )}
      </Card>
    );
  };

  const renderQuickActions = () => (
    <Card title="Ações Rápidas">
      <View style={styles.actionsContainer}>
        <Button
          title="Iniciar Treino"
          onPress={handleStartWorkout}
          style={styles.actionButton}
          variant="primary"
        />
        <Button
          title="Ver Exercícios"
          onPress={() => console.log('Ver exercícios')}
          style={styles.actionButton}
          variant="outline"
        />
        <Button
          title="Meu Progresso"
          onPress={handleQuickStats}
          style={styles.actionButton}
          variant="secondary"
        />
      </View>
    </Card>
  );

  const renderMotivation = () => (
    <Card>
      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>
          "A única maneira de fazer um grande trabalho é amar o que você faz."
        </Text>
        <Text style={styles.motivationAuthor}>- Steve Jobs</Text>
      </View>
    </Card>
  );

  if (state.loading.isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Olá, {state.user?.name?.split(' ')[0] || 'Usuário'}! 👋
          </Text>
          <Text style={styles.subWelcomeText}>
            Pronto para mais um treino?
          </Text>
        </View>

        {renderQuickStats()}
        {renderTodayWorkout()}
        {renderQuickActions()}
        {renderMotivation()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subWelcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF305B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  workoutInfo: {
    marginTop: 8,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutDetail: {
    fontSize: 12,
    color: '#999999',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  motivationContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  motivationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  motivationAuthor: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
});
