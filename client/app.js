var createError = require('http-errors');
var express = require('express');
const {engine} = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const helper = require('./helper/hbsHelper');
var mainrouter = require('./routes/index');

var app = express();
app.engine('hbs', engine({
    layoutsDir: path.join(__dirname , '/views/layouts'),
    partialsDir: path.join(__dirname , '/views/partials'),
    extname: 'hbs',
    helpers: helper,
}));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(sassMiddleware({
  src: path.join(__dirname, '/scss'),
  dest: path.join(__dirname, '/public'),
  debug: true,
  outputStyle: 'compressed',
}));

app.use("/stylesheet",express.static(path.join(__dirname, '/public/stylesheet')));
app.use("/assets",express.static(path.join(__dirname, '../static/images')));

app.use('', mainrouter);


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