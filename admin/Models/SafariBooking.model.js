const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SafariBookingSchema = new Schema({
	date: {
		type: String,
		required: [true, "date required!"],
		index: true,
	},
	customer_id : {
		type : String,
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
	customer : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "customers",
		required: true
	},
	zone: {
		type: String,
		required: [true, "zone required!"],
	},
	booking_customers:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "booking_customers"
	}],
	vehicle: {
		type: String,
		required: [true, "vehicle required!"],
	},
	timing: {
		type: String,
		required: [true, "timing required!"],
	},
	amount: {
		type: String,
		required: [true, "amount required!"],
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

const SafariBooking = mongoose.model('safari_bookings', SafariBookingSchema);
module.exports = SafariBooking;