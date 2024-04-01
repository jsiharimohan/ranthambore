const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
	name: {
		type: String,
		required: [true, "fullname required!"],
	},
	email : { 
		type: String, 
		require: true, 
		index:true, 
		sparse:true
	},
	booking_customers:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "booking_customers"
	}],
	safari_booking:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "safari_bookings"
	},
	chambal_booking:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "chambal_bookings"
	},
	package_booking:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_bookings"
	},
	mobile: {
		type: String,
	},
	type: {
		type: String,
	},
	address: {
		type: String,
	},
	state: {
		type: String,
	},
	country: {
		type: String,
	}
},{
	timestamps:true
});

const Customer = mongoose.model('customers', CustomerSchema);
module.exports = Customer;