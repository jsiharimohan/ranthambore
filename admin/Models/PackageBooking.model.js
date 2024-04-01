const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageBookingSchema = new Schema({
	date: {
		type: String,
		required: [true, "date required!"],
	},
	package_id: {
		type: String,
		required: [true, "Package Id required!"],
		index: true
	},
	package_name: {
		type: String,
	},
	category_name: {
		type: String,
	},
	customer_id: {
		type: String,
	},
	customer:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "customers"
	},
	customer_name : {
		type: String
	},
	customer_email : {
		type: String
	},
	customer_mobile : {
		type: String
	},
	nationality_type: {
		type: String,
	},
	room_type: {
		type: String,
	},
	package_option_id: {
		type: String,
	},
	no_of_kids: {
		type: String,
	},
	no_of_rooms: {
		type: String,
	},
	no_of_adult: {
		type: String,
	},
	price: {
		type: String,
	},
	amount: {
		type: String,
	},
	transaction_id: {
		type: String,
	},
	status: {
		type: String,
	},
	seen: {
		type: Number,
		default: 0
	},
	addedAt: {
		type: String,
	}
},{
	timestamps:true
});

const PackageBooking = mongoose.model('package_bookings', PackageBookingSchema);
module.exports = PackageBooking;