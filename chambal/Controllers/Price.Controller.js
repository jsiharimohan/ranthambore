const createError = require('http-errors');
const mongoose = require('mongoose');

const Price = require('../Models/Price.model');

module.exports = {
  getAllPrices: async (req, res, next) => {
    try {
      const results = await Price.find({}, { __v: 0 });
      res.send({
        success: true,
        message: 'Data fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getBookingPrices: async (req, res, next) => {
    try {
      const results = await Price.find({}, { __v: 0 });
      res.send({
        success: true,
        message: 'Data fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getBookingPrice: async (req, res, next) => {
    try {

      let total_persons = 0;

      let text = 0;

      let indian_persons = req.body.indians;

      let foreigner_persons = req.body.foreigners;

      if(foreigner_persons == ''){
        total_persons = (parseInt(indian_persons))+((foreigner_persons));
      }else if(indian_persons == ''){
        total_persons = ((indian_persons))+(parseInt(foreigner_persons));
      }else if(indian_persons == '' &&  foreigner_persons == ''){
        total_persons = 0;
      }else{
        total_persons = (parseInt(indian_persons))+(parseInt(foreigner_persons));
      }

      if(total_persons == 0){
        text = 0;
      }

      let safari_per_person_price_indian = await Price.findOne({name: 'Safari Per Person Price Indian'}, { __v: 0, createdAt: 0, updatedAt: 0 });
      let safari_per_person_price_foreigner = await Price.findOne({name: 'Safari Per Person Price Foreigner'}, { __v: 0, createdAt: 0, updatedAt: 0 });
      let lunch_per_person_price = await Price.findOne({name: 'Lunch Per Person Price'}, { __v: 0, createdAt: 0, updatedAt: 0 });
      let pickup_drop_per_jeep_price = await Price.findOne({name: 'Pickup Drop Per Jeep Price'}, { __v: 0, createdAt: 0, updatedAt: 0 });
      let pickup_drop_per_canter_price = await Price.findOne({name: 'Pickup Drop Per Canter Price'}, { __v: 0, createdAt: 0, updatedAt: 0 });

      safari_per_person_price_indian = safari_per_person_price_indian.price;
      safari_per_person_price_foreigner = safari_per_person_price_foreigner.price;
      lunch_per_person_price = lunch_per_person_price.price;
      pickup_drop_per_jeep_price = pickup_drop_per_jeep_price.price;
      pickup_drop_per_canter_price = pickup_drop_per_canter_price.price;
      if(req.body.id == 2){

        if(total_persons <= 6){
          text = pickup_drop_per_jeep_price;
        }else if( (total_persons <= 12) && (total_persons >= 7)){
          text = 2*pickup_drop_per_jeep_price;
        }else if(total_persons > 12){
          text = pickup_drop_per_canter_price*total_persons;
        }

        text = text + ((safari_per_person_price_indian*indian_persons) + (safari_per_person_price_foreigner*foreigner_persons));

      }else if(req.body.id == 1){
        text = ((safari_per_person_price_indian*indian_persons) + (safari_per_person_price_foreigner*foreigner_persons));
      }else if(req.body.id == 3){
        text = (lunch_per_person_price*total_persons);
        text = text + ((safari_per_person_price_indian*indian_persons) + (safari_per_person_price_foreigner*foreigner_persons));
      }else if(req.body.id == 4){

        if(total_persons <= 6){
          text = pickup_drop_per_jeep_price;
        }else if( (total_persons <= 12) && (total_persons >= 7)){
          text = 2*pickup_drop_per_jeep_price;
        }else if(total_persons > 12){
          text = pickup_drop_per_canter_price*total_persons;
        }
        text = text + (lunch_per_person_price*total_persons);
        text = text + ((safari_per_person_price_indian*indian_persons) + (safari_per_person_price_foreigner*foreigner_persons));
      }

      let amount_booking = 0;
      amount_booking = text;

      let gst = (amount_booking*5)/100;

      res.send({
        success: true,
        message: 'Data fetched',
        data: {
          gst : gst,
          price : amount_booking,
          persons : total_persons,
          total : amount_booking+gst,
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewPrice: async (req, res, next) => {
    try {
      const price = new Price(req.body);
      const result = await price.save();
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

  findPriceById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const price = await Price.findById(id);
      if (!price) {
        throw createError(404, 'Price does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: price
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Price id'));
        return;
      }
      next(error);
    }
  },

  updateAPrice: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Price.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Price does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Price Id'));
      }

      next(error);
    }
  },

  deleteAPrice: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Price.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Price does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Price id'));
        return;
      }
      next(error);
    }
  }
};