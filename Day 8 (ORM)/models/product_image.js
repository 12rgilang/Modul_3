'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.products, {
        foreignKey: 'products_id', 
        onDelete: 'cascade'
      })
    }
  }
  products_images.init({
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products_images',
  });
  return products_images;
};