// Navbar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícone de hambúrguer
import Menu from './Menu'; // Importando o novo componente Menu

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleThemeChange = () => {
    alert('Alterando o tema do alarme!');
    closeMenu(); // Fecha o menu após alterar o tema
  };

  return (
    <View>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.hamburgerButton}>
          <Ionicons name="menu" size={36} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Alerta Amigo</Text>
      </View>

      {/* Menu Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <Menu onClose={closeMenu} onThemeChange={handleThemeChange} />
      </Modal>
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
