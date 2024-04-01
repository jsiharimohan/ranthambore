const createError = require('http-errors');
const mongoose = require('mongoose');

const asyncHandler = require('../Middleware/asyncHandler')

const Customer = require('../Models/Customer.model');
const SafariBooking = require('../Models/SafariBooking.model');
const PackageBooking = require('../Models/PackageBooking.model');
const ChambalBooking = require('../Models/ChambalBooking.model');
const BookingCustomer = require('../Models/BookingCustomer.model');
const CurrentBooking = require('../Models/CurrentBooking.model');


module.exports = {
  getAllSafariBookings: asyncHandler(async (req, res, next) => {

    const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

    const filter_customer = req.query.filter_customer
        ? {
          customer_id: {
            $regex: req.query.filter_customer
          },
        }
        : {};

    const filter_created_at = req.query.filter_created_at
      ? {
        addedAt: {
          $regex: req.query.filter_created_at
        }
      }
      : {};

    const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_status = req.query.filter_status
      ? {
        status: req.query.filter_status
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        timing: req.query.filter_timing
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

    if (req.query.filter_customer_email && !req.query.filter_customer_mobile) {
      var filter = { email : {$regex: req.query.filter_customer_email, $options: 'i' } };
    }else  if (req.query.filter_customer_email && req.query.filter_customer_mobile) {
      var filter = { email : {$regex: req.query.filter_customer_email, $options: 'i' },  mobile : {$regex: req.query.filter_customer_mobile} };
    }else  if (req.query.filter_customer_mobile && !req.query.filter_customer_email) {
      var filter = { mobile : {$regex: req.query.filter_customer_mobile} };
    } else{
      var filter = {};
    }

    var  totalPosts = await SafariBooking.find({...filter_date, ...filter_customer, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing}).countDocuments().exec();

    SafariBooking.find({...filter_date, ...filter_customer, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing},{booking_customers: 0, __v: 0},
      query,function(err,data) {

        /*var data = data.filter(function (el) {
          if (el.customer === null) {
            totalPosts = Number(totalPosts)-1;
          }
          return el.customer != null;
        });*/

        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 }).populate({
        path: 'customer',
        match: filter,
        select: 'name email mobile -_id'
      });
  }),


  getAllPackageBookings: asyncHandler(async (req, res, next) => {

    const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

    const filter_customer = req.query.filter_customer
        ? {
          customer_id: {
            $regex: req.query.filter_customer
          },
        }
        : {};

    const filter_created_at = req.query.filter_created_at
      ? {
        addedAt: {
          $regex: req.query.filter_created_at
        }
      }
      : {};

    const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_status = req.query.filter_status
      ? {
        status: req.query.filter_status
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        timing: req.query.filter_timing
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

    if (req.query.filter_customer_email && !req.query.filter_customer_mobile) {
      var filter = { email : {$regex: req.query.filter_customer_email, $options: 'i' } };
    }else  if (req.query.filter_customer_email && req.query.filter_customer_mobile) {
      var filter = { email : {$regex: req.query.filter_customer_email, $options: 'i' },  mobile : {$regex: req.query.filter_customer_mobile} };
    }else  if (req.query.filter_customer_mobile && !req.query.filter_customer_email) {
      var filter = { mobile : {$regex: req.query.filter_customer_mobile} };
    } else{
      var filter = {};
    }

    var  totalPosts = await PackageBooking.find({...filter_date, ...filter_customer, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing}).countDocuments().exec();

    PackageBooking.find({...filter_date, ...filter_customer, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing},{ booking_customers: 0, __v: 0, updatedAt: 0},
      query,function(err,data) {

        /*var data = data.filter(function (el) {
          if (el.customer === null) {
            totalPosts = Number(totalPosts)-1;
          }
          return el.customer != null;
        });*/

        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 }).populate({
        path: 'customer',
        match: filter,
        select: 'name email mobile -_id'
      });
  }),

  getAllChambalBookings: asyncHandler(async (req, res, next) => {

    const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

    const filter_customer = req.query.filter_customer
        ? {
          customer_id: {
            $regex: req.query.filter_customer
          },
        }
        : {};

    const filter_created_at = req.query.filter_created_at
      ? {
        addedAt: {
          $regex: req.query.filter_created_at
        }
      }
      : {};

    const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_status = req.query.filter_status
      ? {
        status: req.query.filter_status
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        timing: req.query.filter_timing
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

    if (req.query.filter_customer_email && !req.query.filter_customer_mobile) {
      var filter = { email : {$regex: req.query.filter_customer_email, $options: 'i' } };
    }else  if (req.query.filter_customer_email && req.query.filter_customer_mobile) {
      var filter = { email : {$regex: req.query.filter_customer_email, $options: 'i' },  mobile : {$regex: req.query.filter_customer_mobile} };
    }else  if (req.query.filter_customer_mobile && !req.query.filter_customer_email) {
      var filter = { mobile : {$regex: req.query.filter_customer_mobile} };
    } else{
      var filter = {};
    }

    var  totalPosts = await ChambalBooking.find({...filter_date, ...filter_customer, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing}).countDocuments().exec();

    ChambalBooking.find({...filter_date, ...filter_customer, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing},{booking_customers: 0, __v: 0, updatedAt: 0},
      query,function(err,data) {

        /*var data = data.filter(function (el) {
          if (el.customer === null) {
            totalPosts = Number(totalPosts)-1;
          }
          return el.customer != null;
        }); */

        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 }).populate({
        path: 'customer',
        match: filter,
        select: 'name email mobile -_id'
      });
  }),

  findSafariBookingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await SafariBooking.findById(id, '_id date customer_id customer zone booking_customers vehicle timing amount transaction_id status addedAt createdAt').populate(['booking_customers','customer']);
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }
      res.send({
          success: true,
          message: "data fetched",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  },

  findPackageBookingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await PackageBooking.findById(id, '_id date package_id customer timing package_option_nationality package_option_id no_of_kids amount createdAt transaction_id').populate(['customer']);;
      if (!result) {
        throw createError(404, 'Customer does not exist!.');
      }
      res.send({
          success: true,
          message: "data fetched",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  },

  findChambalBookingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ChambalBooking.findById(id,'_id date zone customer booking_name booking_option vehicle time amount id_proof_no no_of_persons_indian no_of_persons_foreigner transaction_id createdAt').populate(['customer']);
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }
      res.send({
          success: true,
          message: "data fetched",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  },

  deleteSafariBooking: async (req, res, next) => {
    const id = req.params.id;
    try {

      const resultDelete = await BookingCustomer.deleteMany({booking_id: id});

      const result = await SafariBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Safari booking does not exist.');
      }
      res.send({
          success: true,
          message: "data deleted",
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Safari booking id'));
        return;
      }
      next(error);
    }
  },

  deletePackageBooking: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await PackageBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Package Booking does not exist.');
      }
      res.send({
          success: true,
          message: "data deleted",
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Package Booking id'));
        return;
      }
      next(error);
    }
  },

  deleteChambalBooking: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ChambalBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Chambal Booking does not exist.');
      }
      res.send({
          success: true,
          message: "data deleted",
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Chambal Booking id'));
        return;
      }
      next(error);
    }
  },

  saveCurrentBookings: async (req, res, next) => {
    try {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      req.body.addedAt = today;

      const date = new CurrentBooking(req.body);

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

  getCurrentBookings: async (req, res, next) => {
    try {

      const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

      const filter_created_at = req.query.filter_created_at
        ? {
          addedAt: {
            $regex: req.query.filter_created_at
          }
        }
        : {};

      const filter_name = req.query.filter_name
        ? {
          name: {
            $regex: req.query.filter_name,
            $options: "i",
          },
        }
        : {};

      const filter_email = req.query.filter_email
        ? {
          email: {
            $regex: req.query.filter_name,
            $options: "i",
          },
        }
        : {};

      const filter_mobile = req.query.filter_mobile
        ? {
          mobile: {
            $regex: req.query.filter_mobile,
            $options: "i",
          }
        }
        : {};

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;
      var type = req.query.type || 'general';
      var query = {}
      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await CurrentBooking.find({ ...filter_date, ...filter_name, ...filter_mobile, ...filter_created_at, ...filter_email }).countDocuments().exec();

      const data = await CurrentBooking.find({ ...filter_date, ...filter_name, ...filter_mobile, ...filter_created_at, ...filter_email }, {},
        query).sort({ $natural: -1 });

      if (!data) {
        response = { "error": true, "message": "Error fetching data" + err };
      } else {

        response = { "success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
      }

      return res.json(response);

    } catch (error) {
      console.log(error.message);
    }
  },

  deleteCurrentBookings: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await CurrentBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Booking does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Booking id'));
        return;
      }
      next(error);
    }
  },

  getCurrentBooking: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await CurrentBooking.findById(id);
      if (!date) {
        throw createError(404, 'Booking does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Booking id'));
        return;
      }
      next(error);
    }
  },

};