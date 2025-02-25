import { supabase } from '../supabase';
import { trackError } from '../monitoring';

export type RoleType = 'admin' | 'editor' | 'user';

export interface Role {
  id: string;
  name: RoleType;
  permissions: string[];
}

export type Permission = 'create' | 'read' | 'update' | 'delete' | 'manage_users';

const rolePermissionMap: Record<RoleType, Permission[]> = {
  admin: ['create', 'read', 'update', 'delete', 'manage_users'],
  editor: ['create', 'read', 'update'],
  user: ['read']
};

export async function hasPermission(userId: string, permission: Permission): Promise<boolean> {
  try {
    const userRole = await getUserRole(userId);
    if (!userRole) return false;
    return rolePermissionMap[userRole.name]?.includes(permission) || false;
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Failed to check permissions'));
    return false;
  }
}

export async function assignRole(userId: string, roleId: string) {
  try {
    const { error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role_id: roleId });

    if (error) throw error;
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Failed to assign role'));
    throw error;
  }
}

export async function getRoles(): Promise<Role[]> {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*');

    if (error) throw error;
    return (data || []) as Role[];
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Failed to fetch roles'));
    throw error;
  }
}

export async function getUserRole(userId: string): Promise<Role | null> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        roles (
          id,
          name,
          permissions
        )
      `)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!data?.roles) return null;

    // Safe type assertion since we're selecting specific fields
    const role = data.roles as unknown as Role;
    return role;
  } catch (error) {
    trackError(error instanceof Error ? error : new Error('Failed to fetch user role'));
    throw error;
  }
}