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
    static associate({products_images}) {
      // define association here
      this.hasMany(products_images, { foreignKey: 'products_id'})
    }
  }
  products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    main_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    freezeTableName: true,
  });
  return products;
};