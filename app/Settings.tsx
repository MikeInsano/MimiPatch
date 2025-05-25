import Header from '@/components/Header';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Settings() {
    const [modoOscuro, setModoOscuro] = useState(false);
    const [alertasSonido, setAlertasSonido] = useState(true);
    const [alertasMovimiento, setAlertasMovimiento] = useState(true);
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <Header />
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>⚙️ Ajustes</Text>

            <View style={styles.optionRow}>
                <Text style={styles.optionText}>Modo oscuro</Text>
                <Switch value={modoOscuro} onValueChange={setModoOscuro} />
            </View>

            <View style={styles.optionRow}>
                <Text style={styles.optionText}>Alertas de sonido</Text>
                <Switch value={alertasSonido} onValueChange={setAlertasSonido} />
            </View>

            <View style={styles.optionRow}>
                <Text style={styles.optionText}>Alertas de movimiento</Text>
                <Switch value={alertasMovimiento} onValueChange={setAlertasMovimiento} />
            </View>

            <View style={styles.optionRow}>
                <Text style={styles.optionText}>Enviar reportes por correo</Text>
                {/* Por ahora no tiene switch, es solo texto */}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 24,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionText: {
        color: '#EEE',
        fontSize: 18,
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
    }
});
