const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
	type: {
		type: String
	},
	//'safari-general','dhikala-general','bijrani-general','jhirna-general','gairal-general','sultan-general','forest rest-general','hotel-general','package-general','hotel','festival package-general'
	booking_date: {
		type: String
	},
	traveller_name: {
		type: String
	},
	phone: {
		type: String
	},
	email_id: {
		type: String
	},
	message: {
		type: String
	},
	hotel_id: {
		type: String
	},
	hotel: {
		type: String
	},
	addedAt: {
		type: String
	}
},

	{ timestamps: true });

const Enquiry = mongoose.model('enquiries', EnquirySchema);
module.exports = Enquiry;