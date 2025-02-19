import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseConfigured(): boolean {
  return !!supabase;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!supabase) return false;
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count')
      .limit(1);
      
    return !error;
  } catch (e) {
    console.error('Database connection error:', e);
    return false;
  }
}

export interface MigrationStatus {
  isComplete: boolean;
  pendingMigrations: string[];
  error?: string;
}

export async function checkMigrationStatus(): Promise<MigrationStatus> {
  if (!supabase) {
    return {
      isComplete: false,
      pendingMigrations: [],
      error: 'Supabase client not initialized'
    };
  }

  try {
    // Check if essential tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) throw tablesError;

    const requiredTables = [
      'applications',
      'blog_posts',
      'resources',
      'contact_messages'
    ];

    const existingTables = tables?.map(t => t.table_name) || [];
    const pendingTables = requiredTables.filter(table => !existingTables.includes(table));

    return {
      isComplete: pendingTables.length === 0,
      pendingMigrations: pendingTables
    };
  } catch (e) {
    console.error('Error checking migration status:', e);
    return {
      isComplete: false,
      pendingMigrations: [],
      error: e instanceof Error ? e.message : 'Unknown error checking migrations'
    };
  }
}