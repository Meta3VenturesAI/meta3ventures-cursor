import { supabase } from './supabase';

export interface Content {
  id?: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  created_at?: string;
}

export const cmsService = {
  async getContents() {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createContent(content: Content) {
    const { data, error } = await supabase
      .from('contents')
      .insert([content])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async updateContent(id: string, updates: Partial<Content>) {
    const { data, error } = await supabase
      .from('contents')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
}; 