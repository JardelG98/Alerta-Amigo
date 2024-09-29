// Menu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ onClose, onThemeChange }) => {
  return (
    <TouchableOpacity style={styles.overlay} onPress={onClose}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => alert('Sobre')}>
          <Text style={styles.menuItem}>Sobre</Text>
        </TouchableOpacity>

        

        <TouchableOpacity onPress={onThemeChange}>
          <Text style={styles.menuItem}>Alterar Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Sair')}>
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
