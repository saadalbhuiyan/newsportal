const Blog = require('../models/Blog');

exports.getAllBlogs   = async (_req, res) => res.json(await Blog.find().populate('author', 'name'));
exports.getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name');
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({ title, content, author: req.user.id });
  res.json(blog);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ msg: 'Blog not found' });
  res.json({ msg: 'Blog deleted' });
};