"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class bus extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ transaction, company }) {
			// define association here
			this.hasMany(transaction, { foreignKey: "bus_id" });
			this.belongsTo(company, { foreignKey: "company_id" });
		}
	}
	bus.init(
		{
			armada: DataTypes.STRING,
			rute: DataTypes.STRING,
			total_seat: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "bus",
			freezeTableName: true,
		}
	);
	return bus;
};
