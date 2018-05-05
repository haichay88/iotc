var express = require('express');

var api = require('../controllers/Api');
var router = express.Router();

function checkSignIn(req, res,next){
  console.log(req.session.user);
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
     var err = new Error("Not logged in!");
     console.log(req.session.user);
     res.redirect('/home/login');
     //next(err);  //Error, trying to access unauthorized page!
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect
  res.render('home/index', { title: 'IOT access control', layout: 'layoutDefault' });
});
router.get('/home/login', function (req, res, next) {
  res.render('home/login', { title: 'IOT access control', layout: 'layoutLogin' });
});


router.get('/device',checkSignIn,function (req, res) {
 
  res.render('device/list', { title: 'IOT access control', layout: 'layoutAdmin' });
});

router.get('/device/add', function (req, res, next) {
 
  res.render('device/add', { title: 'IOT access control', layout: 'layoutVultr' });
});

router.get('/data/', function (req, res, next) {
  
  
  res.render('data', { data: '1000',layout:false});
});

router.get('/static/', function (req, res, next) {
  
  api.getStatic(function(data){
    
    res.json(data);
  });
});


router.post('/update/', function (req, res, next) {
  
  api.UpdateStatic(req.body,function(data){
    
    res.json(data);
  });
 
  //res.render('index', { title: 'Express',layout:'layout'});
});

module.exports = router;
