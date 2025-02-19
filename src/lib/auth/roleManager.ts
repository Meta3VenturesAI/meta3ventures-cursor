export enum Permission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  MANAGE_USERS = 'manage_users',
  MANAGE_ROLES = 'manage_roles'
}

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}

export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.EDITOR]: [Permission.READ, Permission.WRITE],
  [Role.USER]: [Permission.READ]
};

export class RoleManager {
  static hasPermission(userRole: Role, permission: Permission): boolean {
    return rolePermissions[userRole]?.includes(permission) || false;
  }

  static async updateUserRole(userId: string, newRole: Role) {
    const { error } = await supabase
      .from('user_profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) throw error;
  }
} 