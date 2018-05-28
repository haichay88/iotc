var express = require('express');


var api = require('../controllers/modelApi');
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

    res.render('model/list',
        {
            title: 'Model devices',
            layout: 'layoutAdmin'
        });
});
router.get('/action/:deviceId', checkSignIn, function (req, res) {

    res.render('device/action',
        {
            title: 'IOT access control',
            layout: 'layoutAdmin',
            id: req.params.deviceId,
        });


});

router.get('/getModels', function (req, res) {

  
    api.getModels( function (data) {

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

router.post('/updateDevice', function (req, res) {

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

    res.render('model/add', 
    { title: 'add new model',
     layout: 'layoutAdmin' });
});

router.post('/add', function (req, res, next) {


   
    console.log(req.body);
    var model = {
  
        modelDevices: req.body
    };

    api.addModel(model, function (data) {

        res.json(data);
    });
});

router.post('/delete', function (req, res, next) {


   
    console.log(req.body);
   

    api.deleteModel(req.body, function (data) {

        res.json(data);
    });
});




module.exports = router;
