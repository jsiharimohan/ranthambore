const createError = require('http-errors');
const mongoose = require('mongoose');
const validator = require('../helpers/validate');

const Facility = require('../Models/Facility.model');

async function checkNameIsUnique(name) {

  totalPosts = await Facility.find({ facility: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllFacilitys: async (req, res, next) => {
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

      var totalPosts = await Facility.find({}).countDocuments().exec();


      Facility.find({}, {},
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewFacility: async (req, res, next) => {

    let rules = {
      facility: 'required'
    };

    await validator(req.body, rules, {}, (err, status) => {
      if (!status) {
       return next(createError(400, 'Facility Field Required!'));
      }
    }).catch( err => console.log(err))


    var checkCount = await checkNameIsUnique(req.body.facility);

    if (checkCount) {
     return next(createError(400, 'Duplicate Facility!'));
    }

    try {
      const facility = new Facility(req.body);
      const result = await facility.save();
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

  findFacilityById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const facility = await Facility.findById(id);
      if (!facility) {
        throw createError(404, 'Facility does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: facility
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Facility id'));
        return;
      }
      next(error);
    }
  },

  updateAFacility: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Facility.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Facility does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Facility Id'));
      }

      next(error);
    }
  },

  deleteAFacility: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Facility.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Facility does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Facility id'));
        return;
      }
      next(error);
    }
  }
};