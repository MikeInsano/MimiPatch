// app/auth/callback.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Linking, ActivityIndicator, View, Text } from 'react-native';
import { supabase } from '../../utils/supabase';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function AuthCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleDeepLink = async () => {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          console.log('🔗 Deep link recibido:', url);

          // Extrae la sesión desde el URL
          const { data, error } = await supabase.auth.exchangeCodeForSession(url);

          if (error) {
            console.error('❌ Error al obtener la sesión:', error.message);
            setError(error.message);
            return;
          }

          console.log('✅ Sesión obtenida:', data);
        } else {
          setError('No se recibió ningún enlace.');
        }
      } catch (err: any) {
        console.error('❌ Error al manejar el deep link:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        // Puedes redirigir al home o a otra pantalla
        router.replace('/');
      }
    };

    handleDeepLink();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Procesando inicio de sesión...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', marginBottom: 8 }}>Error:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return null;
}
