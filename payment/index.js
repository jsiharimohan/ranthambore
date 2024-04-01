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

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PaymentRoute = require('./Routes/Payment.route');

app.use('/', PaymentRoute);


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

app.get('/list', (req, res) => res.send("In payment list"));

app.get('/', (req, res) => res.send("In payment info page"));


app.listen(process.env.PORT || 5002, () => {
  console.log('hh');
  console.log("Payment server is running on port! ", process.env.PORT);
});
