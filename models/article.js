'use strict'
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {})
  article.associate = function(models) {
    models.article.hasMany(models.comment)
    models.article.belongsTo(models.author)
  }
  return article
}
