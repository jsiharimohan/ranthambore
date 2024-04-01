const createError = require('http-errors');
const mongoose = require('mongoose');
const validator = require('../helpers/validate');

const Amenity = require('../Models/Amenity.model');

async function checkNameIsUnique(name) {

  totalPosts = await Amenity.find({ amenity: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  getAllAmenities: async (req, res, next) => {
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

      var totalPosts = await Amenity.find({}).countDocuments().exec();

      Amenity.find({}, {},
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(" test all amenities", error.message);
    }
  },

  getAllAmenityHotel: async (req, res, next) => {
    try {
      const results = await Amenity.find({ status: 1 }, { __v: 0 });
      res.send({
        success: true,
        message: 'Data fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewAmenity: async (req, res, next) => {
    if (req.file) {
    req.body.image = req.file.path;
  }

    let rules = {
      amenity: 'required'
    };

    await validator(req.body, rules, {}, (err, status) => {
      if (!status) {
        return next(createError(400, 'Amenity Field Required!'));
      }
    }).catch(err => console.log(err));

    var checkCount = await checkNameIsUnique(req.body.amenity);

    if (checkCount) {
     return next(createError(400, 'Duplicate Amenity!'));
    }

    try {
      const amenity = new Amenity(req.body);
      const result = await amenity.save();
      res.send({
        success: true,
        message: 'Data inserted',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findAmenityById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const amenity = await Amenity.findById(id);
      if (!amenity) {
        throw createError(404, 'Amenity does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: amenity
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Amenity id'));
        return;
      }
      next(error);
    }
  },

  updateAAmenity: async (req, res, next) => {
    try {
      if (req.file && req.file.size > 0) {
        req.body.image = req.file.path;
      }
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Amenity.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Amenity does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Amenity Id'));
      }

      next(error);
    }
  },

  deleteAAmenity: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Amenity.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Amenity does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Amenity id'));
        return;
      }
      next(error);
    }
  }
};