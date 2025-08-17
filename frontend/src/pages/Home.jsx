import { useEffect } from 'react';
import { useBlogStore } from '../store/blogStore';

export default function Home() {
  const { blogs, fetchBlogs } = useBlogStore();
  useEffect(() => { fetchBlogs(); }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Latest Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.slice(0, 6).map(b => (
          <div key={b._id} className="border rounded p-4">
            <h2 className="text-lg font-semibold">{b.title}</h2>
            <p className="text-sm text-gray-600">By {b.author.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}