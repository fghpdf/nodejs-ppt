var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');

var routes = require('./routes/index');
var users = require('./routes/users');
var ppt = require('./routes/ppt');

var model = require('./database/model');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/ppt', ppt);


passport.use(new LocalStrategy({
        usernameField: 'userEmail',
        passwordField: 'userPassword'
    },
    function (username, password, done) {
        console.log(username, password);
        new model.User({
            userEmail: username
        }).fetch().then(function(data){
            var user = data;
            if (user === null) {
                return done(null, false, {message: '此账号不存在'});
            } else {
                user = data.toJSON();
                if (!bcrypt.compareSync(password, user.userPassword)) {
                    return done(null, false, {message: '密码错误'});
                } else {
                    return done(null ,user);
                }
            }
        })
    }));

passport.serializeUser(function(user, done) {
    done(null, user.userEmail);
});

passport.deserializeUser(function(username, done) {
    new model.User({userEmail: username}).fetch().then(function(user) {
        done(null, user);
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
