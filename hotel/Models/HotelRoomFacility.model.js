const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelRoomFacilitySchema = new Schema({
	facility: {
		type: String,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
});

const HotelRoomFacility = mongoose.model('hotel_room_facilities', HotelRoomFacilitySchema);
module.exports = HotelRoomFacility;