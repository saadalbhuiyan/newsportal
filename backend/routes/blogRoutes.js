const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// public
router.get('/',        getAllBlogs);
router.get('/:id',     getSingleBlog);

// admin only
router.post('/',       auth(['admin']), createBlog);
router.put('/:id',     auth(['admin']), updateBlog);
router.delete('/:id',  auth(['admin']), deleteBlog);

module.exports = router;