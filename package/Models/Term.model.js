const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermSchema = new Schema({
	term: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const Term = mongoose.model('terms', TermSchema);
module.exports = Term;