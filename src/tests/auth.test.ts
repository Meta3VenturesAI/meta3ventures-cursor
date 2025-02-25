import { describe, it, expect } from 'vitest';
import { authService } from '../lib/auth';
import { checkPermission, UserRole } from '../lib/auth/roles';

describe('Authentication', () => {
  it('should check permissions correctly', () => {
    expect(checkPermission(UserRole.ADMIN, 'write', 'content')).toBe(true);
    expect(checkPermission(UserRole.USER, 'write', 'content')).toBe(false);
  });
}); 