import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'; // Import Modal dan Alert
import styles from '../styles/ToDoCardStyles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatDate, formatTime } from '../helpers/TaskManagers.js';

const TodoCard = ({ time, title, description, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteConfirm = () => {
    setModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteConfirmed = () => {
    setModalVisible(false);
    onDelete();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const daysInIndonesian = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];
  
  return (
    <View style={styles.card}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Apakah Anda yakin ingin menghapus tugas ini?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteCancel} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Tidak</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteConfirmed} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.cardContent}>
        <Text style={styles.time}>{isToday(time) ? 'HARI INI' : `${daysInIndonesian[time.getDay()]}, ${formatDate(time)}`} {formatTime(time)}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity onPress={handleDeleteConfirm} style={styles.deleteButton}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoCard;
