import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { trackError } from '../lib/monitoring';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface User {
  id: string;
  name: string;
  role: string;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch roles
        const { data: rolesData, error: rolesError } = await supabase
          .from('roles')
          .select('*');

        if (rolesError) throw rolesError;

        // Fetch users with their roles
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, name, role');

        if (usersError) throw usersError;

        setRoles(rolesData || []);
        setUsers(usersData || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        trackError(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    fetchRolesAndUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (updateError) throw updateError;

      setUsers(users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update role';
      setError(errorMessage);
      trackError(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="role-management">
      <div className="roles-section">
        <h2>Roles</h2>
        <table className="roles-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users-section">
        <h2>Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="role-select"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .role-management {
          padding: 2rem;
        }

        .roles-table, .users-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        th, td {
          padding: 0.5rem;
          border: 1px solid #ddd;
          text-align: left;
        }

        th {
          background-color: #f5f5f5;
        }

        .role-select {
          width: 100%;
          padding: 0.25rem;
          border-radius: 4px;
        }

        .users-section {
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}