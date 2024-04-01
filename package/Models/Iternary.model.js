const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IternarySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		default: 0,
	}
},{
	timestamps: true
});

const Iternary = mongoose.model('iternaries', IternarySchema);
module.exports = Iternary;