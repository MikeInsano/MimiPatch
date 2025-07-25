import { logoutWithSupabase } from "@/contexts/auth/authThunks";
import { RootState } from "@/contexts/store";
import { supabase } from "@/utils/supabase";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [babyStatus, setBabyStatus] = useState("Tranquilo💤");
  const [connectionStatus, setConnectionStatus] = useState("Desconectado");
  const [lastMovement, setLastMovement] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedRef = useRef<string | null>(null);

  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("movimientos")
        .select("*")
        .order("fecha_hora", { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const movimiento = data[0];
        const intensidad = movimiento.intensidad;
        const fechaHora = movimiento.fecha_hora;

        setConnectionStatus("Conectado");
        setIsConnected(true);

        // Solo procesar si es un nuevo movimiento (comparando fecha_hora)
        if (fechaHora !== lastProcessedRef.current && intensidad > 0.1) {
          lastProcessedRef.current = fechaHora;

          setLastMovement(new Date(fechaHora).toLocaleTimeString());
          setBabyStatus("¡Movimiento detectado!");

          clearExistingTimeout();
          timeoutRef.current = setTimeout(() => {
            setBabyStatus("Tranquilo");
            timeoutRef.current = null;
          }, 3000);
        }
      } else {
        setConnectionStatus("Sin datos");
        setIsConnected(false);
        setLastMovement(null);
        setBabyStatus("Tranquilo");
      }
    } catch (error) {
      console.error("Error al obtener datos de Supabase:", error);
      setConnectionStatus("Desconectado");
      setIsConnected(false);
      setBabyStatus("Tranquilo");
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
    Alert.alert("Estado de conexión", `Estado: ${connectionStatus}`, [
      { text: "OK" },
    ]);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres salir de tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(logoutWithSupabase()).unwrap();
            } catch (error) {
              Alert.alert("Error", "No se pudo cerrar sesión");
              console.error("Error al cerrar sesión:", error);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f4f9" }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mimi Patch</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={testConnection}
              style={[
                styles.connectionButton,
                isConnected
                  ? styles.connectedButton
                  : styles.disconnectedButton,
              ]}
            >
              <Text style={styles.connectionText}>{connectionStatus}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.section}>
            <View style={styles.soundFinalWrapper}>
              <Image
                source={{
                  uri: "https://babysandkids.com.mx/cdn/shop/files/gigoteuse-bebe-gaze-coton-ete-vert-maison-charlotte-1_b9c3715c-7ee6-45eb-a9e3-43fd9da77d5e.jpg?v=1721753181&width=1445",
                }}
                style={styles.soundFinalImage}
              />
              <View style={styles.soundFinalTextContainer}>
                <Text style={styles.soundFinalTitle}>Calma sonora</Text>
                <Text style={styles.soundFinalSubtitle}>
                  Un ambiente suave y constante que ayuda a tu bebé a sentirse
                  seguro y tranquilo.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View
              style={[
                styles.babyCardWrapper,
                babyStatus.includes("¡Movimiento")
                  ? styles.babyCardAlert
                  : styles.babyCardCalm,
              ]}
            >
              <View style={styles.ribbon}>
                <Text style={styles.ribbonText}>
                  {babyStatus.includes("¡Movimiento")
                    ? "¡Alerta de Movimiento!"
                    : "Estado estable"}
                </Text>
              </View>

              <Text style={styles.cardTitle}>El bebé se encuentra</Text>

              <View style={styles.statusContent}>
                <Text style={styles.statusDetails}>
                  {babyStatus}{" "}
                  {babyStatus.includes("¡Movimiento") ? "💢" : "💤"}
                </Text>
              </View>
            </View>
          </View>

          {lastMovement && (
            <View style={styles.section}>
              <View style={styles.movement3DCard}>
                <Text style={styles.movement3DLabel}>Último movimiento</Text>
                <Text style={styles.movement3DTime}>{lastMovement}</Text>
                <Text style={styles.movement3DDescription}>
                  Actividad detectada recientemente
                </Text>
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonRow}>
          <View style={styles.logoutIconCircle}>
            <Text style={styles.logoutIconText}>⇦</Text>
          </View>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  soundFinalWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef3fb",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#dbe4f3",
  },

  soundFinalImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e7f5",
    marginRight: 16,
    backgroundColor: "#fff",
  },

  soundFinalTextContainer: {
    flex: 1,
    justifyContent: "center",
  },

  soundFinalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 6,
  },

  soundFinalSubtitle: {
    fontSize: 14,
    color: "#607d8b",
    lineHeight: 20,
  },

  logoutButtonRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: "#fdecec",
    borderWidth: 1,
    borderColor: "#f8c6c6",
    shadowColor: "#d87c7c",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  logoutIconCircle: {
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },

  logoutIconText: {
    color: "#c62828",
    fontSize: 18,
    fontWeight: "bold",
  },

  logoutText: {
    color: "#c62828",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.08)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textTransform: "uppercase",
  },

  movement3DCard: {
    backgroundColor: "#f2f6ff",
    borderRadius: 24,
    paddingVertical: 34,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",

    // Sombra interna clara
    shadowColor: "#ffffff",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 8,

    // Sombra externa oscura
    elevation: 10,
    shadowColor: "#c5d0e8",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 12,

    // Borde fino y casi invisible para textura
    borderWidth: 0.7,
    borderColor: "#e0e7f5",
  },

  movement3DLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7482a6",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },

  movement3DTime: {
    fontSize: 40,
    fontWeight: "800",
    color: "#2a2e45",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  movement3DDescription: {
    fontSize: 15,
    color: "#5e2ca5",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 260,
  },

  babyCardWrapper: {
    backgroundColor: "#f2f6ff", // Color base azul pastel
    borderRadius: 25,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 28,

    // Sombra clara simulando iluminación superior
    shadowColor: "#ffffff",
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 8,

    // Sombra oscura para profundidad real
    elevation: 10,
    shadowColor: "#c5d0e8",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,

    borderWidth: 1,
    borderColor: "#e0e7f5",
  },

  babyCardCalm: {
    backgroundColor: "#eaf4ff",
    borderColor: "#d0e3fa",
  },

  babyCardAlert: {
    backgroundColor: "#ffeaea",
    borderColor: "#f5c5c5",
  },

  ribbon: {
    position: "absolute",
    top: -14,
    left: 22,
    backgroundColor: "#5e2ca5",
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  ribbonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 14,
  },

  statusContent: {
    alignItems: "center",
    paddingHorizontal: 16,
  },

  statusHeadline: {
    fontSize: 18,
    fontWeight: "700",
    color: "#263238",
    marginBottom: 6,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.08)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  statusDetails: {
    fontSize: 16,
    color: "#5e2ca5",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 250,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: 45,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5e2ca5",
  },
  connectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  connectedButton: {
    backgroundColor: "#e0f7fa",
    borderWidth: 1,
    borderColor: "#00acc1",
  },
  disconnectedButton: {
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ef5350",
  },
  connectionText: {
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
});
