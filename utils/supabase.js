import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';

const supabaseUrl = 'https://owrnjlxqtfnyoolxxcwr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93cm5qbHhxdGZueW9vbHh4Y3dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODcyODgsImV4cCI6MjA2NjM2MzI4OH0.Z3ZEAnf5HR7pRKQdJ8wmNUsj3F8fXCqmSdemu8XUBy4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS !== 'web',
  },
});
