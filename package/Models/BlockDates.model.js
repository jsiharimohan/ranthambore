const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlockDateSchema = new Schema({
	startDate: {
		type: String,
        required:true
	},
	endDate:{
		type:String,
        required:true
	}
},{
	timestamps:true
});

const BlockDates = mongoose.model('festival_dates', BlockDateSchema);
module.exports = BlockDates;