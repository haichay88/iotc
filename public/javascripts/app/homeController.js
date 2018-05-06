app.service("homeService", function ($http) {
    this.userRegister = function (data) {
        var request = $http({
            method: "post",
            url: "/home/register",
            contentType: "application/json; charset=UTF-8",
            data: data
        });
        return request;
    };
    this.userLogin = function (data) {
        var request = $http({
            method: "post",
            url: "/home/login",
            contentType: "application/json; charset=UTF-8",
            data: data
        });
        return request;
    };
    this.getStatic = function () {
        var request = $http({
            method: "get",
            url: "/static",
            contentType: "application/json; charset=UTF-8",

        });
        return request;
    };


    this.addDevice = function (data) {
        var request = $http({
            method: "post",
            url: "/device/add",
            contentType: "application/json; charset=UTF-8",
            data: data
        });
        return request;
    };

    this.getDevices = function () {
        var request = $http({
            method: "get",
            url: "/device/getDevices",
            contentType: "application/json; charset=UTF-8",
            
        });
        return request;
    };

    this.updateDevice = function () {
        var request = $http({
            method: "get",
            url: "/device/updateDevice",
            contentType: "application/json; charset=UTF-8",
            
        });
        return request;
    };

});

app.controller("homeController", function ($scope, homeService) {

    $scope.userRegister = function () {

        var promiseGet = homeService.userRegister($scope.user);
        promiseGet.then(function (pl) {
            if (pl.data) {
                console.log(pl.data);


                //toastr.error(pl.data.Message)
            }

        },
            function (errorPl) {
            });
    };

    $scope.userLogin = function () {

        var promiseGet = homeService.userLogin($scope.user);
        promiseGet.then(function (pl) {
            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    window.location = "/device";
                }

            }

        },
            function (errorPl) {
            });
    };

    $scope.addDevice = function () {

        var promiseGet = homeService.addDevice($scope.device);
        promiseGet.then(function (pl) {
            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    window.location = "/device";
                }

            }

        },
            function (errorPl) {
            });
    };


    $scope.getDevices = function () {

        var promiseGet = homeService.getDevices();
        promiseGet.then(function (pl) {
           
            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    $scope.devices=JSON.parse( pl.data.data);

                }

            }

        },
            function (errorPl) {
            });
    };

    $scope.updateDevice = function () {

        var promiseGet = homeService.updateDevice();
        promiseGet.then(function (pl) {
           
            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    $scope.devices=JSON.parse( pl.data.data);

                }

            }

        },
            function (errorPl) {
            });
    };


    $scope.loadStatic = function () {


        var promiseGet = testService.getStatic();
        promiseGet.then(function (pl) {
            debugger
            if (pl.data) {

                var data = JSON.parse(pl.data);
                $scope.lam1 = data[0].lam1 == '1' ? true : false;
                $scope.lam2 = data[0].lam2 == '1' ? true : false;
                $scope.lam3 = data[0].lam3 == '1' ? true : false;
                $scope.lam4 = data[0].lam4 == '1' ? true : false;
            }

        },
            function (errorPl) {
            });
    };
});