const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('releases', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  key: DataTypes.STRING,
  objetive: DataTypes.STRING,
  image: DataTypes.STRING,
  content: DataTypes.TEXT,
  sign: DataTypes.STRING,
  category: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});