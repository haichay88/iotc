var express = require('express');

var api = require('../controllers/Api');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout' });
});

router.get('/data/', function (req, res, next) {
  
  
  res.render('data', { data: '1000',layout:false});
});

router.post('/update/', function (req, res, next) {
  
  api.UpdateStatic(req.body,function(data){
    
    res.json(data);
  });
 
  //res.render('index', { title: 'Express',layout:'layout'});
});

module.exports = router;
