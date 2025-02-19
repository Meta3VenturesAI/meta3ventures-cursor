import { supabase } from '../supabase';

export interface SearchOptions {
  type?: 'blog' | 'resource' | 'all';
  query: string;
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

export class SearchEngine {
  static async search({ type, query, filters = {}, page = 0, limit = 10 }: SearchOptions) {
    let searchQuery = supabase
      .rpc('search_content', {
        search_query: query,
        content_type: type || 'all'
      });

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        searchQuery = searchQuery.contains(key, value);
      } else {
        searchQuery = searchQuery.eq(key, value);
      }
    });

    // Pagination
    const { data, error } = await searchQuery
      .range(page * limit, (page + 1) * limit - 1);

    if (error) throw error;
    return data;
  }

  static async suggest(query: string, type?: string) {
    const { data, error } = await supabase
      .rpc('get_suggestions', {
        query_text: query,
        content_type: type
      });

    if (error) throw error;
    return data;
  }
} 