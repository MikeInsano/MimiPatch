import { createSlice } from '@reduxjs/toolkit';
import { loginWithSupabase, registerWithSupabase, loginWithMagicLinkThunk } from './authThunks';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
  registrationSuccess: boolean;
  magicLinkSent: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  registrationSuccess: false,
  magicLinkSent: false,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.registrationSuccess = false;
    },
    resetRegistrationStatus: (state) => {
      state.registrationSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Casos para login
      .addCase(loginWithSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithSupabase.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginWithSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Error de autenticación';
      })

      // Casos para deep
      .addCase(loginWithMagicLinkThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.magicLinkSent = false;
      })
      .addCase(loginWithMagicLinkThunk.fulfilled, (state) => {
        state.loading = false;
        state.magicLinkSent = true;
      })
      .addCase(loginWithMagicLinkThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Error al enviar enlace mágico';
        state.magicLinkSent = false;
      })
      
      // Casos para registro
      .addCase(registerWithSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerWithSupabase.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
      })
      .addCase(registerWithSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Error en el registro';
      });
  },
});

export const { logout, resetRegistrationStatus } = authSlice.actions;
export default authSlice.reducer;