const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InclusionSchema = new Schema({
	inclusion: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const Inclusion = mongoose.model('inclusions', InclusionSchema);
module.exports = Inclusion;