import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { setUserToken } = useAuthStore();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/api/users/register', form);
    setUserToken(data.token);
+   nav('/users/dashboard'); // ← redirect after register
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">User Register</h1>
      <form onSubmit={submit} className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}