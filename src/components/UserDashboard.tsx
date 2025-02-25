import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { trackError, trackMetric } from '../lib/monitoring';

interface UserActivity {
  id: string;
  action: string;
  timestamp: string;
}

interface UserStats {
  totalLogins: number;
  lastActive: string;
  activityCount: number;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: string;
}

export default function UserDashboard() {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalLogins: 0,
    lastActive: '',
    activityCount: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user activities
        const { data: activityData, error: activityError } = await supabase
          .from('user_activities')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(10);

        if (activityError) {
          throw activityError;
        }

        setActivities(activityData || []);

        // Fetch users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, full_name, email, avatar_url, role');

        if (userError) {
          throw userError;
        }

        setUsers(userData || []);

        // Calculate stats
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_user_stats');

        if (statsError) {
          throw statsError;
        }

        setStats(statsData || {
          totalLogins: 0,
          lastActive: new Date().toISOString(),
          activityCount: 0
        });

        // Track dashboard load time
        trackMetric('dashboard_load_time', performance.now());
      } catch (error) {
        trackError(error instanceof Error ? error : new Error('Failed to fetch user data'));
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      trackError(error instanceof Error ? error : new Error('Failed to update user role'));
      console.error('Error updating user role:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      trackError(error instanceof Error ? error : new Error('Failed to delete user'));
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-grid">
        <div className="stats-card">
          <h3>User Statistics</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Logins:</span>
              <span className="stat-value">{stats.totalLogins}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Active:</span>
              <span className="stat-value">
                {new Date(stats.lastActive).toLocaleString()}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Activity Count:</span>
              <span className="stat-value">{stats.activityCount}</span>
            </div>
          </div>
        </div>

        <div className="activity-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activities.map(activity => (
              <div key={activity.id} className="activity-item">
                <span className="activity-action">{activity.action}</span>
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="user-list">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <img 
              src={user.avatar_url || '/default-avatar.png'} 
              alt={user.full_name}
              className="user-avatar"
            />
            <h3>{user.full_name}</h3>
            <p>{user.email}</p>
            <select
              value={user.role}
              onChange={(e) => updateUserRole(user.id, e.target.value)}
              className="role-select"
            >
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button 
              onClick={() => deleteUser(user.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .user-dashboard {
          padding: 2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .stats-card, .activity-card {
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .user-list {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .user-card {
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .role-select {
          width: 100%;
          margin: 0.5rem 0;
          padding: 0.5rem;
          border-radius: 4px;
        }

        .delete-button {
          width: 100%;
          padding: 0.5rem;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-button:hover {
          background: #cc0000;
        }

        .stat-item {
          margin: 0.5rem 0;
          display: flex;
          justify-content: space-between;
        }

        .activity-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}