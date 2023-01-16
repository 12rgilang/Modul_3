'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.products_images, {
        foreignKey: 'products_id',
        onDelete: 'cascade'
      })
    }
  }
  products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stocks: DataTypes.INTEGER,
    main_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};