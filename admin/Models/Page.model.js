const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
	title : {
		type : String,
	},
	slug : {
		type : String,
	},
	content : {
		type : String,
	},
	type : {
		type : String,
	},
},
{
	timestamps: true
}
);

const Page = mongoose.model('pages', PageSchema);
module.exports = Page;