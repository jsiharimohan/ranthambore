const createError = require('http-errors');
const mongoose = require('mongoose');
const validator = require('../helpers/validate');

const HotelRoom = require('../Models/HotelRoom.model');
const HotelRoomFacility = require('../Models/HotelRoomFacility.model');
const HotelAmenity = require('../Models/HotelAmenity.model');

const titleToSlug = title => {
  let slug;

  // convert to lower case
  slug = title.toLowerCase();

  // remove special characters
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

  // replace spaces with dash symbols
  slug = slug.replace(/ /gi, "-");

  // remove consecutive dash symbols 
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');

  // remove the unwanted dash symbols at the beginning and the end of the slug
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};

module.exports = {
  getAllHotelRooms: async (req, res, next) => {
    try {

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;
      var query = {}
      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await HotelRoom.find({}).countDocuments().exec();

      HotelRoom.find({}, {},
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 }).populate('facilities');
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewHotelRoom: async (req, res, next) => {

    let rules = {
      room: 'required',
      hotel_id: 'required'
    };

    await validator(req.body, rules, {}, (err, status) => {
      if (!status) {
        res.status(412)
          .send({
            success: false,
            message: 'Validation failed',
            data: err
          });
      }
    }).catch(err => console.log(err))

    try {

      const datas = [];

      for (const facility of req.body.facility.split(',')) {
        const hotel_room_facility = new HotelRoomFacility({
          facility: facility,
        });

        var result1 = await hotel_room_facility.save();

        datas.push(result1._id);
      }

      if (req.files && req.files.length) {
        req.body.image = req.files[0].path;
      }
      req.body.facilities = datas;
      const hotel = new HotelRoom(req.body);
      const result = await hotel.save();

      res.send({
        success: true,
        message: 'Data inserted',
        data: result,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findHotelRoomById: async (req, res, next) => {
    const id = req.params.id;
    try {

      const hotel = await HotelRoom.findById(id);
      await hotel.populate('facilities');

      if (!hotel) {
        throw createError(404, 'Hotel Room does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: hotel
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel Room id'));
        return;
      }
      next(error);
    }
  },

  findHotelRoomAmenitiesById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const hotel = await HotelRoom.findById(id);
      if (!hotel) {
        throw createError(404, 'Hotel Room does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: hotel
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel Room id'));
        return;
      }
      next(error);
    }
  },

  updateAHotelRoom: async (req, res, next) => {
    try {
      const id = req.params.id;
      const datas = [];

      const fac = await HotelRoom.findById(id);

      if (fac.facilities.length > 1) {

        await HotelRoomFacility.deleteMany({
          "_id": {
            $in: fac.facilities
          }
        });
      } else {
        await HotelRoomFacility.deleteOne({
          "_id": fac.facilities
        });
      }

      for (const facility of req.body.facility.split(',')) {
        const hotel_room_facility = new HotelRoomFacility({
          facility: facility,
        });

        var result1 = await hotel_room_facility.save();

        datas.push(result1._id);
      }
      if (req.files && req.files.length) {
        req.body.image = req.files[0].path;
      }
      req.body.facilities = datas;


      const updates = req.body;
      const options = { new: true };

      const result = await HotelRoom.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Hotel Room does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Hotel Room Id'));
      }

      next(error);
    }
  },

  updateHotelRoomAmenities: async (req, res, next) => {
    try {
      const id = req.params.id;

      await HotelRoomFacility.find({ hotel_id: id }).remove();

      for (const amenity of req.body.amenities) {
        const hotel_amenity = new HotelRoomFacility({
          hotel_id: id,
          amenity_id: amenity
        });

        const result = await hotel_amenity.save();
      }

      res.send({
        success: true,
        message: 'Hotel Room Amenity Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Hotel Room Id'));
      }

      next(error);
    }
  },

  deleteAHotelRoom: async (req, res, next) => {
    const id = req.params.id;
    try {

      const fac = await HotelRoom.findById(id);

      if (fac.facilities.length > 1) {

        await HotelRoomFacility.deleteMany({
          "_id": {
            $in: fac.facilities
          }
        });
      } else {
        await HotelRoomFacility.deleteOne({
          "_id": fac.facilities
        });
      }

      const result = await HotelRoom.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Hotel Room does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel Room id'));
        return;
      }
      next(error);
    }
  }
};