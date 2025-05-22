import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const Player = () => {
  const reproducirSonido = () => {
    Alert.alert('Reproduciendo sonido relajante...');
  };

  return (
    <View style={ styles.container }>
      <Text style={ styles.sound }>Reproducir sonido relajante</Text>
      <Button title="▶️ Reproducir" onPress={reproducirSonido} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 20, 
        padding: 16, 
        alignItems: 'center',
        borderColor: '#fff', 
        borderWidth: 1 
    },
    sound: {
        fontSize: 16, 
        fontWeight: '600', 
        marginBottom: 8
    }
})

export default Player;
