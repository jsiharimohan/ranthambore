const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageIternarySchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	status: {
		type: Number,
		default: 1,
	},
	package_id: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const PackageIternary = mongoose.model('package_iternaries', PackageIternarySchema);
module.exports = PackageIternary;