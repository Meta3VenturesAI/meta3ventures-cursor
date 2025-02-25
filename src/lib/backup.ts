import { supabase } from './supabase';

export class BackupService {
  static async createBackup() {
    const timestamp = new Date().toISOString();
    const tables = ['user_profiles', 'metrics', 'activity_logs'];
    const backup: Record<string, any> = {};

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) {
        throw new Error(`Failed to backup ${table}: ${error.message}`);
      }

      backup[table] = data;
    }

    // Store backup in Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from('backups')
      .upload(
        `backup-${timestamp}.json`,
        JSON.stringify(backup)
      );

    if (uploadError) {
      throw new Error(`Failed to upload backup: ${uploadError.message}`);
    }

    return timestamp;
  }

  static async restoreBackup(timestamp: string) {
    // Download backup
    const { data, error } = await supabase
      .storage
      .from('backups')
      .download(`backup-${timestamp}.json`);

    if (error) {
      throw new Error(`Failed to download backup: ${error.message}`);
    }

    const backup = JSON.parse(await data.text());

    // Restore each table
    for (const [table, records] of Object.entries(backup)) {
      const { error: restoreError } = await supabase
        .from(table)
        .upsert(records);

      if (restoreError) {
        throw new Error(`Failed to restore ${table}: ${restoreError.message}`);
      }
    }

    return true;
  }
} 