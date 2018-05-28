

app.service("modelService", function ($http) {
   
   

    this.addModel = function (data) {
        var request = $http({
            method: "post",
            url: "/model/add",
            contentType: "application/json; charset=UTF-8",
            data: data
        });
        return request;
    };

    this.getModels = function () {
        var request = $http({
            method: "get",
            url: "/model/getModels",
            contentType: "application/json; charset=UTF-8",

        });
        return request;
    };

    this.getDevice = function (val) {
        var request = $http({
            method: "get",
            url: "/device/getDevice/" + val,
            contentType: "application/json; charset=UTF-8",

        });
        return request;
    };

    this.updateDevice = function (data) {
        var request = $http({
            method: "post",
            url: "/device/updateDevice",
            contentType: "application/json; charset=UTF-8",
            data: data
        });
        return request;
    };

    this.deleteModel = function (data) {
        var request = $http({
            method: "post",
            url: "/model/delete",
            contentType: "application/json; charset=UTF-8",
            data: data
        });
        return request;
    };
    this.checkSeriNumber = function (data) {
        var request = $http({
            method: "post",
            url: "/device/checkSeriNumber",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ seriNumber: data })
        });
        return request;
    };

});

app.controller("modelController", function ($scope, modelService) {

    $scope.model = {};
   
    $scope.addModel = function () {
        var devices = [];
        devices.push($scope.model);
        var promiseGet = modelService.addModel(devices);
        promiseGet.then(function (pl) {
            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    window.location = "/model";
                }

            }

        },
            function (errorPl) {
            });
    };

    $scope.getModels = function () {

        var promiseGet = modelService.getModels();
        promiseGet.then(function (pl) {

            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    $scope.models = [];
                    var result = JSON.parse(pl.data.data);
                    result.forEach(element => {
                        var row = {
                            _id: element._id,
                            seriNumber: element.seriNumber,
                            serinumberEncode:Base64.encode(element.seriNumber),
                            channelInput: element.channelInput,
                            channelAnalog: element.channelAnalog

                        }
                        $scope.models.push(row);
                    });

                }

            }

        },
            function (errorPl) {
            });
    };

    $scope.deleteModel = function () {

        if (!$scope.selectedModel) return;
        var promiseGet = modelService.deleteModel($scope.selectedModel);
        promiseGet.then(function (pl) {

            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    hideDropdowns();
                    $scope.getModels();
                    
                }

            }

        },
            function (errorPl) {
            });
    };
    $scope.selectModel = function (data) {
  
        $scope.selectedModel = data;

    };

});