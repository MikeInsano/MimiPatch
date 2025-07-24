import { useState, useEffect, useRef } from 'react';
import {
  Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View, Alert, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutWithSupabase } from '@/contexts/auth/authThunks';
import { RootState } from '@/contexts/store';
import { supabase } from '@/utils/supabase';

export default function Home() {
  const [babyStatus, setBabyStatus] = useState('Tranquilo');
  const [connectionStatus, setConnectionStatus] = useState('Desconectado');
  const [lastMovement, setLastMovement] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedRef = useRef<string | null>(null);

  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state: RootState) => state.auth);

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from('movimientos')
      .select('*')
      .order('fecha_hora', { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      const movimiento = data[0];
      const intensidad = movimiento.intensidad;
      const fechaHora = movimiento.fecha_hora;

      setConnectionStatus('Conectado');
      setIsConnected(true);

      // Solo procesar si es un nuevo movimiento (comparando fecha_hora)
      if (fechaHora !== lastProcessedRef.current && intensidad > 0.1) {
        lastProcessedRef.current = fechaHora;

        setLastMovement(new Date(fechaHora).toLocaleTimeString());
        setBabyStatus('¡Movimiento detectado!');

        clearExistingTimeout();
        timeoutRef.current = setTimeout(() => {
          setBabyStatus('Tranquilo');
          timeoutRef.current = null;
        }, 3000);
      }
    } else {
      setConnectionStatus('Sin datos');
      setIsConnected(false);
      setLastMovement(null);
      setBabyStatus('Tranquilo');
    }
  } catch (error) {
    console.error('Error al obtener datos de Supabase:', error);
    setConnectionStatus('Desconectado');
    setIsConnected(false);
    setBabyStatus('Tranquilo');
    setLastMovement(null);
  }
};



  useEffect(() => {
    fetchData(); // inicial
    const interval = setInterval(fetchData, 1000);
    return () => {
      clearInterval(interval);
      clearExistingTimeout();
    };
  }, []);

  const testConnection = async () => {
    await fetchData();
    Alert.alert(
      'Estado de conexión',
      `Estado: ${connectionStatus}`,
      [{ text: 'OK' }]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres salir de tu cuenta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logoutWithSupabase()).unwrap();
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
              console.error('Error al cerrar sesión:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5e2ca5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f9' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mimi Patch</Text>
          <View style={styles.headerRight}>
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

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: 45
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  logoutText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 16,
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
});
