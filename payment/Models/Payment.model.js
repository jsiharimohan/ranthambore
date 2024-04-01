const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
	customer_id: {
		type: String
	},
	booking_type: {
		type:String //hote,safari,chambal,package
	},
	transaction_id: {
		type: String
	},
	amount: {
		type: Number
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	},
});

const Price = mongoose.model('payments', PriceSchema);
module.exports = Price;