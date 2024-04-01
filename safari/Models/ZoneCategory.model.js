const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZoneCategorySchema = new Schema({
	name: {
		type: String,
	},
	startDate:{
		type: String,
	},
	endDate:{
		type: String,
	},
	availability: {
		type: Number,
		default: 0,
	},
	sort: {
		type: Number,
		default: 0,
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

const ZoneCategory = mongoose.model('zone_categories', ZoneCategorySchema);
module.exports = ZoneCategory;