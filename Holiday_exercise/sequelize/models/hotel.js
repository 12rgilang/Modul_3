'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ room, hotel_image}) {
      // define association here
      this.hasMany(room, {foreignKey: "hotel_id", as: "available_room"});
      this.hasMany(hotel_image, {foreignKey: "hotel_id", as: "hotel_image"})
    }
  }
  hotel.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    availableRoom: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hotel',
    freezeTableName: true,
    timestamps: false,
  });
  return hotel;
};