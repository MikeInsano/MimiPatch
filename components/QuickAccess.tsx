import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const QuickAccess = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accesos rápidos</Text>
      <TouchableOpacity style={ styles.container }>
        <Text style={ styles.buttonText }>📜 NOTIFICACIONES</Text>
      </TouchableOpacity>
      <TouchableOpacity style={ styles.container }>
        <Text style={ styles.buttonText }>⚙️ AJUSTES</Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    gap: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#fff'
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  }
})

export default QuickAccess;
