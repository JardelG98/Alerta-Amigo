// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícone de hambúrguer

const Navbar = () => {
  const handleMenuPress = () => {
    alert('Menu pressionado!');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleMenuPress} style={styles.hamburgerButton}>
        <Ionicons name="menu" size={36} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Alerta Amigo</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#001f3f',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    height: 100,
    paddingHorizontal: 15,
  },
  hamburgerButton: {
    marginRight: 10,
    paddingTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 50,
  },
});

export default Navbar;
