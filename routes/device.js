var express = require('express');


var api = require('../controllers/Api');
var router = express.Router();

function checkSignIn(req, res, next) {

  if (req.cookies.us) {
    next();     //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");

    res.redirect('/home/login');
    //next(err);  //Error, trying to access unauthorized page!
  }
}

/* GET home page. */

router.get('/', checkSignIn, function (req, res) {

  res.render('device/list', { title: 'IOT access control', layout: 'layoutAdmin' });
});
router.get('/action/:deviceId', checkSignIn, function (req, res) {
  var user = {
    deviceId: req.params.deviceId
  };
  console.log(user);
  api.getDevice(user, function (data) {

    var response = JSON.parse(data.data);
    console.log(response);
    res.render('device/action',
      {
        title: 'IOT access control',
        layout: 'layoutAdmin',
        data: response
      });
  });

});

router.get('/getDevices', function (req, res) {

  var user = req.cookies.us;
  api.getDevices(user, function (data) {

    res.json(data);
  });
});

router.post('/checkSeriNumber', function (req, res) {

 console.log(req.body.device);
  api.checkSeriNumber(req.body, function (data) {

    res.json(data);
  });
});

router.get('/add', function (req, res, next) {

  res.render('device/add', { title: 'IOT access control', layout: 'layoutAdmin' });
});

router.post('/add', function (req, res, next) {


  var user = req.cookies.us;

  var device = {
    userId: user.userId,
    deviceName: req.body.name,
    deviceSeri: req.body.seri,
  };

  api.addDevice(device, function (data) {

    res.json(data);
  });
});




module.exports = router;
