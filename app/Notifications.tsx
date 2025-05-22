import Header from '@/components/Header';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const notificacionesEjemplo = [
    { id: '1', title: 'Movimiento detectado', description: 'Se detectó movimiento a las 08:30 AM' },
    { id: '2', title: 'Alerta de sonido', description: 'Ruido fuerte registrado a las 09:00 AM' },
    { id: '3', title: 'Sensor desconectado', description: 'El sensor de sonido se desconectó' },
];

export default function Notifications() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Header />
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>📜 Notificaciones</Text>

            <FlatList
                data={notificacionesEjemplo}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationCard}>
                        <Text style={styles.notificationTitle}>{item.title}</Text>
                        <Text style={styles.notificationDescription}>{item.description}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
    },
    backButton: {
        marginBottom: 12,
        paddingVertical: 6,
        paddingHorizontal: 8,
        alignSelf: 'flex-start',
        backgroundColor: '#3A3A3A',
        borderRadius: 6,
    },
    backText: {
        color: '#FFF',
        fontSize: 16,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
    },
    notificationCard: {
        backgroundColor: '#2E2E2E',
        borderRadius: 12,
        padding: 16,
    },
    notificationTitle: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 16,
    },
    notificationDescription: {
        color: '#CCC',
        marginTop: 6,
        fontSize: 14,
    },
});
