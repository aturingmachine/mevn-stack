const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

// const index = require('./src/routes/index');
const { apiRoutes } = require('./src/routes/index')
const { webROutes } = require('./src/routes/index')


const app = express();

app.use(cors())

// Use native ES6 Promises since mongoose's are deprecated.
mongoose.Promise = global.Promise

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })

// Fail on connection error.
mongoose.connection.on('error', error => { throw error })


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);


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
});

module.exports = app;


console.log("App running on localhost:" + process.env.PORT)