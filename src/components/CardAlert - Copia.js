import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Audio } from 'expo-av';

const CardAlert = React.memo(({ alerts, onEdit, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalColor, setModalColor] = useState(null);
  const [alertName, setAlertName] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      checkAlarms();
    }, 30000); // Checa a cada 30 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, [alerts]);

  const checkAlarms = async () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    alerts.forEach(alert => {
      const [alertHour, alertMinute] = alert.time.split(':').map(Number);

      if (alertHour === currentHour && alertMinute === currentMinute) {
        setModalColor(alert.color); // Define a cor escolhida no modal
        setAlertName(alert.name); // Define o nome do alarme para mostrar no modal
        setModalVisible(true); // Abre o modal
        playSound(); // Toca o som do alarme
      }
    });
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../components/alarm_sound.mp3') // Adicione o caminho do seu arquivo de som
    );
    await sound.playAsync();
  };

  const closeModal = () => {
    setModalVisible(false); // Fecha o modal ao clicar em "Fechar"
  };

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
          <Text style={styles.text}>{alert.name} - {alert.time}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => onEdit(index)} style={styles.editButton}>
              <Icon name="edit" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(index)} style={styles.deleteButton}>
              <Icon name="trash" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={[styles.modal, { backgroundColor: modalColor || 'white' }]}>
          <Text style={styles.modalText}>Está na hora do remédio: {alertName}</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  editButton: {
    //backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    //backgroundColor: 'rgba(255, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
    padding: 35,
  },
  modalText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default CardAlert;
