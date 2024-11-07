// Menu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';

const Menu = ({ onClose, onThemeChange }) => {
  const handleExitApp = () => {
    BackHandler.exitApp();
  };

  return (
    <TouchableOpacity style={styles.overlay} onPress={onClose}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => alert('Sobre')}>
          <Text style={styles.menuItem}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleExitApp}>
          <Text style={styles.menuItem}>Sair</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,   
  },
  menuItem: {
    fontSize: 20,
    marginVertical: 10,
  },
});

export default Menu;