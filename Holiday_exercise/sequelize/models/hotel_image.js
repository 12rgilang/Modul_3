'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({hotel}) {
      // define association here
      this.belongsTo(hotel, {foreignKey: "hotel_id"})
    }
  }
  hotel_image.init({
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'hotel_image',
    freezeTableName: true,
    timestamps: false,
  });
  return hotel_image;
};