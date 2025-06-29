import { Stack } from 'expo-router';

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Index" />
      {/* Puedes agregar más pantallas si las hay */}
    </Stack>
  );
}
