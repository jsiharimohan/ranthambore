const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
	feature: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const Feature = mongoose.model('features', FeatureSchema);
module.exports = Feature;