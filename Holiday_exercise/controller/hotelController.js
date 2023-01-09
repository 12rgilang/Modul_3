const { Op } = require("sequelize");
const db = require("../sequelize/models")

module.exports = {
	searchHotel: async (req, res) => {
		let { checkin, checkout, location, from, to } = req.query;
		if (checkin && checkout && location && from && to) {
			try {
				let hotelResponse = await db.hotel.findAll({
					where: {
						[Op.and]: [
							{ location },
							{ availableRoom: { [Op.gt]: 0 } },
							{ price: { [Op.between]: [from, to] } },
						],
					},
				});
				return res.status(200).send({
					isError: false,
					message: "Get hotel by all queries",
					data: hotelResponse,
				});
			} catch (error) {
				return res.status(400).send({
					isError: true,
					message: "Something went wrong",
					data: error,
				});
			}
		} else if (!checkin && !checkout && !location && from && to) {
			try {
				let hotelResponse = await db.hotel.findAll({
					where: { price: { [Op.between]: [from, to] } },
				});
				return res.status(200).send({
					isError: false,
					message: "Get hotel by price",
					data: hotelResponse,
				});
			} catch (error) {
				return res.status(400).send({
					isError: true,
					message: "Something went wrong",
					data: error,
				});
			}
		} else if (!checkin && !checkout && location && !from && !to) {
			try {
				let hotelResponse = await db.hotel.findAll({ where: { location } });
				return res.status(200).send({
					isError: false,
					message: "Get hotel by location",
					data: hotelResponse,
				});
			} catch (error) {
				return res.status(400).send({
					isError: true,
					message: "Something went wrong",
					data: error,
				});
			}
		} else if (checkin && checkout && !location && !from && !to) {
			try {
				let hotelResponse = await db.hotel.findAll({ where: { availableRoom: { [Op.gt]: 0 } } });
				return res.status(200).send({
					isError: false,
					message: "Get hotel by availability",
					data: hotelResponse,
				});
			} catch (error) {
				return res.status(400).send({
					isError: true,
					message: "Something went wrong",
					data: error,
				});
			}
		}
	},

	hotelDetails: async (req, res) => {
		let id = req.params.id;
		try {
			let data = await db.hotel.findOne({ where: { id } });
			return res.status(200).send({
				isError: false,
				message: "get hotel details",
				data,
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: "Something went wrong",
				data: error,
			});
		}
	},

	bookHotelRoom: async(req, res) =>{
		try {
			
		} catch (error) {
			
		}
	},
};