import { supabase } from '../supabase';

export interface ModeratedComment {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  moderator_id?: string;
  moderation_notes?: string;
}

export class CommentModerator {
  static async moderateComment(commentId: string, decision: ModeratedComment) {
    const { error } = await supabase
      .from('comments')
      .update({
        status: decision.status,
        moderator_id: decision.moderator_id,
        moderation_notes: decision.moderation_notes,
        moderated_at: new Date()
      })
      .eq('id', commentId);

    if (error) throw error;
  }

  static async getPendingComments() {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        users:user_id (
          name,
          email
        )
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async autoModerate(content: string) {
    // Add your content moderation logic here
    const containsProfanity = false; // Implement profanity check
    const isSpam = false; // Implement spam detection
    
    return {
      approved: !containsProfanity && !isSpam,
      flags: {
        profanity: containsProfanity,
        spam: isSpam
      }
    };
  }
} 