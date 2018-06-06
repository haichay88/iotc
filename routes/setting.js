var express = require('express');


var api = require('../controllers/Api');
var userApi = require('../controllers/userApi');
var shared = require('../controllers/shared');
var md5 = require('md5');
var router = express.Router();



/* GET home page. */

router.get('/', shared.checkLogin, function (req, res) {

  res.render('setting/index', {
    title: 'Setting',
    layout: 'layoutAdmin',
    context:shared.getContext(req)
  });
});


router.get('/getUser', function (req, res) {

  var user = shared.getContext(req);
  
  api.getUser(user, function (data) {
  
    res.json(data);
  });
});


router.post('/updateUser', function (req, res) {

  var user = shared.getContext(req);
  var device = {
    userId: user.userId,
    device: req.body
  };
  api.updateUser(req.body, function (data) {

    res.json(data);
  });
});

router.post('/changePass', function (req, res) {

  console.log(req.body);
  var user = shared.getContext(req);
  if (req.body.newPass != req.body.confirmNewPass) {
    return res.json({
      data: {
        message: "confirm password not match"
      }
    });
  }
  var userData = {
    userName: user.userName,
    userId:user.userId,
    password:md5(req.body.password),
    newPass:md5(req.body.newPass) 
  };
  userApi.changePass(userData, function (data) {

    res.json(data);
  });
});






module.exports = router;