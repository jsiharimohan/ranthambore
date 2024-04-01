const express = require("express");
const createError = require('http-errors');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const dotenv = require("dotenv").config();
require('./initDB')();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const AuthRoute = require('./Routes/Auth.route');
const SeedDataRoute = require('./Routes/SeedData.route');
const EnquiryRoute = require('./Routes/Enquiry.route');
const ContactUsRoute = require('./Routes/ContactUs.route');
const SettingRoute = require('./Routes/Setting.route');
const MarqueeRoute = require('./Routes/Marquee.route');
const CustomerRoute = require('./Routes/Customer.route');
const BookingRoute = require('./Routes/Booking.route');
const SeoManagerRoute = require('./Routes/SeoManager.route');
const PaymentRoute = require('./Routes/Payment.route');
const FestivalRoute = require('./Routes/FestivalDates.route');
const PageRoute = require('./Routes/Page.route');

app.use('/auth', AuthRoute);

app.use('/enquiries', EnquiryRoute);

app.use('/contactus/enquiries', ContactUsRoute);

app.use('/settings', SettingRoute);
app.use('/marquees', MarqueeRoute);

app.use('/festival',FestivalRoute);

app.use('/customers', CustomerRoute);

app.use('/bookings', BookingRoute);

app.use('/seed-data', SeedDataRoute);

app.use('/seo-managers', SeoManagerRoute);

app.use('/payment', PaymentRoute);

app.use('/pages', PageRoute);

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


app.listen(process.env.PORT || 5005, () => {
console.log('process.env.MONGO_URL',process.env.MONGO_URL)

  console.log("Ranthambore admin server is running on port! ", process.env.PORT);
});
