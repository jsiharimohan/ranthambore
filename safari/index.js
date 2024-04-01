const express = require("express");
const createError = require('http-errors');
const app = express();
//const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
require('./initDB')();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PriceRoute = require('./Routes/Price.route');
app.use('/prices', PriceRoute);

const ZoneCategoryRoute = require('./Routes/ZoneCategory.route');
app.use('/zone-categories', ZoneCategoryRoute);

const DateRoute = require('./Routes/Date.route');
app.use('/dates', DateRoute);

const SafariRoute = require('./Routes/Safari.route');
app.use('/', SafariRoute);

const SeedDataRoute = require('./Routes/SeedData.route');
app.use('/seed-data', SeedDataRoute);


// 404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});




app.listen(process.env.PORT || 5003, () => {
    console.log("Safari server is running on port! ", process.env.PORT);
});
