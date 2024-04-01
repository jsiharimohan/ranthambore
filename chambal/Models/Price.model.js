const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
	name: {
		type: String,
		index: true,
	},
	price: {
		type: Number,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
},{
	timestamps:true
});

const Price = mongoose.model('price', PriceSchema);
module.exports = Price;