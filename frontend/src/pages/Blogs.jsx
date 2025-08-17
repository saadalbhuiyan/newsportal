import { useEffect } from 'react';
import { useBlogStore } from '../store/blogStore';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const { blogs, fetchBlogs } = useBlogStore();
  useEffect(() => { fetchBlogs(); }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map(b => (
          <div key={b._id} className="border rounded p-4">
            <h2 className="text-xl font-bold">{b.title}</h2>
            <Link to={`/blogs/${b._id}`} className="text-indigo-600">Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}