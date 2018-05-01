var express = require('express');

var api = require('../controllers/Api');
var router = express.Router();

/* GET home page. */
router.get('/home/login', function (req, res, next) {
  res.render('home/login', { title: 'IOT access control', layout: 'layoutLogin' });
});

router.get('/device', function (req, res, next) {
 
  res.render('device/list', { title: 'IOT access control', layout: 'layoutVultr' });
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
