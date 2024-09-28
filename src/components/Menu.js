import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Menu = React.memo(({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <View style={styles.menu}>
        <Text style={styles.noAlerts}>Nenhum alerta criado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.menu}>
      {alerts.map((alert, index) => (
        <Text key={index} style={styles.menuItem}>
          Alarme: {alert.color} às {alert.time}
        </Text>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  menu: {
    padding: 20,
    backgroundColor: '#FFD700', // Amarelo de alto contraste
    borderRadius: 10,
    marginTop: 10, // Espaço abaixo da Navbar
    marginBottom: 20,
    alignItems: 'center', // Centraliza os itens horizontalmente
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 10, // Espaço entre os itens do menu
    color: '#000000', // Preto para máximo contraste
    textAlign: 'center', // Centraliza o texto
  },
  noAlerts: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});

export default Menu;
