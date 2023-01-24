// Import Multer
const { multerUpload } = require("./../lib/multer");

const uploadImages = (req, res, next) => {
	const multerResult = multerUpload.fields([{ name: "images", maxCount: 1 }]);
	multerResult(req, res, function (err) {
		try {
			if (err) throw err;
			next();
		} catch (error) {
			return res.status(404).send({
				isError: true,
				message: error.message,
				data: null,
			});
		}
	});
};

module.exports = uploadImages;
