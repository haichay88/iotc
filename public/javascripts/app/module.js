var app;
(function () {
    app = angular.module("iotModule", []);
    
    app.showWait = function (val) {
        if (val)
            $('#loading').show();
        else
            $('#loading').hide();
    }
    
})()