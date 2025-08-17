const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/authMiddleware');
const {
  register,
  login,
  logout,
  getProfile,
  updateProfile
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login',    login);
router.post('/logout',   logout);
router.get('/me',        auth(), getProfile);
router.put('/me',        auth(), updateProfile);

module.exports = router;