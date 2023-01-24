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
    static associate(models) {
      // define association here
      this.hasMany(models.transactions, {
        foreignKey: 'users_id'
      })
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
      // validate: {
      //   is: {
      //     args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/,
      //     msg: "Password must between 6 to 10 characters and contain a number"
      //   }
      // },
      notEmpty: {msg: "Field cannot blank"},
      notNull: {msg: "Field cannot blank"}
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "User"
  },
},
  {
    sequelize,
    modelName: 'users',
    freezeTableName: true
  });
  return users;
};