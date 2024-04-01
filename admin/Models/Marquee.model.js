const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarqueeSchema = new Schema({
	content: {
		type: String
	},
},{
	timestamps:true
});

const Marquee = mongoose.model('marquees', MarqueeSchema);
module.exports = Marquee;