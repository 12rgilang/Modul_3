"use strict";
const moment = require("moment/moment");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user, bus }) {
			// define association here
			this.belongsTo(user, { foreignKey: "user_id" });
			this.belongsTo(bus, { foreignKey: "bus_id" });
		}
	}
	transaction.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			tgl_keberangkatan: DataTypes.DATEONLY,
			total_seat: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			expired: {
				type: DataTypes.DATE,
				defaultValue: moment().add(1, "h").toDate(),
			},
			status: {
				type: DataTypes.STRING,
				defaultValue: "waiting",
			},
			proof: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "transaction",
			freezeTableName: true,
		}
	);
	return transaction;
};
