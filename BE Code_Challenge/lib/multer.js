const multer = require("multer");
const fs = require("fs");

let defaultPath = "public";
var storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		let isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`);
		if (!isDirectoryExist) {
			await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, { recursive: true });
		}

		if (file.fieldname === "files") {
			cb(null, `${defaultPath}/${file.fieldname}`);
		}
		if (file.fieldname === "images") {
			cb(null, `${defaultPath}/${file.fieldname}`);
		}
	},
	filename: (req, file, cb) => {
		cb(
			null,
			"PIMG" +
				"-" +
				Date.now() +
				Math.round(Math.random() * 1000000000) +
				"." +
				file.mimetype.split("/")[1]
		); // [image, png]
	},
});

// 2. Setup File Filter
var fileFilter = (req, file, cb) => {
	console.log(file);
	if (file.mimetype.split("/")[0] === "image") {
		// Accept
		cb(null, true);
	} else if (file.mimetype.split("/")[0] !== "image") {
		// Reject
		cb(new Error("File Must Be Image!"));
	}
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
