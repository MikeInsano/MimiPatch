import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Player = () => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.sound }>Reproducir sonido relajante</Text>
      <TouchableOpacity style={ styles.container }>
        <Text style={ styles.buttonText }>▶️ REPRODUCIR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  sound: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#fff",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  }
});

export default Player;
