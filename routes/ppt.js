var express = require('express');
var router = express.Router();

var ppt = require('../fs/test');

router.get('/', function(req, res, next){
    res.render('ppt/create', {title: 'create'});
});

router.post('/create', function(req, res, next){
    console.log(req.body);
    ppt.CreateNewPPT(req.body.title, req.body.name, req.body.url, function(err){
        if (err) {
            return res.render("error", {message: "文件操作失败！", error:err});
        }
    });
    res.render("ppt/add", {title: 'add'});
});

router.get('/add', function(req, res, next){
    res.render('ppt/add', {title: 'add'});
});

router.post('/add', function(req, res, next){
    console.log(req.body.text);
    ppt.AddNewPage(req.body.text, function(err){
        if (err) {
            return res.render("error", {message: "文件操作失败！", error:err});
        }
    });
    res.render("ppt/add", {title:'add'});
});

router.get('/preview', function(req, res, next){
    ppt.OutputPPT(function(err){
        if (err) {
            return res.render("error", {message: "命令运行失败！", error:err});
        }
    });
    res.render('ppt/output.html');
});


module.exports = router;