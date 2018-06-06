var express = require('express');

var shared = require('../controllers/shared');
var api = require('../controllers/modelApi');
var router = express.Router();

/* GET home page. */

router.get('/', shared.checkLogin, function (req, res) {

    res.render('model/list',
        {
            title: 'Model devices',
            layout: 'layoutAdmin',
            context:shared.getContext(req)
        });
});


router.get('/getModels', function (req, res) {

  
    api.getModels( function (data) {

        res.json(data);
    });
});

router.get('/add', function (req, res, next) {

    res.render('model/add', 
    { title: 'add new model',
     layout: 'layoutAdmin',
     context:shared.getContext(req)
     });
});

router.post('/add', function (req, res, next) {

    var model = {
  
        modelDevices: req.body
    };

    api.addModel(model, function (data) {

        res.json(data);
    });
});

router.post('/delete', function (req, res, next) {


    api.deleteModel(req.body, function (data) {

        res.json(data);
    });
});




module.exports = router;
