import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
//import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const colors = [
  { name: 'Vermelho', value: '#FF0000' },
  { name: 'Verde', value: '#008000' },
  { name: 'Azul', value: '#0000FF' },
  { name: 'Amarelo', value: '#FFFF00' },
  { name: 'Laranja', value: '#FFA500' },
  { name: 'Roxo', value: '#800080' },
  { name: 'Cinza', value: '#808080' },
  { name: 'Preto', value: '#000000' },
  { name: 'Marrom', value: '#A52A2A' },
  { name: 'Rosa', value: '#FFC0CB' },
  //{ name: 'Ciano', value: '#00FFFF' },
  //{ name: 'Magenta', value: '#FF00FF' },
  //{ name: 'Branco', value: '#FFFFFF' },
  //{ name: 'Ouro', value: '#FFD700' },
  //{ name: 'Prata', value: '#C0C0C0' },
  //{ name: 'Lilás', value: '#D8BFD8' },
  //{ name: 'Verde Claro', value: '#90EE90' },
  //{ name: 'Azul Claro', value: '#ADD8E6' },
  //{ name: 'Pêssego', value: '#FFDAB9' },
  //{ name: 'Salmon', value: '#FA8072' },
  //{ name: 'Vinho', value: '#800000' },
  //{ name: 'Bordô', value: '#800020' },
  //{ name: 'Turquesa', value: '#40E0D0' },
  //{ name: 'Coral', value: '#FF7F50' },
  //{ name: 'Verde Limão', value: '#32CD32' },
  //{ name: 'Verde Musgo', value: '#8B8B00' },
  //{ name: 'Bege', value: '#F5F5DC' },
  //{ name: 'Dourado', value: '#FFD700' },
  //{ name: 'Ameixa', value: '#8E4B91' },
  //{ name: 'Azul Turquesa', value: '#00CED1' },
  //{ name: 'Menta', value: '#98FF98' },
  //{ name: 'Azul Royal', value: '#4169E1' },
  //{ name: 'Lavanda', value: '#E6E6FA' },
  //{ name: 'Verde Floresta', value: '#228B22' },
];

//const [checkbox, setCheckbox] = useState([]);
//const [statuscheckbox, setStatuscheckbox] = useState([null]);

const TIPOS = [
  { id: 'Comprimido' },
  { id: 'Dosagem' },
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

      {/* Adicionando uma barra de rolagem */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.colorGrid}>
          {colors.map((c) => (
            <TouchableOpacity
              key={c.value} // Aqui, usando o valor da cor como chave única
              style={[styles.colorBox, { backgroundColor: c.value }]}
              onPress={() => setColor(c.value)}
            />
          ))}
        </View>
      </ScrollView>

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
    flexWrap: 'nowrap', // Alterado para não quebrar em linhas
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
