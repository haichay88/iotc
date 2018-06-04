var express = require('express');
var md5 = require('md5');
var api = require('../controllers/Api');
var homeRouter = express.Router();
var dateExpire = 360 * 24 * 3600 * 1000;

/* GET home page. */
homeRouter.get('/login', function (req, res, next) {
  res.render('home/login', { title: 'IOT access control', layout: 'layoutLogin' });
});


homeRouter.get('/register', function (req, res, next) {

  res.render('home/register', { title: 'IOT access control', layout: 'layoutLogin' });
});

homeRouter.get('/logout', function (req, res, next) {
  res.clearCookie("us");
  res.render('home/login',
    { title: 'IOT access control', layout: 'layoutLogin' });
});

homeRouter.post('/register', function (req, res, next) {
  req.body.password = md5(req.body.password);
  api.userRegister(req.body, function (data) {
    res.json(data);
  });

});

homeRouter.post('/login', function (req, res, next) {
  if (!req.body.password) {
    var response = {
      data: {
        message:"user name or password invalid"
      }
    };
    return res.json(response);
  }
  req.body.password = md5(req.body.password);
  api.userLogin(req.body, function (data) {

    var response = data;

    if (response.statusCode == 200) {
      res.cookie('us', response.data, { httpOnly: true, maxAge: dateExpire });
    }

    res.json(data);
  });

});



module.exports = homeRouter;
