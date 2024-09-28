import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const AlertForm = ({ onSubmit }) => {
  const [color, setColor] = useState('');
  const [time, setTime] = useState('');

  const isValidTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleSubmit = () => {
    if (!color || !time) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }
    if (!isValidTime(time)) {
      Alert.alert('Por favor, insira uma hora válida no formato HH:MM.');
      return;
    }
    onSubmit({ color, time });
    setColor('');
    setTime('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cor do Alerta</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Ex: Vermelho"
      />
      <Text style={styles.label}>Hora do Alerta (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="Ex: 14:30"
      />
      <Button title="Criar Alerta" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default AlertForm;
