import { supabase } from '../supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  icon?: string;
  metadata: Record<string, any>;
}

export class CategoryManager {
  static async createCategory(category: Omit<Category, 'id' | 'slug'>) {
    const slug = slugify(category.name, { lower: true });
    
    const { data, error } = await supabase
      .from('categories')
      .insert([{ ...category, slug }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getHierarchy() {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*');

    if (error) throw error;

    const buildTree = (parentId: string | null = null): any[] => {
      return categories
        .filter(cat => cat.parent_id === parentId)
        .map(cat => ({
          ...cat,
          children: buildTree(cat.id)
        }));
    };

    return buildTree();
  }

  static async assignToResource(resourceId: string, categoryIds: string[]) {
    const { error } = await supabase
      .from('resource_categories')
      .upsert(
        categoryIds.map(categoryId => ({
          resource_id: resourceId,
          category_id: categoryId
        }))
      );

    if (error) throw error;
  }
} 