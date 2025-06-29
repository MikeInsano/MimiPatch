import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f4f9' }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Mimi Patch</Text>
          <View style={styles.user}>
            <Text>Hola, Usuario!</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.label}>Estado del bebé:</Text>
            <View style={styles.statusRow}>
              <TextInput value="Tranquilo" editable={false} style={styles.inputStatus} />
              <Text style={styles.status}>Conectado</Text>
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
                <Text style={styles.artist}>Leonid Kogan, Vivaldi, Mendelssohn</Text>
              </View>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={{ fontWeight: 'bold' }}>Cambiar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.notificationBox}>
              <Text style={styles.notificationTitle}>Notificaciones</Text>
              <View style={styles.notificationBubble}>
                <Text style={{ color: '#5e2ca5' }}>Se detectó movimiento a las 8:30 AM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
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
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  inputStatus: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b5d0f0',
    borderRadius: 12,
    backgroundColor: '#eaf4ff',
    color: '#0088cc',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  status: {
    color: '#00c58e',
    fontWeight: '500',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  trackCard: {
    backgroundColor: '#f6f8fc',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
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
  },
  artist: {
    fontSize: 14,
    color: '#666',
  },
  changeBtn: {
    backgroundColor: '#ddd',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  notificationBox: {
    borderWidth: 2,
    borderColor: '#d6c8f9',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#f9f6ff',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  notificationBubble: {
    backgroundColor: '#d6c8f9',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
});
