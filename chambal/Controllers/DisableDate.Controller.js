const createError = require('http-errors');
const mongoose = require('mongoose');
const csv=require('csvtojson');

const DisableDate = require('../Models/DisableDate.model');

module.exports = {
  getAllDisableDates: async (req, res, next) => {
    try {

      const filter_date = req.query.filter_date
      ? {
        date: {
          $regex: req.query.filter_date
        },
      }
      : {};
      
      var page = parseInt(req.query.page)||1;
      var size = parseInt(req.query.size)||15;
      var query = {}

      if(page < 0 || page === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response);
      }
      
      query.skip = size * (page - 1);
      query.limit = size;

      var  totalPosts = await DisableDate.find({...filter_date}).countDocuments().exec();

      DisableDate.find({...filter_date},{__v: 0},
        query,function(err,data) {
          if(err) {
            response = {"error": true, "message": "Error fetching data"+err};
          } else {
            response = {"error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  getDisableDates: async (req, res, next) => {
    try {
      const results = await DisableDate.find({}, { _id: 0, __v: 0 });
      res.send({
        success: true,
        message: 'Data fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewDisableDate: async (req, res, next) => {
    try {
      const date = new DisableDate(req.body);
      const result = await date.save();
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

  findDisableDateById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await DisableDate.findById(id);
      if (!date) {
        throw createError(404, 'DisableDate does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid DisableDate id'));
        return;
      }
      next(error);
    }
  },

  updateADisableDate: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await DisableDate.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'DisableDate does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid DisableDate Id'));
      }

      next(error);
    }
  },

  deleteADisableDate: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await DisableDate.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'DisableDate does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid DisableDate id'));
        return;
      }
      next(error);
    }
  },

  uploadCsv: async (req, res, next) => {
    var file_path = req.file.path;
    csv()
    .fromFile(file_path)
    .then( async(jsonObj) =>{
      await  DisableDate.deleteMany({});
      const result = await  DisableDate.insertMany(jsonObj);
      res.send({
        success: true,
        message: 'Csv Data uploaded',
      });      
    });
  }
};