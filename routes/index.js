var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout' });
});

router.get('/data/', function (req, res, next) {
  
  
  res.render('data', { data: '1000',layout:false});
});

router.post('/update/', function (req, res, next) {
  
 
  res.render('data', { data: '1000',layout:false});
  //res.render('index', { title: 'Express',layout:'layout'});
});

module.exports = router;
