const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmenitySchema = new Schema({
	amenity: {
		type: String,
		required: true,
		index: true,
	},
	image: {
		type: String,
	},
	status: {
		type: Number,
		default: 1
	}
},{
	timestamps: true
});

const Amenity = mongoose.model('amenities', AmenitySchema);
module.exports = Amenity;