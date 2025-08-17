const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signAdmin = (id) =>
  jwt.sign({ id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: 'Admin already exists' });

    const hash = await bcrypt.hash(password, 10);
    const admin = await User.create({ name, email, password: hash, role: 'admin' });
    res.json({ token: signAdmin(admin._id) });
  } catch (e) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin || !(await bcrypt.compare(password, admin.password)))
      return res.status(400).json({ msg: 'Invalid credentials' });

    res.json({ token: signAdmin(admin._id) });
  } catch (e) {
    res.status(500).send('Server error');
  }
};