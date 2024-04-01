const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentBookingSchema = new Schema({
	name: {
		type: String,
		required: [true, "name required!"],
	},
	email: {
		type: String,
		required: [true, "email required!"],
		index: true,
	},
	mobile: {
		type: String,
		required: [true, "mobile required!"],
	},
	date: {
		type: String,
		required: [true, "date required!"],
	},
	time: {
		type: String,
		required: [true, "timing required!"],
	},
	zone: {
		type: String,
		required: [true, "zone required!"],
	},
	vehicle: {
		type: String,
		required: [true, "vehicle required!"],
	},
	persons: {
		type: Number,
	},
	addedAt: {
		type: String,
	}
},{
	timestamps:true
});

const CurrentBooking = mongoose.model('current_bookings', CurrentBookingSchema);
module.exports = CurrentBooking;