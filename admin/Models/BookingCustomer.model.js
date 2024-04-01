const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingCustomerSchema = new Schema({
	name: {
		type: String,
		required: [true, "fullname required!"],
		index: true,
	},
	gender: {
		type: String,
		required: [true, "gender required!"],
	},
	customer_id: {
		type: String,
	},
	booking_id: {
		type: String,
	},
	nationality: {
		type: String,
		required: [true, "nationality required!"],
	},
	id_proof: {
		type: String,
	},
	idnumber: {
		type: String,
	}
},{
	timestamps:true
});

const BookingCustomer = mongoose.model('booking_customers', BookingCustomerSchema);
module.exports = BookingCustomer;