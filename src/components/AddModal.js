import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../styles/AddModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const ModalButton = ({ visible, onRequestClose, onModalClose, onAddTask }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selected) => {
    console.log(event);
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
    console.log(event);
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

  const handleSubmit = async () => {
    const newTask = {
      time: formatDate(selectedDate) + " " + formatTime(selectedTime),
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

  const formatTime = date => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}  `;
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
            <Text style={styles.input}>{formatDate(selectedDate)}{formatTime(selectedTime)}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
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