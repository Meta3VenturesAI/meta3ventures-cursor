import { supabase } from '../supabase';

export interface Notification {
  id: string;
  user_id: string;
  type: 'comment' | 'like' | 'mention' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: Date;
}

export class NotificationManager {
  static async createNotification(notification: Omit<Notification, 'id' | 'created_at' | 'read'>) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        ...notification,
        read: false,
        created_at: new Date()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserNotifications(userId: string, options = { unreadOnly: false }) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (options.unreadOnly) {
      query = query.eq('read', false);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  }

  static async subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => callback(payload.new as Notification)
      )
      .subscribe();
  }
} 