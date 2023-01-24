"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ transaction }) {
			// define association here
			this.hasMany(transaction, { foreignKey: "user_id" });
		}
	}
	user.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			username: {
				type: DataTypes.STRING,
				unique: { msg: "Username not available" },
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: { msg: "Please input a valid email!" },
				},
			},
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "user",
			freezeTableName: true,
		}
	);
	return user;
};
