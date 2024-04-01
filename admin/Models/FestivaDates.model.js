const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FestivalDateSchema = new Schema({
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

const FestivalDates = mongoose.model('festival_dates', FestivalDateSchema);
module.exports = FestivalDates;