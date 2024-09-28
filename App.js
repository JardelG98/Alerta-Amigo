import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './src/components/Navbar'; // Ajuste o caminho conforme necessário
import Menu from './src/components/Menu'; // Ajuste o caminho conforme necessário
import FloatingButton from './src/components/FloatingButton'; // Ajuste o caminho conforme necessário
import AlertForm from './src/components/AlertForm'; // Certifique-se de importar o AlertForm

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [alerts, setAlerts] = useState([]); // Estado para armazenar os alertas

  const handleButtonPress = () => {
    setFormVisible(!isFormVisible); // Alterna a visibilidade do AlertForm
  };

  const handleSubmit = (data) => {
    setAlerts((prevAlerts) => [...prevAlerts, data]); // Adiciona o novo alerta à lista
    setFormVisible(false); // Fecha o formulário após a submissão
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Menu alerts={alerts} />
      <FloatingButton onPress={handleButtonPress} />
      {isFormVisible && <AlertForm onSubmit={handleSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
