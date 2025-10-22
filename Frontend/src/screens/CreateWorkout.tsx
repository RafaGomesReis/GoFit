import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '../contexts/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Workout, WorkoutExercise } from '../types';

interface CreateWorkoutProps {
  onSave: () => void;
  onCancel: () => void;
}

export default function CreateWorkout({ onSave, onCancel }: CreateWorkoutProps) {
  const { state, dispatch } = useApp();
  
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [category, setCategory] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  const difficulties: Array<'Beginner' | 'Intermediate' | 'Advanced'> = ['Beginner', 'Intermediate', 'Advanced'];

  const handleAddExercise = (exerciseId: string) => {
    const exercise = state.exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const workoutExercise: WorkoutExercise = {
      id: `${Date.now()}-${exerciseId}`,
      exercise,
      sets: 3,
      reps: 10,
      weight: 0,
      restTime: 60,
      completed: false,
      notes: '',
    };

    setSelectedExercises([...selectedExercises, workoutExercise]);
    setShowExerciseSelector(false);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(e => e.id !== exerciseId));
  };

  const handleUpdateExercise = (
    exerciseId: string,
    field: keyof WorkoutExercise,
    value: any
  ) => {
    setSelectedExercises(
      selectedExercises.map(e =>
        e.id === exerciseId ? { ...e, [field]: value } : e
      )
    );
  };

  const calculateTotalDuration = () => {
    return selectedExercises.reduce((total, exercise) => {
      const exerciseTime = exercise.sets * (exercise.reps * 3 + exercise.restTime);
      return total + exerciseTime / 60; // converter para minutos
    }, 0);
  };

  const handleSaveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome para o treino');
      return;
    }

    if (selectedExercises.length === 0) {
      Alert.alert('Erro', 'Por favor, adicione pelo menos um exercício');
      return;
    }

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: workoutName.trim(),
      description: workoutDescription.trim(),
      exercises: selectedExercises,
      duration: Math.ceil(calculateTotalDuration()),
      createdAt: new Date(),
      updatedAt: new Date(),
      difficulty,
      category: category.trim() || 'Geral',
    };

    dispatch({ type: 'ADD_WORKOUT', payload: newWorkout });
    
    Alert.alert('Sucesso! 🎉', 'Treino criado com sucesso!', [
      { text: 'OK', onPress: onSave }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar Novo Treino</Text>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Informações Básicas */}
        <Card>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Treino *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Treino de Peito e Tríceps"
              value={workoutName}
              onChangeText={setWorkoutName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva o objetivo deste treino..."
              value={workoutDescription}
              onChangeText={setWorkoutDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Hipertrofia, Força, Resistência"
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dificuldade</Text>
            <View style={styles.difficultyContainer}>
              {difficulties.map(diff => (
                <TouchableOpacity
                  key={diff}
                  style={[
                    styles.difficultyButton,
                    difficulty === diff && styles.difficultyButtonActive,
                  ]}
                  onPress={() => setDifficulty(diff)}
                >
                  <Text
                    style={[
                      styles.difficultyButtonText,
                      difficulty === diff && styles.difficultyButtonTextActive,
                    ]}
                  >
                    {diff}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        {/* Exercícios */}
        <View style={styles.exercisesSection}>
          <View style={styles.exercisesHeader}>
            <Text style={styles.sectionTitle}>Exercícios</Text>
            <Button
              title="+ Adicionar"
              onPress={() => setShowExerciseSelector(true)}
              size="small"
              variant="primary"
            />
          </View>

          {selectedExercises.length === 0 ? (
            <Card>
              <Text style={styles.emptyText}>
                Nenhum exercício adicionado ainda
              </Text>
            </Card>
          ) : (
            selectedExercises.map((workoutExercise, index) => (
              <Card key={workoutExercise.id}>
                <View style={styles.exerciseCard}>
                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseHeaderLeft}>
                      <Text style={styles.exerciseNumber}>{index + 1}</Text>
                      <Text style={styles.exerciseName}>
                        {workoutExercise.exercise.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleRemoveExercise(workoutExercise.id)}
                    >
                      <Text style={styles.removeButton}>🗑️</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.exerciseInputsRow}>
                    <View style={styles.exerciseInput}>
                      <Text style={styles.exerciseInputLabel}>Séries</Text>
                      <TextInput
                        style={styles.exerciseInputField}
                        keyboardType="numeric"
                        value={workoutExercise.sets.toString()}
                        onChangeText={(text) =>
                          handleUpdateExercise(workoutExercise.id, 'sets', parseInt(text) || 0)
                        }
                      />
                    </View>

                    <View style={styles.exerciseInput}>
                      <Text style={styles.exerciseInputLabel}>Reps</Text>
                      <TextInput
                        style={styles.exerciseInputField}
                        keyboardType="numeric"
                        value={workoutExercise.reps.toString()}
                        onChangeText={(text) =>
                          handleUpdateExercise(workoutExercise.id, 'reps', parseInt(text) || 0)
                        }
                      />
                    </View>

                    <View style={styles.exerciseInput}>
                      <Text style={styles.exerciseInputLabel}>Peso (kg)</Text>
                      <TextInput
                        style={styles.exerciseInputField}
                        keyboardType="numeric"
                        value={workoutExercise.weight?.toString() || '0'}
                        onChangeText={(text) =>
                          handleUpdateExercise(workoutExercise.id, 'weight', parseFloat(text) || 0)
                        }
                      />
                    </View>

                    <View style={styles.exerciseInput}>
                      <Text style={styles.exerciseInputLabel}>Descanso (s)</Text>
                      <TextInput
                        style={styles.exerciseInputField}
                        keyboardType="numeric"
                        value={workoutExercise.restTime.toString()}
                        onChangeText={(text) =>
                          handleUpdateExercise(workoutExercise.id, 'restTime', parseInt(text) || 0)
                        }
                      />
                    </View>
                  </View>

                  <TextInput
                    style={[styles.input, styles.notesInput]}
                    placeholder="Observações sobre este exercício..."
                    value={workoutExercise.notes || ''}
                    onChangeText={(text) =>
                      handleUpdateExercise(workoutExercise.id, 'notes', text)
                    }
                  />
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Resumo */}
        {selectedExercises.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Resumo</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total de Exercícios:</Text>
              <Text style={styles.summaryValue}>{selectedExercises.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duração Estimada:</Text>
              <Text style={styles.summaryValue}>
                {Math.ceil(calculateTotalDuration())} min
              </Text>
            </View>
          </Card>
        )}

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <Button
            title="Cancelar"
            onPress={onCancel}
            variant="secondary"
            style={styles.actionButton}
          />
          <Button
            title="Salvar Treino"
            onPress={handleSaveWorkout}
            variant="primary"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>

      {/* Modal de Seleção de Exercícios */}
      {showExerciseSelector && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar Exercício</Text>
              <TouchableOpacity onPress={() => setShowExerciseSelector(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.exerciseList}>
              {state.exercises.map(exercise => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseListItem}
                  onPress={() => handleAddExercise(exercise.id)}
                >
                  <View>
                    <Text style={styles.exerciseListName}>{exercise.name}</Text>
                    <Text style={styles.exerciseListCategory}>
                      {exercise.category}
                    </Text>
                  </View>
                  <Text style={styles.exerciseListArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  cancelText: {
    fontSize: 24,
    color: '#FF305B',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#FF305B',
    borderColor: '#FF305B',
  },
  difficultyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  difficultyButtonTextActive: {
    color: '#FFFFFF',
  },
  exercisesSection: {
    marginTop: 20,
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  exerciseCard: {
    gap: 12,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  exerciseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF305B',
    backgroundColor: '#FFE8ED',
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: 'center',
    lineHeight: 32,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  removeButton: {
    fontSize: 20,
  },
  exerciseInputsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  exerciseInput: {
    flex: 1,
  },
  exerciseInputLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  exerciseInputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  notesInput: {
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalClose: {
    fontSize: 24,
    color: '#FF305B',
    fontWeight: 'bold',
  },
  exerciseList: {
    padding: 16,
  },
  exerciseListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  exerciseListName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  exerciseListCategory: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  exerciseListArrow: {
    fontSize: 24,
    color: '#999999',
  },
});

