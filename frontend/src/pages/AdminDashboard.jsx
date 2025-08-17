import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useBlogStore } from '../store/blogStore';

export default function AdminDashboard() {
  const { adminToken } = useAuthStore();
  const { blogs, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogStore();
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => { fetchBlogs(); }, []);

  const handleCreate = e => {
    e.preventDefault();
    createBlog(form, adminToken);
    setForm({ title: '', content: '' });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Create */}
      <form onSubmit={handleCreate} className="mb-6 space-y-2 max-w-xl">
        <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <textarea className="w-full border p-2 rounded" placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
        <button className="bg-green-600 text-white px-4 py-1 rounded">Create</button>
      </form>

      {/* List & Edit */}
      {blogs.map(b => (
        <div key={b._id} className="border p-4 mb-2 rounded flex justify-between">
          <div>
            <h2 className="font-bold">{b.title}</h2>
            <p className="text-sm text-gray-600">{b.content.substring(0, 60)}...</p>
          </div>
          <div>
            <button onClick={() => setEdit({ ...b })} className="text-blue-600 mr-2">Edit</button>
            <button onClick={() => deleteBlog(b._id, adminToken)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}

      {/* Inline edit */}
      {edit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            className="bg-white p-4 rounded w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              updateBlog(edit._id, { title: edit.title, content: edit.content }, adminToken);
              setEdit(null);
            }}
          >
            <h3 className="text-lg mb-2">Edit Blog</h3>
            <input className="w-full border p-2 mb-2" value={edit.title} onChange={e => setEdit({ ...edit, title: e.target.value })} />
            <textarea className="w-full border p-2 mb-2" value={edit.content} onChange={e => setEdit({ ...edit, content: e.target.value })} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2">Save</button>
            <button type="button" onClick={() => setEdit(null)} className="bg-gray-400 px-3 py-1 rounded">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}