var express = require('express');


var api = require('../controllers/Api');
var shared = require('../controllers/shared');
var router = express.Router();



/* GET home page. */

router.get('/', shared.checkLogin, function (req, res) {

  res.render('device/list',
    {
      title: 'IOT access control - device list',
      layout: 'layoutAdmin',
      context: shared.getContext(req)
    });
});
router.get('/action/:deviceId', shared.checkLogin, function (req, res) {

  res.render('device/action',
    {
      title: 'IOT access control',
      layout: 'layoutAdmin',
      id: req.params.deviceId,
    });


});

router.get('/getDevices', shared.checkLogin, function (req, res) {

  var user = req.cookies.us;
  console.log(user);
  api.getDevices(user, function (data) {

    res.json(data);
  });
});

router.get('/getDevice/:deviceId', function (req, res) {
  console.log(req.body);
  var user = {
    deviceId: req.params.deviceId
  };
  console.log(user);
  api.getDevice(user, function (data) {

    res.json(data);
  });
});


router.post('/checkSeriNumber', function (req, res) {

  console.log(req.body);
  api.checkSeriNumber(req.body, function (data) {

    res.json(data);
  });
});

router.post('/updateDevice', shared.checkLogin, function (req, res) {

  console.log(req.body);
  var user = req.cookies.us;
  var device = {
    userId: user.userId,
    device: req.body
  };
  api.updateDevice(device, function (data) {

    res.json(data);
  });
});


router.post('/deleteDevice', function (req, res) {

  console.log(req.body);
  var user = req.cookies.us;
  var device = {
    userId: user.userId,
    device: req.body
  };
  api.deleteDevice(device, function (data) {

    res.json(data);
  });
});


router.get('/add', function (req, res, next) {

  res.render('device/add',
    {
      title: 'IOT access control - add new device',
      layout: 'layoutAdmin',
      context:shared.getContext(req)
    });
});

router.post('/add', function (req, res, next) {


  var user = req.cookies.us;
  console.log(req.body);
  var device = {
    userId: user.userId,
    devices: req.body
  };

  api.addDevice(device, function (data) {

    res.json(data);
  });
});




module.exports = router;
