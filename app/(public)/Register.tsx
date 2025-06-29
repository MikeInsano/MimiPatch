import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerWithSupabase } from '../../contexts/auth/authThunks';
import { RootState } from '../../contexts/store';
import { resetRegistrationStatus } from '../../contexts/auth/authSlice';

export default function Register() {
  const { width } = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, registrationSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (registrationSuccess) {
      Alert.alert(
        'Registro exitoso',
        'Por favor verifica tu correo electrónico para activar tu cuenta',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetRegistrationStatus());
              router.replace('/Login');
            },
          },
        ]
      );
    }
  }, [registrationSuccess]);

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatchError(password !== confirmPassword);
    } else {
      setPasswordMatchError(false);
    }
  }, [password, confirmPassword]);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await dispatch(registerWithSupabase({ email, password, name })).unwrap();
    } catch {
      // El error se muestra desde el estado redux
    }
  };

  return (
    <View style={styles.outer}>
      <View style={[styles.card, width > 768 && styles.cardWeb]}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Completa los campos para registrarte</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={setName}
          />
        </View>

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
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña (mínimo 6 caracteres)"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.icon} />
          <TextInput
            style={[styles.input, passwordMatchError && { borderColor: 'red' }]}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureText}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {passwordMatchError && (
          <Text style={styles.errorText}>Las contraseñas no coinciden</Text>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, (loading || passwordMatchError) && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading || passwordMatchError}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
          <Link href="/Login" replace style={styles.register}>
            Inicia sesión
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
  cardWeb: {
    maxWidth: 640,
    padding: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 32,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6B7280',
  },
  register: {
    color: '#0EA5E9',
    fontWeight: '600',
  },
});
