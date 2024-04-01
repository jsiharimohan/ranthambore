const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisableDateSchema = new Schema(
{
	date: {
		type: String,
		index: true,
	}
},
{
	timestamps:true
});

const DisableDate = mongoose.model('disable_dates', DisableDateSchema);
module.exports = DisableDate;