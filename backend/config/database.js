const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME || 'afrigeostat', process.env.DB_USER || 'afrigeostat_user', process.env.DB_PASSWORD || 'password', {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
