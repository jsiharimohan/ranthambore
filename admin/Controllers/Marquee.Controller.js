const createError = require('http-errors');
const mongoose = require('mongoose');

const Marquee      = require('../Models/Marquee.model');
const FestivalDate = require('../Models/FestivaDates.model'); 
module.exports = {
  getAllMarquees: async (req, res, next) => {
    try {

      Marquee.find({},{},async function(err,data) {
        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          if (data.length == 0) {
            const date = new Marquee({ content : 'Marquee Content' });
            const result = await date.save();
            const data = await Marquee.find({});
            response = {"success": true, "message": 'data fetched', 'data': data };

          }else{
            response = {"success": true, "message": 'data fetched', 'data': data };
          }
        }
        res.json(response);
      }).sort({ $natural: -1 });

    } catch (error) {
      console.log(error.message);
    }
  },

  updateMarquee: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Marquee.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Marquee does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Page Id'));
      }

      next(error);
    }
  },

  createNewMarquee: async (req, res, next) => {
    try {

      data = {
        content : req.body.content
      }

      const date = new Marquee(data);
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

  findMarqueeById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await Marquee.findById(id);
      if (!date) {
        throw createError(404, 'Marquee does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Marquee id'));
        return;
      }
      next(error);
    }
  },

  deleteAMarquee: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Marquee.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Marquee does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Marquee id'));
        return;
      }
      next(error);
    }
  },
};