const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeoManagerSchema = new Schema({
	page_name: {
		type: String,
		required: [true, "name required!"],
		index: true,
		immutable: true 
	},
	page_url: {
		type: String,
		required: [true, "url required!"],
		immutable: true 
	},
	seo_title: {
		type: String,
	},
	seo_description: {
		type: String,
	}
},{
	timestamps: true
});

const SeoManager = mongoose.model('seo_managers', SeoManagerSchema);
module.exports = SeoManager;