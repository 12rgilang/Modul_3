const jwt = require("jsonwebtoken");

module.exports = {
	createToken: (payload) => {
		return jwt.sign(payload, "123abc");
	},
	validateToken: async (req, res, next) => {
		const token = req.headers.auth;

		if (!token) {
			res.status(400).send({
				isError: true,
				message: "Token Not Found",
				data: null,
			});
		}
		await jwt.verify(token, "123abc", (err, JWTToken) => {
			try {
				if (err) throw err;
				req.dataToken = JWTToken;
				next();
			} catch (error) {
				return res.status(500).send({
					isError: true,
					message: error.message,
					data: null,
				});
			}
		});
	},
};
