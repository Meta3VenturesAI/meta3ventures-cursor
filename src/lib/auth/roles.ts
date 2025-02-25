export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}

export interface Permission {
  action: string;
  resource: string;
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    { action: '*', resource: '*' }
  ],
  [UserRole.EDITOR]: [
    { action: 'read', resource: '*' },
    { action: 'write', resource: 'content' }
  ],
  [UserRole.USER]: [
    { action: 'read', resource: 'content' }
  ]
};

export const checkPermission = (
  userRole: UserRole,
  action: string,
  resource: string
): boolean => {
  const permissions = rolePermissions[userRole];
  return permissions.some(permission => 
    (permission.action === '*' || permission.action === action) &&
    (permission.resource === '*' || permission.resource === resource)
  );
}; 