const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageExclusionSchema = new Schema({
	exclusion: {
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

const PackageExclusion = mongoose.model('package_exclusions', PackageExclusionSchema);
module.exports = PackageExclusion;