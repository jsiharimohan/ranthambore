const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true,
	},
	slug: {
		type: String,
		unique: true,
		required: true,
	},
	image: {
		type: String,
	},
	images: [
	{ type: mongoose.Schema.Types.ObjectId, ref: 'hotel_images' }
	],
	package_image: {
		type: String,
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	rating: {
		type: Number
	},
	price: {
		type: Number
	},
	description: {
		type: String
	},
	meta_title: {
		type: String
	},
	meta_description: {
		type: String
	},
	safari_distance: {
		type: Number
	},
	status: {
		type: Number,
		default: 0
	},
	availability: {
		type: Number,
	}, 
	homepage: {
		type: Number,
		default:0
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

const Hotel = mongoose.model('Hotel', HotelSchema, 'hotels');
module.exports = Hotel;