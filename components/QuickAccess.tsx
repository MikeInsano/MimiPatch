import React from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';

const QuickAccess = () => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Accesos rápidos</Text>
      <Button title="📜 Historial de eventos" onPress={() => Alert.alert('Ir al historial')} />
      <Button title="🎵 Sonidos y videos" onPress={() => Alert.alert('Ir a multimedia')} />
      <Button title="⚙️ Ajustes" onPress={() => Alert.alert('Ir a ajustes')} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff', 
        borderRadius: 16, 
        padding: 16, 
        gap: 8
    },
    title: {
        fontSize: 16, 
        fontWeight: '600', 
        marginBottom: 2
    }
})

export default QuickAccess;
