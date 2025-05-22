import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BabyStatus = () => (
    <View style={ styles.container }>
        <View style={ styles.contentRow }>
            <View style={ styles.contentBaby }>
                <Text style={ styles.emoji }>👶</Text>
            </View>
            <View>
                <Text style={ styles.statusTitle }>Estado del bebé:</Text>
                <Text style={ styles.statusValue }>Tranquilo</Text>
            </View>
        </View>
        <Text style={ styles.statusMovement }>Sonido detectado hace 3 minutos</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 20, 
    padding: 16, 
    marginBottom: 12, 
    borderColor: '#fff', 
    borderWidth: 1 
  },
  contentRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 16
  },
  contentBaby: {
    width: 40, 
    height: 40, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  emoji: {
    fontSize: 20
  },
  statusTitle: {
    fontSize: 18, 
    fontWeight: '600', 
    color: '#fff'
  },
  statusValue: {
    fontSize: 16,
    color: '#fff'
  },
  statusMovement: {
    fontSize: 13, 
    color: '#fff', 
    marginTop: 8
  }
})

export default BabyStatus;
