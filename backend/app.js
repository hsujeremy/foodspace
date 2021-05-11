const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const yelpRouter = require('./routes/yelp');
const yelpBusinessRouter = require('./routes/yelp-business');
const confirmPlanRouter = require('./routes/confirm-plan');
const getPlansRouter = require('./routes/get-plans');
const deletePlanRouter = require('./routes/delete-plan');

const app = express();

const admin = require('firebase-admin');

let serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up endpoints
app.use('/', indexRouter);
app.use('/yelp', yelpRouter);
app.use('/yelp-business', yelpBusinessRouter);
app.use('/confirm-plan', confirmPlanRouter);
app.use('/get-plans', getPlansRouter);
app.use('/delete-plan', deletePlanRouter);

// Catch 404 and forward to error handler
app.use(function(_, _, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
