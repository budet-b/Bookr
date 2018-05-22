// app.js

// MARK: Imports

var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var lodash        = require("lodash");
var bodyParser    = require("body-parser");
var index         = require('./index');

// MARK: Configuration app

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use((req, res, next) => { next(createError(404)) });
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(404).json({
    error: err.message
  });
});

// MARK: Launch app

app.listen(8080, () => {
  console.log('Example app listening on port 8080');
});

module.exports = app;