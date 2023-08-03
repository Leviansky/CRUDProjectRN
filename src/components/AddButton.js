import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../styles/AddButtonStyles';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.button}>
        <Icon name="plus" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;