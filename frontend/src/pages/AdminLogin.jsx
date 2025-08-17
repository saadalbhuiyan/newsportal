import { useState } from 'react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setAdminToken } = useAuthStore();
  const nav = useNavigate();
  const submit = async e => {
    e.preventDefault();
    const { data } = await api.post('/admin/login', form);
    setAdminToken(data.token);
    nav('/admin/dashboard');
  };
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" required onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" required onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}