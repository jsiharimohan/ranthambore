const createError = require('http-errors');
const mongoose = require('mongoose');
const csv=require('csvtojson');

const ZoneCategory = require('../Models/ZoneCategory.model');

module.exports = {
  getAllZoneCategorys: async (req, res, next) => {
    try {
      
      ZoneCategory.find({},{},
        function(err,data) {
          if(err) {
            response = {"error": true, "message": "Error fetching data"+err};
          } else {
            response = {"error": false, "message": 'data fetched', 'data': data };
          }
          res.json(response);
        }).sort({ sort: 1 });
    } catch (error) {
      console.log(error.message);
    }
  },


    getAllZoneCategorysFront: async (req, res, next) => {
    try {

      ZoneCategory.find({availability: 1},{},
        function(err,data) {
          if(err) {
            response = {"error": true, "message": "Error fetching data"+err};
          } else {
            response = {"error": false, "message": 'data fetched', 'data': data};
          }
          res.json(response);
        }).sort({ sort: 1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewZoneCategory: async (req, res, next) => {
    try {
      const date = new ZoneCategory(req.body);
      const result = await date.save();
      res.send({
        success: true,
        message: 'Data inserted',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(201, error.message));
        return;
      }
      next(error);
    }
  },

  findZoneCategoryById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await ZoneCategory.findById(id);
      if (!date) {
        throw createError(201, 'ZoneCategory does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(201, 'Invalid ZoneCategory id'));
        return;
      }
      next(error);
    }
  },

  updateAZoneCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await ZoneCategory.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(201, 'ZoneCategory does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(201, 'Invalid ZoneCategory Id'));
      }

      next(error);
    }
  },

  deleteAZoneCategory: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ZoneCategory.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'ZoneCategory does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid ZoneCategory id'));
        return;
      }
      next(error);
    }
  },

};