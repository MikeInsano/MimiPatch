import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const notificacionesEjemplo = [
    { id: '1', title: 'Movimiento detectado', description: 'Se detectó movimiento a las 08:30 AM' },
    { id: '2', title: 'Alerta de sonido', description: 'Ruido fuerte registrado a las 09:00 AM' },
    { id: '3', title: 'Sensor desconectado', description: 'El sensor de sonido se desconectó' },
];

export default function Notifications() {
    const [notificaciones, setNotificaciones] = useState(notificacionesEjemplo);

    const eliminarNotificacion = (id: string) => {
        setNotificaciones(prev => prev.filter(notif => notif.id !== id));
    };

    const eliminarTodas = () => {
        setNotificaciones([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📜 Notificaciones</Text>

            {notificaciones.length > 0 ? (
                <>
                    <FlatList
                        data={notificaciones}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.notificationCard}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.notificationTitle}>{item.title}</Text>
                                        <Text style={styles.notificationDescription}>{item.description}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => eliminarNotificacion(item.id)}>
                                        <Text style={styles.deleteText}>🗑️</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        contentContainerStyle={{ paddingBottom: 24 }}
                    />

                    <TouchableOpacity onPress={eliminarTodas} style={styles.container}>
                        <Text style={styles.clearAllText}>Eliminar todas</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={{ color: '#aaa', marginTop: 20 }}>No hay notificaciones.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1,
        gap: 10
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
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 15,
        width: 300
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
    deleteText: {
        fontSize: 18,
        color: '#FF7070',
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
    },
    clearAllText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "500",
    },

});
