var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

//routers
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var roomRouter = require('./routes/room');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://localhost:27017/bayPoint', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on("connected",(err,res) => {
    console.log("mongoose is connected");
});

//configure passport
app.use(require("express-session")({
  secret: "This is my secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// include with passport local mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended: true}));



// view engine setup
app.set('views', 
[
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/admin/'),
  path.join(__dirname, 'views/auth/')
]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', adminRouter);
app.use('/user', authRouter);
app.use('/room', roomRouter);

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
