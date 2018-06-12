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
var cors          = require('cors');

// MARK: Configuration app

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use((req, res, next) => {
  next(createError(404))
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(400).json({
    error: err.message
  });
});

// MARK: Launch app

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;