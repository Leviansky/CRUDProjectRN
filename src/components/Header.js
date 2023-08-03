import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/HeaderStyles.js';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>TO DO LIST</Text>
    </View>
  );
};

export default Header;
