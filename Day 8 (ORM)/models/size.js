'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({products_details}) {
        this.hasMany(products_details, {foreignKey: "size_id"})
    }
  }
  size.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'size',
    freezeTableName: true,
    timestamps: false
  });
  return size;
};