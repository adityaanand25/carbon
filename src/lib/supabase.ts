import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// For development purposes, we'll create a client even with placeholder values
// In production, ensure these environment variables are properly set
export const supabase = createClient(supabaseUrl, supabaseAnonKey);