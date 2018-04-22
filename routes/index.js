var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout' });
});

router.get('/data/', function (req, res, next) {
  console.log("t1" + req.query.t1);
  console.log("t2" + req.query.t2);
  console.log("h1" + req.query.h1);
  
  res.render('data', { data: '1000',layout:false});
});

router.post('/data/', function (req, res, next) {
  
 
  res.render('data', { data: '1000',layout:false});
  //res.render('index', { title: 'Express',layout:'layout'});
});

module.exports = router;
