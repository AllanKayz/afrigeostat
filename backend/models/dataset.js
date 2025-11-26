const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Dataset extends Model {}

Dataset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    spatialExtent: {
      type: DataTypes.GEOMETRY('POLYGON', 4326),
      allowNull: true,
    },
    licenseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    versionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Dataset',
  }
);

module.exports = Dataset;
