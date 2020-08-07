var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const apiRouter = require('./routes/api')
const methodOvveride = require('method-override')
const session = require("express-session");
const flash = require("connect-flash");

var app = express();


// database connection
mongoose.connect("mongodb://127.0.0.1:27017/db_BISKCil", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection

db.on('error', (err)=> {
  console.log(err)
})

db.once('open', ()=> console.log('connection database succesefully'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOvveride("_method"));

// express session and connect flash
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
// connect flash
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')))

// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
// admin router
app.use('/admin', adminRouter)

// api router
app.use('/api/v1/member', apiRouter)


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
