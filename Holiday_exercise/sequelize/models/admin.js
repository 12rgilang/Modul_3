'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admin.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      unique: {msg: "Admin name already been used"},
      allowNull: false,
      validate: {
        notEmpty: { msg: "Field cannot blank"},
        notNull: { msg: "Field cannot blank"}
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {msg: "Email does not recognize"},
      allowNull: false,
      validate: {
        isEmail: {msg : "Enter a valid email address"},
        notEmpty: {msg: "Field cannot blank"},
        notNull: {msg: "Admin login with registered email"},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNullL: false,
      is: {
        args: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
        msg: "email must contain @ and contain at least 10 char"
      },
      notEmpty: {msg: "User password must not be empty"},
      notNull: {msg: "User must have a password"},
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "User role must be not empty"},
        notNull: {msg: "user must have a role"},
      },
    },
  },  {
    sequelize,
    modelName: 'admin',
    freezeTableName: true, // agar tidak merubah nama table
  });
  return admin;
};