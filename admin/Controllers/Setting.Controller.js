const createError = require('http-errors');
const mongoose = require('mongoose');

const Setting      = require('../Models/Setting.model');
const FestivalDate = require('../Models/FestivaDates.model'); 
module.exports = {
  getAllSettings: async (req, res, next) => {
    try {

      const type = req.params.slug;

      Setting.findOne({type:type},{},function(err,data) {
          if(err) {
            response = {"error": true, "message": "Error fetching data"+err};
          } else {
            response = {"success": true, "message": 'data fetched', 'data': data };
          }
          res.json(response);
        }).sort({ $natural: -1 });

    } catch (error) {
      console.log(error.message);
    }
  },

  createNewSetting: async (req, res, next) => {
    try {

      const type = req.params.slug;

      await Setting.deleteOne({type: type});

      data = {
        type : type,
        value : req.body
      }

      const date = new Setting(data);
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

  findSettingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await Setting.findById(id);
      if (!date) {
        throw createError(404, 'Setting does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Setting id'));
        return;
      }
      next(error);
    }
  },

  deleteASetting: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Setting.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Setting does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Setting id'));
        return;
      }
      next(error);
    }
  },

  getAllFestivalDates: async(req,res,next)=>{
    try{
     // const type = req.params.slug;
      FestivalDate.find({},function(err,data){

        if(err)
        response = {"error": true, "message": "Error fetching data"+err};
        else
        response =  {"success": true, "data": data};
    
      res.json(response);
    })
    } catch (error) {console.log(error)}

  },

  getFestivalById: async(req,res,next)=>{
    try{
      const id = req.params.id;
      FestivalDate.find({"_id":id},function(err,data){

        if(err)
        response = {"error": true, "message": "Error fetching data"+err};
        else
        response =  {"success": true, "data": data};
    
      res.json(response);
    })
    } catch (error) 
    {console.log(error)}

  },

  updateFestival: async(req,res,next)=>{
    try{
       
         const id     = req.params.id;
         const op     = {new:true};
         const result = await FestivalDate.findByIdAndUpdate(id, req.body, op);
         if(!result){
         throw createError(404, 'Festival date does not exist');
         }
         res.send({
          success:true,
          status:200,
          msg:"date updated"
         });

    }catch(e)
    {console.log(e.message)}
  },
  
  AddFestivalDate: async ( req, res, next) =>{
   try {
      
      const date = new FestivalDate(req.body);
      const result = await date.save();
      
      res.send({
        success: true,
        message: 'Dates Inserted',
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

  deleteDate : async(req , res, next) =>{
     try{
       
      const id = req.params.id;
      let result = await FestivalDate.findByIdAndDelete(id);
      if(!result){
        throw createError(404, 'Date Not Exist!');
      }
      res.send({
        success:true,
        msg:"Date Deleted",
        data_status:200
      });

     } catch(error){console.log(error)}
  },
};