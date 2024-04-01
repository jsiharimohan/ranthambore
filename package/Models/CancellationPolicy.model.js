const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CancellationPolicySchema = new Schema({
	policy: {
		type: String,
	}
},{
	timestamps: true
});

const CancellationPolicy = mongoose.model('cancellation_policies', CancellationPolicySchema);
module.exports = CancellationPolicy;