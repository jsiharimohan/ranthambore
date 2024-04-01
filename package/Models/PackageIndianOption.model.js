const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageIndianOptionSchema = new Schema({
	package_id: {
		type: String,
		required: true,
	},
	category_id: {
		type: String,
	},
	
	room_price: {
		type: Number,
		required: true,
	},
	extra_ad_price: {
		type: Number,
		required: true,
	},
	extra_ch_price: {
		type: Number,
		required: true,
	},

	fes_room_price:{
        type: Number,
		required: true,
	},
	fes_ad_price:{
        type: Number,
		required: true,
	},
	fes_ch_price:{
        type: Number,
		required: true,
	},


	safari_de_price:{
        type: Number,
		required: true,
	},
	safari_we_price:{
        type: Number,
		required: true,
	},
	safari_fes_price:{
        type: Number,
		required: true,
	},

	
},{
	timestamps: true
});

const PackageIndianOption = mongoose.model('package_indian_options', PackageIndianOptionSchema);
module.exports = PackageIndianOption;