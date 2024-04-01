const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
	facility: {
		type: String,
		unique: true,
		required: true,
		index: true,
	},
	status: {
		type: Number,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
});

const Facility = mongoose.model('room_facilities', FacilitySchema);
module.exports = Facility;