const createError = require('http-errors');
const mongoose = require('mongoose');
const csv=require('csvtojson');

const Date = require('../Models/Date.model');
const ZoneCategory = require('../Models/ZoneCategory.model');
const ZoneDate     = require('../Models/ZoneDisableDates');
const dateP = require('date-and-time');
module.exports = {
  getAllDates: async (req, res, next) => {
    try {

      const filter_date = req.query.filter_date
      ? {
        date: {
          $regex: req.query.filter_date
        },
      }
      : {};

      const filter_zone = req.query.filter_zone
      ? {
        zone: req.query.filter_zone
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

      const filter_availability = req.query.filter_availability
      ? {
        availability: req.query.filter_availability
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

      var  totalPosts = await Date.find({...filter_date, ...filter_zone, ...filter_vehicle, ...filter_timing, ...filter_availability}).countDocuments().exec();

      Date.find({...filter_date, ...filter_zone, ...filter_vehicle, ...filter_timing, ...filter_availability},{},
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

  createNewDate: async (req, res, next) => {
    try {
      const date = new Date(req.body);
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

  createNewDisableZones: async (req, res, next) => {
    try {
      const date = new ZoneDate(req.body);
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


  checkAvilabilityByData: async (req, res, next) => {
    try {
      const date = await Date.find({date:req.body.date});
      if (!date.length) {
        throw createError(201, 'Date does not exist.');
      }
     let zones=[];
     const zids = await ZoneDate.find({date:req.body.date});

     if(zids.length != 0){
      for(let zid of zids){
        if (zid.vehicle == 0 && zid.timing == 0) {
          const zname = await ZoneCategory.find({ availability:1 , _id:{$ne:zid.zone_id} }).distinct('name');
          zones= zname;
        }else{

          var vehicle_id = 0;
          var time_id = 0;

          switch(req.body.vehicle) {
          case 'Canter':
            vehicle_id = 2;
            break;
          case 'Gypsy':
            vehicle_id = 1;
            break;
          default:
            vehicle_id = 0;
          }

          switch(req.body.timing) {
          case 'Evening':
            time_id = 2;
            break;
          case 'Morning':
            time_id = 1;
            break;
          default:
            time_id = 0;
          }



          const zid_e = await ZoneDate.findOne({date: req.body.date, zone_id: zid.zone_id,  vehicle_type: vehicle_id, timing: time_id});


          

          if(zid_e){
            const zname = await ZoneCategory.find({ availability:1 , _id:{$ne:zid.zone_id} }).distinct('name');
            console.log('zname',zname);
            zones= zname;

          }else{
            // zones = [];
          }

        }
      }
    } else {
        const zname = await ZoneCategory.find({ availability:1 }).distinct('name');
        zones = zname;
   }

   if (zones.length <= 0) {
    const zname = await ZoneCategory.find({ availability:1 }).distinct('name');
    zones = zname;
  }

     let zoneArr = [];
     for(let zonea of zones){
        zoneArr.push(zonea.name);
      }
     res.send({
        success: true,
        message: 'Data fateched',
        data: date,
        zones: zones,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(201, error.message));
        return;
      }
      next(error);
    }
  },


  checkAvilabilityByDate: async (req, res, next) => {
    try {
      const date = await Date.find({date:req.body.date});
      const vehicles = await Date.find({date:req.body.date},{vehicle:1}).distinct('vehicle');
      const timings = await Date.find({date:req.body.date},{timing:1}).distinct('timing');
      if (!date.length) {
        throw createError(201, 'Date does not exist.');
      }
     let zones=[];
     const zids = await ZoneDate.find({date:req.body.date}).distinct('zone_id');
    //  if(zids.length != 0){
    //     for(let zid of zids){
    //       const zname = await ZoneCategory.find({ availability:1 , _id:{$ne:zid} }).distinct('name');
    //       zones= zname;
    //     }
    //  } else {
    //       const zname = await ZoneCategory.find({ availability:1 }).distinct('name');
    //       zones = zname;
    //  }
     //const zones = await ZoneCategory.find({  startDate: { $lte : req.body.date }, endDate: {$gte: req.body.date}  , availability:1 }).distinct('name');
     //const zones = await ZoneCategory.find({availability:1},{$not:[{startDate: {$not:{$gte:["startDate",req.body.date]}}},{endDate: {$not:{$lte:["endDate",req.body.date]} }}]});
    //  const zonesa = await ZoneCategory.find({availability:1, _id:{$ne:zid} });


     if(zids.length != 0){
      for(let zid of zids){
        const zname = await ZoneCategory.find({ availability:1 , _id:{$ne:zid} }).distinct('name');
        zones= zname;
      }
   } else {
        const zname = await ZoneCategory.find({ availability:1 }).distinct('name');
        zones = zname;
   }

     let zoneArr = [];
     for(let zonea of zones){
        zoneArr.push(zonea.name);
      }
     console.log(zones);
     res.send({
        success: true,
        message: 'Data fateched',
        data: date,
        zones: zones,
        vehicles: vehicles,
        timings: timings
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(201, error.message));
        return;
      }
      next(error);
    }
  },

  checkAvilability: async (req, res, next) => {
    try {

      const ZoneCategoryCount = await ZoneCategory.countDocuments({name: req.body.zone, availability: 0});

      if (ZoneCategoryCount > 0) {
        throw createError(201, 'Booking is not available in this zone.');
      }

      const date = await Date.findOne({date: req.body.date ,timing: req.body.timing  , vehicle: req.body.vehicle , zone: req.body.zone});
      if (!date) {
        throw createError(201, 'Date does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fateched',
        data: date
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(201, error.message));
        return;
      }
      next(error);
    }
  },

  findDateById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await Date.findById(id);
      if (!date) {
        throw createError(201, 'Date does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(201, 'Invalid Date id'));
        return;
      }
      next(error);
    }
  },

  updateADate: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Date.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(201, 'Date does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(201, 'Invalid Date Id'));
      }

      next(error);
    }
  },

  updateAvilability: async (req, res, next) => {
    console.log(req.params.id);
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Date.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(201, 'Date does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(201, 'Invalid Date Id'));
      }

      next(error);
    }
  },


  updateAvilabilityFront: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Date.updateMany( { date: req.body.date, zone: req.body.zone, vehicle: req.body.vehicle, timing: req.body.timing },{ $inc: { availability: req.body.booking_persons }});

      if (!result) {
        throw createError(201, 'Date does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(201, 'Invalid Date Id'));
      }

      next(error);
    }
  },

  deleteADate: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Date.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Date does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Date id'));
        return;
      }
      next(error);
    }
  },

  uploadCsv: async (req, res, next) => {

    if (req.file && (req.file.size > 0)) {
      var file_path = req.file.path;
    }
    csv()
    .fromFile(file_path)
    .then( async(jsonObj) =>{
      await Date.deleteMany({});
      const result = await  Date.insertMany(jsonObj);
      res.send({
        success: true,
        message: 'Csv data uploaded',
      });      
    });

    

  },

  getZoneDates: async(req,res,next) => {
     try{
      var page = parseInt(req.query.page)||1;
      var size = parseInt(req.query.size)||15;
      var query = {}
      if(page < 0 || page === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var  totalPosts = await ZoneDate.find({zone_id:req.params.id}).countDocuments().exec();

      ZoneDate.find({zone_id:req.params.id},{},
        query,function(err,data) {
          if(err) {
            response = {"error": true, "message": "Error fetching data"+err};
          } else {
            response = {"error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
          }
          res.json(response);
        }).sort({ $natural: -1 });
    
    } catch(err){console.log(err)}
  },

  dateZoneDelete: async(req, res, next) =>{
      
      try{
         const id     = req.params.id;
         const result = await ZoneDate.findByIdAndDelete(id);
         if (!result) {
          throw createError(404, 'Date does not exist.');
        }
        res.send({
          success: true,
          message: 'Data deleted',
        });

      } catch(err){
        console.log(err);
      }
  },

  uploadZoneCsv: async (req, res, next) => {

    if (req.file && (req.file.size > 0)) {
      var file_path = req.file.path;
    }
    
    await ZoneDate.deleteMany({zone_id:req.body.zone_id});
    
    csv()
    .fromFile(file_path)
    .then( async(jsonObj) =>{
      jsonObj.map((jb,i)=>{
        jsonObj[i].zone_id = req.body.zone_id
      });
      const result =  await ZoneDate.insertMany(jsonObj);
      res.send({
        success: true,
        response:result,
        message: 'Csv data uploaded',
      });      
    });

    

  },


};