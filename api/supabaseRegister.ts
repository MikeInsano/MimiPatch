import { supabase } from '../utils/supabase';

export async function registerUser(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'mimipatch://auth/callback', // aquí pones tu esquema de deep link correcto
      data: {
        full_name: name, // metadata adicional
      },
    },
  });

  if (error) throw error;
  return data;
}
