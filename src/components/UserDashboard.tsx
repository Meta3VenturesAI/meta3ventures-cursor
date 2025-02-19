import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  role: string;
  full_name?: string;
  avatar_url?: string;
  settings: Record<string, any>;
}

const UserDashboard = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*');
    
    if (data) setUsers(data);
    setLoading(false);
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (!error) fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);

    if (!error) fetchUsers();
  };

  return (
    <div class="user-dashboard">
      <div class="user-list">
        {users.map(user => (
          <div class="user-card" key={user.id}>
            <img src={user.avatar_url || '/default-avatar.png'} alt={user.full_name} />
            <h3>{user.full_name}</h3>
            <p>{user.email}</p>
            <select 
              value={user.role}
              onChange={(e) => updateUserRole(user.id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

<style>
  .user-dashboard {
    padding: 2rem;
  }

  .user-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }

  .user-card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
  }

  .user-card img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 1rem;
  }
</style> 