import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Only create the client in browser environment
const supabase = typeof window !== 'undefined' && supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseConfigured(): boolean {
  try {
    return !!supabase;
  } catch (error) {
    console.error('Error checking Supabase configuration:', error);
    return false;
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!supabase) return false;
  
  try {
    const { error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1)
      .single();
      
    return !error;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export { supabase };