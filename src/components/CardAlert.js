import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CardAlert = React.memo(({ alerts, onEdit }) => {
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
        <View key={index} style={[styles.menuItem, { backgroundColor: alert.color }]}>
          <Text style={styles.text}>Alarme às {alert.time}</Text>
          <TouchableOpacity onPress={() => onEdit(index)} style={styles.editButton}>
            <Icon name="edit" size={20} color="#000" />
            <Text style={styles.editText}> ALTERAR</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  menu: {
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  menuItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noAlerts: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    color: '#000',
  },
});

export default CardAlert;
