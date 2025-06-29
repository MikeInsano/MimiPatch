import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, loginWithMagicLink } from '@/api/supabaseLogin';
import { registerUser } from '@/api/supabaseRegister';

// Thunk para login con supabase
export const loginWithSupabase = createAsyncThunk(
  'auth/loginWithSupabase',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginUser(email, password);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error de autenticación');
    }
  }
);

export const loginWithMagicLinkThunk = createAsyncThunk(
  'auth/loginWithMagicLink',
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await loginWithMagicLink(email);
      return null; // No user object, solo aviso de éxito
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error al enviar enlace mágico');
    }
  }
);

export const registerWithSupabase = createAsyncThunk(
  'auth/registerWithSupabase',
  async (
    { email, password, name }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await registerUser(email, password, name);
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error en el registro');
    }
  }
);