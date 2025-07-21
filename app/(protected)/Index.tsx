import { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

export default function Home() {
  const [babyStatus, setBabyStatus] = useState('Tranquilo');
  const [connectionStatus, setConnectionStatus] = useState('Desconectado');
  const [lastMovement, setLastMovement] = useState(null);
  const [ipAddress, setIpAddress] = useState('192.168.100.21'); // Cambia por la IP de tu ESP32
  const [isConnected, setIsConnected] = useState(false);

  // Función mejorada para obtener datos del ESP32
  const fetchData = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(`http://${ipAddress}/datos`, {
        signal: controller.signal
      });
      
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      
      const data = await response.json();
      
      // Actualizar estado según los datos recibidos
      if (data.movimiento) {
        setBabyStatus('¡Movimiento detectado!');
        setLastMovement(new Date().toLocaleTimeString());
      } else {
        setBabyStatus('Tranquilo');
      }
      
      setConnectionStatus('Conectado');
      setIsConnected(true);
      
    } catch (error) {
      setConnectionStatus('Desconectado');
      setIsConnected(false);
      console.error('Error de conexión:', error.message);
    }
  };

  // Configurar polling mejorado
  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(() => {
      if (isMounted) fetchData();
    }, 1000);
    
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [ipAddress]);

  // Función para probar la conexión manualmente
  const testConnection = async () => {
    await fetchData();
    Alert.alert(
      'Estado de conexión',
      `IP: ${ipAddress}\nEstado: ${connectionStatus}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f9' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mimi Patch</Text>
          <TouchableOpacity 
            onPress={testConnection} 
            style={[
              styles.connectionButton,
              isConnected ? styles.connectedButton : styles.disconnectedButton
            ]}
          >
            <Text style={styles.connectionText}>{connectionStatus}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.label}>Estado del bebé:</Text>
            <View style={styles.statusRow}>
              <TextInput 
                value={babyStatus} 
                editable={false} 
                style={[
                  styles.inputStatus,
                  babyStatus.includes('¡Movimiento') ? styles.alertStatus : styles.normalStatus
                ]} 
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>En Reproducción:</Text>
            <View style={styles.trackCard}>
              <Image
                source={{
                  uri: 'https://babysandkids.com.mx/cdn/shop/files/gigoteuse-bebe-gaze-coton-ete-vert-maison-charlotte-1_b9c3715c-7ee6-45eb-a9e3-43fd9da77d5e.jpg?v=1721753181&width=1445',
                }}
                style={styles.image}
              />
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>Ruido Blanco</Text>
                <Text style={styles.artist}>Sonido relajante para bebés</Text>
              </View>
            </View>
          </View>

          {lastMovement && (
            <View style={styles.section}>
              <View style={styles.notificationBox}>
                <Text style={styles.notificationTitle}>Último evento</Text>
                <View style={styles.notificationBubble}>
                  <Text style={styles.notificationText}>
                    Movimiento detectado a las {lastMovement}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e2ca5',
  },
  connectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectedButton: {
    backgroundColor: '#e0f7fa',
    borderWidth: 1,
    borderColor: '#00acc1',
  },
  disconnectedButton: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  connectionText: {
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
  },
  inputStatus: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
  },
  normalStatus: {
    borderColor: '#b5d0f0',
    backgroundColor: '#eaf4ff',
    color: '#0088cc',
  },
  alertStatus: {
    borderColor: '#ffb5b5',
    backgroundColor: '#ffeaea',
    color: '#ff0000',
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  trackCard: {
    backgroundColor: '#f6f8fc',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: '#666',
  },
  notificationBox: {
    borderWidth: 1,
    borderColor: '#d1c4e9',
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#f3e5f5',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#5e2ca5',
  },
  notificationBubble: {
    backgroundColor: '#e1bee7',
    padding: 12,
    borderRadius: 12,
  },
  notificationText: {
    color: '#4a148c',
    textAlign: 'center',
  },
  ipConfigContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ipInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#b39ddb',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#5e2ca5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});