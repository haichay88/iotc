var request = require('request');
var url=require('../config/configUrl');

var api = {
   
    
    addModel: function (data,callback) {
       
        request.post({
            url: url+'/model/addModelDevice',
            form: data
        }
            , function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                var res={
                    statusCode:response && response.statusCode,
                    data:body
                }
                callback(res);
            });
    },
    getModels: function (callback) {
       
        request.get({
            url: url+'/model/getModelDevices',
        }
            , function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                var res={
                    statusCode:response && response.statusCode,
                    data:body
                }
                callback(res);
            });
    },
    deleteModel: function (data,callback) {
       
        request.post({
            url: url+'/model/deleteModel',
            form: data
        }
            , function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                var res={
                    statusCode:response && response.statusCode,
                    data:body
                }
                callback(res);
            });
    }
}
module.exports = api;