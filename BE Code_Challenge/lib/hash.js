const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (password) => {
	try {
		return await bcrypt.hash(password, saltRounds);
	} catch (error) {
		return null;
	}
};

const hashMatch = async (inputpassword, hashedPassword) => {
	try {
		let match = await bcrypt.compare(inputpassword, hashedPassword);
		return match;
	} catch (error) {
		return false;
	}
};

module.exports = {
	hash,
	hashMatch,
};
