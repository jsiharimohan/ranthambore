const express = require("express");
const createError = require('http-errors');
const app = express();
const dotenv = require("dotenv").config();
require('./initDB')();
const cors = require("cors");

const path = require('path')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AmenityRoute = require('./Routes/Amenity.route');
app.use('/amenities', AmenityRoute);

const FacilityRoute = require('./Routes/Facility.route');
app.use('/facilities', FacilityRoute);

const HotelRoute = require('./Routes/Hotel.route');
app.use('/hotels', HotelRoute);

const HotelRoomRoute = require('./Routes/HotelRoom.route');
app.use('/hotel-rooms', HotelRoomRoute);



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


app.listen(process.env.PORT || 5000, () => {
  console.log("Hotel server is running on port! ", process.env.PORT);
});
