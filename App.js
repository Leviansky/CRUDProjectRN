import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react';
import { loadTasks, addTask, deleteTask } from './src/helpers/TaskManagers.js';
import Header from './src/components/Header.js';
import TodoCard from './src/components/ToDoCard.js';
import AddButton from './src/components/AddButton.js';
import AddModal from './src/components/AddModal.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
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
    const updatedTasks = [...tasks]; // Create a copy of the tasks array
    updatedTasks.splice(index, 1); // Remove the task at the specified index
    setTasks(updatedTasks);
    await deleteTask(index);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <ScrollView>
        {tasks.map((task, index) => (
          <TodoCard
            key={index}
            time={task.time}
            title={task.title}
            description={task.description}
            onDelete={ () => handleDeleteTask(index)}
          />
        ))}
      </ScrollView>
      <AddButton onPress={toggleModal}/>
      <AddModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onModalClose={() => setModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});