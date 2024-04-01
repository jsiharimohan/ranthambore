const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentPolicySchema = new Schema({
	policy: {
		type: String,
		required: true,
	}
},{
	timestamps: true
});

const PaymentPolicy = mongoose.model('payment_policies', PaymentPolicySchema);
module.exports = PaymentPolicy;