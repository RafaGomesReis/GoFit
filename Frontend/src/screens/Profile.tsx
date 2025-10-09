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

export default function Profile() {
  const { state } = useApp();

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleViewStats = () => {
    console.log('Ver estatísticas');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const renderUserInfo = () => (
    <Card title="Informações Pessoais">
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {state.user?.name?.charAt(0) || 'U'}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{state.user?.name || 'Usuário'}</Text>
          <Text style={styles.userEmail}>{state.user?.email || 'email@exemplo.com'}</Text>
          <Text style={styles.userLevel}>
            Nível: {state.user?.fitnessLevel || 'Iniciante'}
          </Text>
        </View>
      </View>
      <Button
        title="Editar Perfil"
        onPress={handleEditProfile}
        variant="outline"
        style={styles.editButton}
      />
    </Card>
  );

  const renderStats = () => (
    <Card title="Suas Estatísticas">
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {state.userStats?.totalWorkouts || 0}
          </Text>
          <Text style={styles.statLabel}>Treinos Totais</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {state.userStats?.currentStreak || 0}
          </Text>
          <Text style={styles.statLabel}>Sequência Atual</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {state.userStats?.longestStreak || 0}
          </Text>
          <Text style={styles.statLabel}>Maior Sequência</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {Math.floor((state.userStats?.totalWorkoutTime || 0) / 60)}
          </Text>
          <Text style={styles.statLabel}>Minutos Treinados</Text>
        </View>
      </View>
      <Button
        title="Ver Estatísticas Completas"
        onPress={handleViewStats}
        variant="secondary"
        style={styles.statsButton}
      />
    </Card>
  );

  const renderGoals = () => (
    <Card title="Meus Objetivos">
      <View style={styles.goalsContainer}>
        {state.user?.goals?.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalText}>• {goal}</Text>
          </View>
        )) || (
          <Text style={styles.noGoals}>Nenhum objetivo definido</Text>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderUserInfo()}
        {renderStats()}
        {renderGoals()}
        
        <Card>
          <Button
            title="Sair da Conta"
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
          />
        </Card>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF305B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 14,
    color: '#FF305B',
    fontWeight: '600',
  },
  editButton: {
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF305B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  statsButton: {
    marginTop: 8,
  },
  goalsContainer: {
    marginTop: 8,
  },
  goalItem: {
    marginBottom: 8,
  },
  goalText: {
    fontSize: 14,
    color: '#333333',
  },
  noGoals: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16,
  },
  logoutButton: {
    borderColor: '#FF4444',
  },
});
