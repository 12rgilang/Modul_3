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
    static associate({products_details, category}) {
      // define association here
      this.belongsTo(category, {foreignKey: 'category_id'})
      this.hasMany(products_details, {foreignKey: 'product_id'})
    }
  }
  products.init({
    name: DataTypes.STRING,
    main_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    freezeTableName: true,
    timestamps: false
  });
  return products;
};