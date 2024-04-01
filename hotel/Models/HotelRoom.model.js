const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelRoomSchema = new Schema({
	hotel_id: {
		type: String,
	},
	room: {
		type: String,
	},
	image: {
		type: String,
	},
	status: {
		type: Number,
		default: 1
	},
	facilities: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: "hotel_room_facilities"
	}],
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
	updatedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
	},
});

const HotelRoom = mongoose.model('hotel_rooms', HotelRoomSchema);
module.exports = HotelRoom;