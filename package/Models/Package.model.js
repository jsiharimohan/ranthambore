var slug = require('mongoose-slug-updater');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const PackageSchema = new Schema({
	name: {
		type: String,
		required: [true,'Name field is required!']
	},
	slug: { 
		type: String, 
		slug: "name" 
	},
	/*type: {
		type: String,
		required: [true, 'Type is required!']
	},*/
	features:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_features"
	}],
	exclusions:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_exclusions"
	}],
	inclusions:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_inclusions"
	}],
	iternaries:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "package_iternaries"
	}],
	rating: {
		type: Number,
		required:[true,'Rating field is required!']
	},
	price: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
	},
	meta_title: {
		type: String,
	},
	meta_description: {
		type: String,
	},
	status: {
		type: Number,
		default: 0,
	},
	availability: {
		type: Number,
		default: 0,
	}, 
	homepage: {
		type: Number,
		default: 0,
	}, 
	image: {
		type: String,
	}
},
{
	timestamps: true
}
);

PackageSchema.plugin(mongoosePaginate);

const Package = mongoose.model('packages', PackageSchema);
module.exports = Package;