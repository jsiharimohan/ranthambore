const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
	name: {
		type: String,
		index: true,
	},
	date_from: {
		type: String,
	},
	date_to: {
		type: String,
	},
	type: {
		type: String,
	},
	person_type: {
		type: String,
	},
	vehicle_type: {
		type: String,
	},
	price: {
		type: Number,
		default: 0
	}
},{
	timestamps: true
});

const Price = mongoose.model('price', PriceSchema);
module.exports = Price;