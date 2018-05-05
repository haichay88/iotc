var express = require('express');
var md5 = require('md5');
var api = require('../controllers/Api');
var homeRouter = express.Router();


/* GET home page. */
homeRouter.get('/login', function (req, res, next) {
  res.render('home/login', { title: 'IOT access control', layout: 'layoutLogin' });
});


homeRouter.get('/register', function (req, res, next) {

  res.render('home/register', { title: 'IOT access control', layout: 'layoutLogin' });
});

homeRouter.post('/register', function (req, res, next) {
  req.body.password = md5(req.body.password);
  api.userRegister(req.body, function (data) {
    res.json(data);
  });

});

homeRouter.post('/login', function (req, res, next) {
  req.body.password = md5(req.body.password);
  api.userLogin(req.body, function (data) {
    console.log(data);

    req.session.user=data.data;
   
    res.json(data);
  });

});



module.exports = homeRouter;
