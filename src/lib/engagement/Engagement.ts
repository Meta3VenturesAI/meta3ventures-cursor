import { supabase } from '../supabase';

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  resource_id: string;
  parent_id?: string;
  created_at: Date;
  updated_at: Date;
}

export class EngagementManager {
  static async addComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        ...comment,
        created_at: new Date(),
        updated_at: new Date()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async toggleLike(userId: string, resourceId: string) {
    const { data: existing, error: checkError } = await supabase
      .from('likes')
      .select()
      .eq('user_id', userId)
      .eq('resource_id', resourceId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existing) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', userId)
        .eq('resource_id', resourceId);

      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('likes')
        .insert([{ user_id: userId, resource_id: resourceId }]);

      if (error) throw error;
      return true;
    }
  }

  static async getEngagementStats(resourceId: string) {
    const { data, error } = await supabase
      .rpc('get_engagement_stats', { resource_id: resourceId });

    if (error) throw error;
    return data;
  }
} 