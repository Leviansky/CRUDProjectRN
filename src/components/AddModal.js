import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../styles/AddModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, formatTime } from '../helpers/TaskManagers';

const ModalButton = ({ visible, onRequestClose, onModalClose, onAddTask, task, onUpdateTask }) => {
  const [jobTitle, setJobTitle] = useState(task ? task.title : '');
  const [jobDescription, setJobDescription] = useState(task ? task.description : '');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setJobTitle(task.title);
      setJobDescription(task.description);
      setSelectedDate(new Date(task.time));
      setSelectedTime(new Date(task.time));
    } else {
      setJobTitle('');
      setJobDescription('');
      setSelectedDate(new Date());
      setSelectedTime(new Date());
    }
  }, [task]);


  const handleDateChange = (event, selected) => {
    if (event.type == "set") {
      setSelectedDate(selected);
      setShowDatePicker(false);
      setShowTimePicker(true);
      return;
    } else {
      setShowDatePicker(false);
      setShowTimePicker(false);
      return;
    }
  };

  const handleTimeChange = (event, selected) => {
    if (event.type == "set") {
      setSelectedTime(selected);
      setShowTimePicker(false);
      return;
    } else {
      setShowDatePicker(false);
      setShowTimePicker(false);
      return;
    }
  };

  const combineDateAndTime = (date, time) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    return combined;
  };


  const handleSubmit = async () => {
    timeTemp = combineDateAndTime(selectedDate,selectedTime)
    const newTask = {
      time: timeTemp,
      title: jobTitle,
      description: jobDescription,
    };

    try {
      await onAddTask(newTask);
      setJobTitle('');
      setJobDescription('');
      setSelectedDate(new Date());
      setSelectedTime(new Date());  
      onModalClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdate = async () => {
    const newTask = {
      time: combineDateAndTime(selectedDate,selectedTime),
      title: jobTitle,
      description: jobDescription,
    };

    try {
      await onUpdateTask(newTask);
      setJobTitle('');
      setJobDescription('');
      setSelectedDate(new Date());
      setSelectedTime(new Date());  
      onModalClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onModalClose} style={styles.closeButton}>
            <Icon name="times" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalText}>Tambah Pekerjaan</Text>
          <TextInput
            style={styles.input}
            placeholder="Judul Pekerjaan"
            value={jobTitle}
            onChangeText={text => setJobTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Deskripsi Pekerjaan"
            value={jobDescription}
            onChangeText={text => setJobDescription(text)}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>
              {formatDate(selectedDate)} {formatTime(selectedTime)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={task ? handleUpdate : handleSubmit } style={styles.submitButton}>
            <Text style={styles.submitButtonText}>{task ? 'Update' : 'Submit'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date" // Set mode to "date"
              display="spinner" // Display mode
              onChange={handleDateChange}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time" // Set mode to "time"
              is24Hour={true}
              display="spinner" // Display mode
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalButton;