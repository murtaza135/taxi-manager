import { supabase } from '@/config/api/supabaseClient';

export async function login(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}
