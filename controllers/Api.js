var request = require('request');
 //var url='http://144.202.115.228:4000';
var url='http://localhost:4000';
var api = {
    getStatic: function (callback) {
        
        
        request.get(url+'/static/', function (error, response, body) {
           // console.log('error:', error); // Print the error if one occurred
           // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
           // console.log('body:', body); // Print the HTML for the Google homepage.
           //console.log(response);
           
            callback(body);
        });
    },
    UpdateStatic: function (data,callback) {
       
        request.post({
            url: url+'/update',
            form: data
        }
            , function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                callback(body);
            });
    },
    userRegister: function (data,callback) {
       
        request.post({
            url: url+'/user/register',
            form: data
        }
            , function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                callback(body);
            });
    },
    userLogin: function (data,callback) {
       
        request.post({
            url: url+'/user/login',
            form: data
        }
            , function (error, response, body) {
                //console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //console.log('body:', body); // Print the HTML for the Google homepage.
                
                var res={
                    statusCode:response && response.statusCode,
                    data:JSON.parse(body) 
                }
                callback(res);
            });
    },
    addDevice: function (data,callback) {
       
        request.post({
            url: url+'/user/addDevice',
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
    getDevices: function (data,callback) {
       
        request.get({
            url: url+'/user/getDevices',
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
    getDevice: function (data,callback) {
       
        request.post({
            url: url+'/device/getDevice',
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
    updateDevice: function (data,callback) {
       
        request.get({
            url: url+'/device/updateDevice',
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
    checkSeriNumber: function (data,callback) {
       
        request.post({
            url: url+'/model/getModelDevice',
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
    




}
module.exports = api;