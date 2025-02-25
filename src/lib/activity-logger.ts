import { supabase } from './supabase';

export interface ActivityLog {
  user_id: string;
  action: string;
  resource: string;
  details: any;
  timestamp: Date;
}

export class ActivityLogger {
  static async log(activity: Omit<ActivityLog, 'timestamp'>) {
    const { error } = await supabase
      .from('activity_logs')
      .insert([{
        ...activity,
        timestamp: new Date()
      }]);

    if (error) {
      console.error('Failed to log activity:', error);
    }
  }

  static async getUserActivity(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return data;
  }
} 