import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react';
import { loadTasks, addTask, deleteTask, updateTask } from './src/helpers/TaskManagers.js';
import Header from './src/components/Header.js';
import TodoCard from './src/components/ToDoCard.js';
import AddButton from './src/components/AddButton.js';
import AddModal from './src/components/AddModal.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    loadTasks()
      .then((loadedTasks) => setTasks(loadedTasks))
      .catch((error) => console.error('Error loading tasks:', error));
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const updatedTasks = await addTask(newTask);
      setTasks(updatedTasks);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    const updatedTasks = [...tasks]; 
    updatedTasks.splice(index, 1); 
    setTasks(updatedTasks);
    await deleteTask(index);
  }

  const handleUpdateTask = async (updatedTask) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = updatedTask;
      setTasks(updatedTasks);
      await updateTask(editingIndex, updatedTask);
      setEditingTask(null);
      setEditingIndex(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const openEditModal = (index) => {
    setEditingTask(tasks[index]);
    setEditingIndex(index);
    toggleModal();
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <ScrollView>
        {
          tasks.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => openEditModal(index)}>
              <TodoCard
                key={index}
                time={new Date(task.time)}
                title={task.title}
                description={task.description}
                onDelete={ () => handleDeleteTask(index)}
              />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      <AddButton onPress={toggleModal}/>
      <AddModal
        visible={modalVisible}
        onRequestClose={() => {
          setEditingTask(null);
          setEditingIndex(null);
          setModalVisible(false);
        }}
        onModalClose={() => {
          setEditingTask(null);
          setEditingIndex(null);
          setModalVisible(false);
        }}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        task={editingTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});