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
router.get('/', function (req, res, next) {

  res.render('home/index', { title: 'IOT access control', layout: 'layoutDefault' });
});

router.get('/data/', function (req, res, next) {


  res.render('data', { data: '1000', layout: false });
});

router.get('/static/', function (req, res, next) {

  api.getStatic(function (data) {

    res.json(data);
  });
});


router.post('/update/', function (req, res, next) {

  api.UpdateStatic(req.body, function (data) {

    res.json(data);
  });

  //res.render('index', { title: 'Express',layout:'layout'});
});

module.exports = router;
