import slugify from 'slugify';
import { supabase } from '../supabase';
import { trackError } from '../monitoring';

interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  icon?: string;
  metadata?: Record<string, any>;
}

type CategoryCreate = Omit<Category, 'id' | 'slug'>;
type CategoryUpdate = Partial<CategoryCreate>;

export async function createCategory(category: CategoryCreate) {
  try {
    const slug = slugify(category.name, { lower: true, strict: true });

    const { data, error } = await supabase
      .from('categories')
      .insert([{ ...category, slug }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Error creating category'));
    throw error;
  }
}

export async function getHierarchy() {
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

export async function assignToResource(resourceId: string, categoryIds: string[]) {
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

export async function getCategories() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return categories || [];
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Error fetching categories'));
    throw error;
  }
}

export async function updateCategory(id: string, updates: CategoryUpdate) {
  try {
    const updateData: CategoryUpdate & { slug?: string } = { ...updates };
    if (updates.name) {
      updateData.slug = slugify(updates.name, { lower: true, strict: true });
    }

    const { error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Error updating category'));
    throw error;
  }
}