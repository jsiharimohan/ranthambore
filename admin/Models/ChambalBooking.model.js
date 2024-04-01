const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChambalBookingSchema = new Schema({
	date: {
		type: String,
		required: [true, "date required!"],
		index: true,
	},
	zone: {
		type: String,
		required: [true, "zone required!"],
	},
	customer_id: {
		type: String,
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
	customer:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "customers"
	},
	booking_name: {
		type: String
	},
	booking_option: {
		type: String
	},
	vehicle: {
		type: String,
		required: [true, "vehicle required!"],
	},
	time: {
		type: String,
		required: [true, "timing required!"],
	},
	amount: {
		type: String,
		required: [true, "amount required!"],
	},
	id_proof_no: {
		type: String,
	},
	no_of_persons_indian: {
		type: String,
	},
	no_of_persons_foreigner: {
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

const ChambalBooking = mongoose.model('chambal_bookings', ChambalBookingSchema);
module.exports = ChambalBooking;