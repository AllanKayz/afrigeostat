const { User } = require('../models');

// @desc    Get current user's profile
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'username', 'email', 'role'],
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};
