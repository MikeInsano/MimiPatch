import { supabase } from '../utils/supabase';

export async function registerUser(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'mimipatch://auth/callback',
      data: {
        full_name: name,
      },
    },
  });

  if (error) throw error;
  return data;
}
