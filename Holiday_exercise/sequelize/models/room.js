'use strict';
const {
  Model
} = require('sequelize');
const transaction = require('./transaction');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({hotel, user, room_image, transaction}) {
      // define association here
      this.belongsTo(hotel, {foreignKey: "hotel_id", as: "hotel"});
      this.belongsToMany(user, {through: transaction, foreignKey: "room_id", as: "room"})
      this.hasMany(room_image, {foreignKey: "room_id", as: "room_image"})
    }
  }
  room.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    available_Room: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: true,
  });
  return room;
};