import axios from 'axios';
import { create } from 'zustand';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

export const useBlogStore = create((set, get) => ({
  blogs: [],
  fetchBlogs: async () => {
    const { data } = await api.get('/blogs');
    set({ blogs: data });
  },
  createBlog: async (payload, token) => {
    await api.post('/blogs', payload, { headers: { Authorization: `Bearer ${token}` } });
    get().fetchBlogs();
  },
  updateBlog: async (id, payload, token) => {
    await api.put(`/blogs/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    get().fetchBlogs();
  },
  deleteBlog: async (id, token) => {
    await api.delete(`/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    get().fetchBlogs();
  }
}));