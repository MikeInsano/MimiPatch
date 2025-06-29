import { Slot, useRouter } from 'expo-router';
import { useSelector, Provider } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import store, { RootState } from '../contexts/store';
import React, { useEffect, useRef } from 'react';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthContent />
    </Provider>
  );
}

function AuthContent() {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace('/(protected)/Index');
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
