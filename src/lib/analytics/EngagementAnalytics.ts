import { supabase } from '../supabase';

export class EngagementAnalytics {
  static async trackEvent(event: {
    type: string;
    userId: string;
    resourceId: string;
    metadata?: Record<string, any>;
  }) {
    const { error } = await supabase
      .from('analytics_events')
      .insert([{
        ...event,
        timestamp: new Date()
      }]);

    if (error) throw error;
  }

  static async getMetrics(timeframe: 'day' | 'week' | 'month') {
    const { data, error } = await supabase
      .rpc('get_engagement_metrics', { timeframe });

    if (error) throw error;
    return data;
  }

  static async getUserJourney(userId: string) {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: true });

    if (error) throw error;
    return data;
  }
} 