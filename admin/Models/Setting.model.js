const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
	type: {
		type: String
	},
	value:{
		type:Object
	}
},{
	timestamps:true
});

const Setting = mongoose.model('settings', SettingSchema);
module.exports = Setting;