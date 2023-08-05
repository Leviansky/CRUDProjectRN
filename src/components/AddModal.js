import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from '../styles/AddModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, formatTime, combineDateAndTime } from '../helpers/TimeManagers';
import { formatTask } from '../helpers/TaskManagers';

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
      return;
    }
  };

  const handleTimeChange = (event, selected) => {
    if (event.type == "set") {
      setSelectedTime(selected);
      setShowTimePicker(false);
      return;
    } else {
      setShowTimePicker(false);
      return;
    }
  };

  const handleSubmit = async () => {
    const newTask = formatTask(selectedDate, selectedTime, jobTitle, jobDescription);
    try {
      await onAddTask(newTask);
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdate = async () => {
    const newTask = formatTask(selectedDate, selectedTime, jobTitle, jobDescription);
    try {
      await onUpdateTask(newTask);
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleClose = () => {
    setJobTitle('');
    setJobDescription('');
    setSelectedDate(new Date());
    setSelectedTime(new Date());  
    onModalClose();
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
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
          {
            jobTitle != '' && jobDescription != '' ?
            <TouchableOpacity onPress={task ? handleUpdate : handleSubmit } style={styles.submitButton}>
              <Text style={styles.submitButtonText}>{task ? 'Update' : 'Submit'}</Text>
            </TouchableOpacity>
            :
            <View style={styles.cantSubmitButton}>
              <Text style={styles.submitButtonText}>{task ? 'Update' : 'Submit'}</Text>
            </View>
          }
          {
            showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date" // Set mode to "date"
                display="spinner" // Display mode
                onChange={handleDateChange}
              />
            )
          }
          {
            showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time" // Set mode to "time"
                is24Hour={true}
                display="spinner" // Display mode
                onChange={handleTimeChange}
              />
            )
          }
        </View>
      </View>
    </Modal>
  );
};

export default ModalButton;