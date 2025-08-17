import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

export default function UserDashboard() {
  const { userToken } = useAuthStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me', { headers: { Authorization: `Bearer ${userToken}` } })
       .then(r => setUser(r.data));
  }, [userToken]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </div>
  );
}