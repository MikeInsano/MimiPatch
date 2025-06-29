import { supabase } from '../utils/supabase';

export async function loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

  if (error) {
    throw error;
  }
  return data;
}

export async function loginWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'mimipatch://auth/callback',
      shouldCreateUser: true,
    },
  });

  if (error) throw error;
  return true;
}