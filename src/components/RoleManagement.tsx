import { RoleManager, Role, Permission } from '../lib/auth/roleManager';

const RoleManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      await RoleManager.updateUserRole(userId, newRole);
      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div class="role-management">
      <h2>Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Current Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {rolePermissions[user.role].join(', ')}
              </td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                >
                  {Object.values(Role).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

<style>
  .role-management {
    padding: 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.5rem;
    border: 1px solid #ddd;
  }

  select {
    padding: 0.25rem;
    border-radius: 4px;
  }
</style> 