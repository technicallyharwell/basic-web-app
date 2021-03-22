var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// mongodb
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//the line below tells express to serve static objects from the /public/ dir,
//..but makes it seem like they are accessed from the top-level dir
app.use(express.static(path.join(__dirname, 'public')));

// these lines are important..
// ..make the db accessible to the router
app.use(function(req, res, next){     // this bit must be placed BEFORE the routing portions
  req.db = db;  // add the db object to all HTTP requests the app makes
  next();
});
app.use('/', indexRouter);      // requests to localhost:3000/ should use the INDEX ROUTER
app.use('/users', usersRouter); // requests to localhost:3000/users should use the USERS ROUTER

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
