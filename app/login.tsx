import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.card, width > 600 && styles.cardWeb]}>
        <Text style={styles.title}>Bienvenido</Text>

        <View style={styles.spacer} />

        {/* Correo */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.spacer} />

        {/* Contraseña */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9CA3AF"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        {/* Botón */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.register}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    paddingVertical: 56, // MÁS ALTO
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    justifyContent: 'space-between',
  },
  cardWeb: {
    maxWidth: 480,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  spacer: {
    height: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 'auto',
  },
  input: {
    flex: 1,
    height: 48,
    color: '#111827',
    outlineStyle: 'none',
  },
  button: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#6B7280',
  },
  register: {
    color: '#0EA5E9',
    fontWeight: '600',
  },
});
