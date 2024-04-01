const sharp = require('sharp');
const path = require('path');
var fs = require('fs');

const imageUpload = async (req) => {
	try {

		const filename = req.file.originalname.replace(/\..+$/, "");
		const newFilename = `${filename}-${Date.now()}.jpg`;

		await sharp(req.file.path)
		.resize(280, 252, {fit:"contain"})
		.jpeg({ quality: 95 })
		.toFile(
			path.resolve(req.file.destination,newFilename)
		)

		fs.unlinkSync(req.file.path)
		return req.file.destination+''+newFilename;
	} catch (error) {
		console.log(error);
	}
}
module.exports = imageUpload;