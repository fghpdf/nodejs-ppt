var express = require('express');
var router = express.Router();

var passport = require('passport');
var add = require('../sql/mysql-insert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册页面
router.get('/register', function(req, res, next){
   res.render('register', {title:'注册'});
});

router.post('/register', function(req, res, next){
    add(req.body.email, req.body.password, function(err, account){
        if(err){
            return res.render("register", {info: "此账号已存在！"});
        }

        passport.authenticate('local')(req, res, function(){
            req.session.save(function (err){
                if(err){
                    return next(err);
                }
                res.redirect('/index');
            });
        });
    });

});

//登录页面
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/'
}));

router.all('/users', isLoggedIn);
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
      return next();
      
    res.redirect('/');
}

module.exports = router;
