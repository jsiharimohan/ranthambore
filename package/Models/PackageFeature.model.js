const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageFeatureSchema = new Schema({
	feature: {
		type: String,
		required: true,
	},
	package_id: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const PackageFeature = mongoose.model('package_features', PackageFeatureSchema);
module.exports = PackageFeature;