'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({products, size}) {
        this.belongsTo(products, {foreignKey: 'product_id'})
        this.belongsTo(size, {foreignKey: "size_id"})
    }
  }
  products_details.init({
    calories: DataTypes.STRING,
    price: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'products_details',
    freezeTableName: true,
    timestamps: false
  });
  return products_details;
};