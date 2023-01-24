const db = require("../sequelize/models");
const transporter = require("../helper/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
	search: async (req, res) => {
		let { rute, date } = req.query;
		let data;
		try {
			if ((rute, date)) {
				const result = await db.bus.findAll({
					where: { rute },
					include: [{ model: db.transaction }, { model: db.company }],
				});
				data = result;
			} else if ((rute, !date)) {
				const result = await db.bus.findAll({
					where: { rute },
					include: [{ model: db.transaction }, { model: db.company }],
				});
				data = result;
			}
			return res.status(200).send({
				isError: false,
				message: "Get by rute and date",
				data,
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	details: async (req, res) => {
		let id = req.params.id;
		try {
			const data = await db.bus.findOne({
				where: { id },
				include: { model: db.transaction },
			});
			let seat = 0;
			data.transactions.map((value) => {
				seat += parseInt(value.total_seat);
			});
			console.log(seat);
			return res.status(200).send({
				isError: false,
				message: "Get Details",
				data: { available_seat: data.total_seat - seat },
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	book: async (req, res) => {
		const uuid = req.dataToken;
		const { tgl_keberangkatan, bus_id, total_seat } = req.body;
		try {
			if (total_seat > 3) {
				throw { message: "Maximum number of seat exceeded" };
			}
			let user = await db.user.findOne({
				where: { uuid },
			});
			if (!user) {
				throw res.status(200).send({
					isError: true,
					message: "Session has ended please login again to continue booking",
					data: null,
				});
			}
			let bus = await db.bus.findOne({
				where: {
					id: bus_id,
				},
			});

			const data = await db.transaction.create({
				tgl_keberangkatan,
				total_seat,
				price: bus.price * total_seat,
				bus_id,
				user_id: user.id,
			});

			return res.status(200).send({
				isError: false,
				message: "Book Successful",
				data,
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	paymentProof: async (req, res) => {
		try {
			let data = JSON.parse(req.body.data);
			let update = await db.transaction.update(
				{
					proof: req.files.images[0].path,
					status: "Paid",
				},
				{
					where: {
						id: data.id,
					},
				}
			);
			const transaction = await db.transaction.findOne({ where: { id: update } });
			const email = await db.user.findOne({ where: { id: transaction.user_id } });

			const template = await fs.readFile("../template/receipt.html", "utf-8", function (err, done) {
				if (err) {
					reject(err);
					return;
				}
			});
			const templateToComplie = await handlebars.compile(template);

			await transporter.sendMail({
				from: "Starling",
				to: email.email,
				subject: "Account Activation",
				html: templateToComplie,
			});

			return res.status(201).send({
				isError: false,
				message: "Payment Success!",
				data: null,
			});
		} catch (error) {
			return res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
};
