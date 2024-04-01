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

const DisableDateRoute = require('./Routes/DisableDate.route');
app.use('/disable-dates', DisableDateRoute);

const ChambalRoute = require('./Routes/Chambal.route');
app.use('/', ChambalRoute);

const SeedDataRoute = require('./Routes/SeedData.route');
app.use('/seed-data', SeedDataRoute);

//404 handler and pass to error handler
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

app.get('/list', (req, res) => res.send("In Chambal list"));

app.get('/', (req, res) => res.send("In chambal info page"));


app.listen(process.env.PORT || 5006, () => {
  console.log("Chambal server is running on port! ", process.env.PORT);
});
