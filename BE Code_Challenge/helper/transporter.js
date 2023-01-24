const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "vn6299@gmail.com", // Email Sender
		pass: "wwkvwbphxbztwqdt", // Key Generate
	},
	tls: {
		rejectUnauthorized: false,
	},
});

module.exports = transporter;
