var request = require('request');
var url='http://144.202.115.228:4000';
var api = {
    getStatic: function (id,callback) {
        
        
        request.get(url+'/video/'+id, function (error, response, body) {
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
    }
}
module.exports = api;