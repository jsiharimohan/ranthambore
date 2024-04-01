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

const ExclusionRoute = require('./Routes/Exclusion.route');
app.use('/exclusions', ExclusionRoute);

const InclusionRoute = require('./Routes/Inclusion.route');
app.use('/inclusions', InclusionRoute);

const FeatureRoute = require('./Routes/Feature.route');
app.use('/features', FeatureRoute);

const PackageRoute = require('./Routes/Package.route');
app.use('/packages', PackageRoute);

const CategoryRoute = require('./Routes/Category.route');
app.use('/categories', CategoryRoute);

const BlockDatesRoute = require('./Routes/BlockDates.route');
app.use('/blockdate', BlockDatesRoute);

const PackageCategoryRoute = require('./Routes/PackageCategory.route');
app.use('/package-categories', PackageCategoryRoute);

const TermRoute = require('./Routes/Term.route');
app.use('/terms', TermRoute);

const CancellationPolicyRoute = require('./Routes/CancellationPolicy.route');
app.use('/cancellation-policies', CancellationPolicyRoute);

const PaymentPolicyRoute = require('./Routes/PaymentPolicy.route');
app.use('/payment-policies', PaymentPolicyRoute);

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

app.get('/list', (req, res) => res.send("In Package list"));

app.get('/', (req, res) => res.send("In package info page"));


app.listen(process.env.PORT || 5001, () => {
  console.log("Package server is running on port! ", process.env.PORT);
});
