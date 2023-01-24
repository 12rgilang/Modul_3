const db = require("../sequelize/models");
const { hash, hashMatch } = require("../lib/hash");
const { createToken } = require("../lib/jwt");

module.exports = {
	register: async (req, res) => {
		try {
			const { username, email, password, role } = req.body;
			const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){6,10}$/;
			if (!regex.test(password)) {
				throw res.status(400).send({
					isError: true,
					message:
						"Password must be contains number and alphabet with minimum 6 character and maximum 10 character",
					data: error,
				});
			}

			await db.user.create({ username, password: await hash(password), email, role });
			return res.status(400).send({
				isError: false,
				message: "Register Success",
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
	login: async (req, res) => {
		const { username, password } = req.query;
		try {
			const data = await db.user.findOne({ where: { username } });
			if (!hashMatch(password, data.password)) {
				throw res.status(400).send({
					isError: true,
					message: "Wrong Password",
					data: null,
				});
			}
			return res.status(200).send({
				isError: false,
				message: "Login success",
				data: {
					Token: createToken(data.uuid),
				},
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
