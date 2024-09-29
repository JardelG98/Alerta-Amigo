import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';

const colors = [
  { name: 'Vermelho', value: '#FF0000' },
  { name: 'Verde', value: '#008000' },
  { name: 'Azul', value: '#0000FF' },
  { name: 'Amarelo', value: '#FFFF00' },
  { name: 'Laranja', value: '#FFA500' },
  { name: 'Roxo', value: '#800080' },
  { name: 'Ciano', value: '#00FFFF' },
  { name: 'Magenta', value: '#FF00FF' },
];

const AlertForm = ({ onSubmit, onCancel, initialData }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setColor(initialData.color);
      setTime(initialData.time);
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setName('');
    setColor('');
    setTime('');
  };

  const isValidTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleSubmit = () => {
    if (!name || !color || !time) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }
    if (!isValidTime(time)) {
      Alert.alert('Por favor, insira uma hora válida no formato HH:MM.');
      return;
    }
    onSubmit({ name, color, time });
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Alerta</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome do alerta"
      />

      <Text style={styles.label}>Cor do Alerta</Text>
      <TouchableOpacity
        style={[styles.colorPicker, { backgroundColor: color || '#f0f0f0' }]}
        onPress={() => setColor('')}
      >
        <Text style={styles.colorText}>{color || 'Selecione uma cor'}</Text>
      </TouchableOpacity>
      <View style={styles.colorGrid}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c.value}
            style={[styles.colorBox, { backgroundColor: c.value }]}
            onPress={() => setColor(c.value)}
          />
        ))}
      </View>

      <Text style={styles.label}>Hora do Alerta (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={(text) => {
          const formattedText = text.replace(/[^0-9:]/g, '').replace(/^(\d{2})(\d)/, '$1:$2');
          setTime(formattedText);
        }}
        placeholder="Digite a hora"
        maxLength={5}
      />

      <View style={styles.buttonContainer}>
        <Button title="SALVAR" onPress={handleSubmit} />
        <Button title="CANCELAR" onPress={onCancel} color="red" />
      </View>
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
    borderRadius: 4,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  colorPicker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  colorText: {
    color: '#000',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  colorBox: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AlertForm;
