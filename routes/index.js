var express = require('express');
var router = express.Router();

var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var model = require('../database/model');

/* GET home page. */
router.all('/', isLoggedIn);
router.all('/users', isLoggedIn);

router.get('/', function(req, res, next) {
    res.redirect('/users');
});

//注册页面
router.get('/register', function(req, res, next){
   res.render('register', {title:'注册'});
});

router.post('/register', function(req, res, next) {
    var user = req.body;
    var userEmailPromise = null;
    userEmailPromise = new model.User({userEmail: user.userEmail}).fetch();

    return userEmailPromise.then(function(model_fetch) {
        if(model_fetch) {
            res.render('login', {title: '登录', errorMessage: '该邮箱已被注册！'});
        } else {
            var password = user.userPassword;
            var hash = bcrypt.hashSync(password);

            var registerUser = new model.User({
                userEmail: user.userEmail,
                userPassword: hash
            });

            registerUser.save().then(function(model_fetch){
                res.render('login', {title: '登录'});
            });
        }
    });
});

//登录页面
router.get('/login', function(req, res, next) {
    res.render('login', { title: '登陆'});
});

router.post('/login', function(req, res, next){
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }, function(err, user, info){
        console.log(err, user, info);
        if(err) {
            return res.render('login', {title: '登录', errorMessage: err.message});
        }
        if(!user) {
            return res.render('login', {title: '登陆', errorMessage: info.message});
        }
        return req.logIn(user, function(err){
            if(err) {
                return res.render('login', {title: '登陆', errorMessage: err.message});
            } else {
                return res.redirect('/users');
            }
        });
    })(req, res, next);
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;
