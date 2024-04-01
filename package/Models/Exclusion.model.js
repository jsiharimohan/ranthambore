const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExclusionSchema = new Schema({
	exclusion: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const Exclusion = mongoose.model('exclusions', ExclusionSchema);
module.exports = Exclusion;