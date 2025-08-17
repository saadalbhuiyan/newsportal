import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  useEffect(() => { api.get(`/blogs/${id}`).then(r => setBlog(r.data)); }, [id]);
  if (!blog) return <p className="text-center py-10">Loading...</p>;
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {blog.author.name}</p>
      <p className="whitespace-pre-wrap">{blog.content}</p>
    </div>
  );
}