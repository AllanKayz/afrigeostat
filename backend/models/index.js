const sequelize = require('../config/database');
const User = require('./user');
const Dataset = require('./dataset');

// Define relationships
User.hasMany(Dataset, {
  foreignKey: {
    name: 'uploaderId',
    allowNull: false,
  },
});
Dataset.belongsTo(User, { as: 'uploader' });

module.exports = {
  User,
  Dataset,
};
