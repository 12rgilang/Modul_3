'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  transaction.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    hotel_name: DataTypes.STRING,
    hotel_location: DataTypes.STRING,
    room_price: DataTypes.INTEGER,
    room_name: DataTypes.STRING,
    total_room: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    checkin: DataTypes.DATE,
    checkout: DataTypes.DATE,
    expired: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
    freezeTableName: true,
  });
  return transaction;
};