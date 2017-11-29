
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var user = require('./routes/user');
var Liberary = require('./routes/liberary');

var app = express();

// Connect to our database
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://sanjay:123456@ds155582.mlab.com:55582/librarydb', {
  useMongoClient: true,
  /* other options */
});

// Configure body-parser
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/user', user);
// app.use('/profile', profile);
app.use('/liberary', Liberary);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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