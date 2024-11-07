import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './src/components/Navbar';
import FloatingButton from './src/components/FloatingButton';
import AlertForm from './src/components/AlertForm';
import CardAlert from './src/components/CardAlert';
import LoadingScreen from './src/components/LoadingScreen'; // Novo componente

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simula o fim do carregamento após 3 segundos
    }, 3000);
  }, []);

  const handleButtonPress = () => {
    setFormVisible(!isFormVisible);
    setEditIndex(null); // Reseta o índice ao abrir o formulário
  };

  const handleSubmit = (data) => {
    setAlerts((prevAlerts) => {
      const updatedAlerts = editIndex !== null 
        ? prevAlerts.map((alert, index) => (index === editIndex ? data : alert))
        : [...prevAlerts, data];
      return updatedAlerts;
    });
    setFormVisible(false);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormVisible(true);
  };

  // Função para deletar um alerta com base no índice
  const handleDelete = (index) => {
    setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen /> // Exibe a tela de carregamento com a logo do app
      ) : (
        <>
          <Navbar />
          <CardAlert alerts={alerts} onEdit={handleEdit} onDelete={handleDelete} />
          <FloatingButton onPress={handleButtonPress} />
          {isFormVisible && (
            <AlertForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editIndex !== null ? alerts[editIndex] : null}
            />
          )}
        </>
      )}
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
