const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZoneDateSchema = new Schema({
    zone_id:{
        type:String,
        /*required:true*/
    },
	date: {
		type: String,
	},
	vehicle_type: {
		type: Number,
	},
	timing: {
		type: Number,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	}
});

const ZoneDate = mongoose.model('zone_dates', ZoneDateSchema);
module.exports = ZoneDate;