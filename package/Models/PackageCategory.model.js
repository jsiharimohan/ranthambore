const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageCategorySchema = new Schema({
	category: {
		type: String,
	},
	package_id: {
		type: String,
		required: true,
	},
	package: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "packages"
	},
	hotels:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_category_hotels"
	}],
	foreignerOptions:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_foreigner_options"
	}],
	indianOptions:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_indian_options"
	}],
	status: {
		type: Number,
		required: true,
	}
},{
	timestamps: true
});

const PackageCategory = mongoose.model('package_categories', PackageCategorySchema);
module.exports = PackageCategory;