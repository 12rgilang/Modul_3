"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class company extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ bus }) {
			// define association here
			this.hasMany(bus, { foreignKey: "company_id" });
		}
	}
	company.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "company",
			freezeTableName: true,
			timestamps: false,
		}
	);
	return company;
};
