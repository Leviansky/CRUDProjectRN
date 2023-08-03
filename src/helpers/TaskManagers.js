import AsyncStorage from '@react-native-async-storage/async-storage';

const loadTasks = async () => {
  try {
    const tasksData = await AsyncStorage.getItem('tasks');
    if (tasksData !== null) {
      return JSON.parse(tasksData);
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

const addTask = async (newTask) => {
  try {
    const tasks = await loadTasks();
    const updatedTasks = [...tasks, newTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error('Error adding task:', error);
    return [];
  }
};

const deleteTask = async (index) => {
  try {
    const tasks = await loadTasks();
    const updatedTasks = tasks.filter((_, i) => i !== index);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTasks;
  } catch (error) {
    console.error('Error deleting task:', error);
    return [];
  }
};

export { loadTasks, addTask, deleteTask };
