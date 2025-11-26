const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ where: { email } });

  if (user && (await user.isValidPassword(password))) {
    res.json({
      success: true,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
};
