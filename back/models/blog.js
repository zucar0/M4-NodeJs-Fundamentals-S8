const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('blog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  mainImage: DataTypes.STRING,
  author: DataTypes.STRING,
  review: DataTypes.TEXT,
  intro: DataTypes.STRING,
  content: DataTypes.TEXT,
  contentImage: DataTypes.STRING,
  close: DataTypes.TEXT,
  keywords: DataTypes.STRING,
  SEOTitle: DataTypes.STRING,
  metadescription: DataTypes.STRING,
  internalLink1: DataTypes.STRING,
  internalLink2: DataTypes.STRING,
  internalLink3: DataTypes.STRING,
  category: DataTypes.STRING,
  tags: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});