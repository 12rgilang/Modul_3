'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users_details}) {
      this.hasMany(users_details, {foreignKey: "user_id"})
    }
  }
  users.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      unique: {msg: "Username already been used"},
      allowNull: false,
      validate: {
        notEmpty: {msg: "Field cannot blank"},
        notNull: {msg: "Field cannot blank"}
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {msg: "Email already registered"},
      allowNull: false,
      validate: {
        isEmail: {msg: "Enter a valid email address"},
        notEmpty: {msg: "Field cannot blank"},
        notNull: {msg: "User must be have an email"}
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      notEmpty: {msg: "Field cannot blank"},
      notNull: {msg: "Field cannot blank"}
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "UnConfirmed"
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "User"
  }
  }, {
    sequelize,
    modelName: 'users',
    freezeTableName: true
  });
  return users;
};