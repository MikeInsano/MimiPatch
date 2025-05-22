import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => (
    <View style={ styles.container }>
        <Text style={ styles.title }>Mimi Patch</Text>
        <View style={ styles.contectConnection }>
            <View style={ styles.status }/>
            <Text style={ styles.connection }>Conectado</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 24
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#ffffff'
    },
    contectConnection: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 8
    },
    status: {
        width: 12, 
        height: 12, 
        backgroundColor: '#22c55e', 
        borderRadius: 6
    },
    connection: {
        fontSize: 14, 
        color: '#ffffff'
    }
})

export default Header;
