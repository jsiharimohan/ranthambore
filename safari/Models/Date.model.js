const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateSchema = new Schema({
	date: {
		type: String,
		required: true,
	},
	/*zone: {
		type: String,
		required: true,
	},*/
	vehicle: {
		type: String,
		required: true,
	},
	timing: {
		type: String,
		required: true,
	},
	availability: {
		type: Number,
		default: 0,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	}
});

const Date = mongoose.model('dates', DateSchema);
module.exports = Date;