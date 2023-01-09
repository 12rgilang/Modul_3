'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({room}) {
      // define association here
      this.belongsTo(room, {foreignKey: "room_id"})
    }
  }
  room_image.init({
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'room_image',
    freezeTableName: true,
    timestamps: false,
  });
  return room_image;
};