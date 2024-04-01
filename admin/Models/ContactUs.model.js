const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactUsSchema = new Schema({
	name: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	message: {
		type: String
	},
	createdAt: {
		type: String
	}
},

	{ timestamps: true });

const ContactUs = mongoose.model('contact_us', ContactUsSchema);
module.exports = ContactUs;