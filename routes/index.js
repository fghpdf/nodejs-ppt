var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//认证页面
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
