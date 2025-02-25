import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.PUBLIC_SUPABASE_URL || !import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export type { SupabaseClient } from '@supabase/supabase-js';

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