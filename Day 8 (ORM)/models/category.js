'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({products}) {
        this.hasMany(products, {foreignKey: "category_id"})
    }
  }
  category.init({
    name: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'category',
    freezeTableName:true,
    timestamps: false
  });
  return category;
};