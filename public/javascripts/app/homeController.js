

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
    this.checkSeriNumber = function (data) {
        var request = $http({
            method: "post",
            url: "/device/checkSeriNumber",
            contentType: "application/json; charset=UTF-8",
            data:JSON.stringify({seriNumber:data}) 
        });
        return request;
    };

});

app.controller("homeController", function ($scope, homeService, socket) {

    $scope.model = {};
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

    $scope.checkSeriNumber = function () {

        var promiseGet = homeService.checkSeriNumber($scope.seriNumber);
        promiseGet.then(function (pl) {
            if (pl.data) {
                if (pl.data.statusCode == 200) {
                    $scope.model = JSON.parse(pl.data.data);
                    const devices = [];
                    if ($scope.model.channelInput > 1) {
                        for (let index = 0; index < $scope.model.channelInput; index++) {
                            const element = {
                                name: "Input " + parseInt(index+1),
                                seri: $scope.seriNumber
                            };
                            devices.push(element);
                        }
                        $scope.devices = devices;
                    }


                } else {
                    $scope.model = {};
                }

            }

        },
            function (errorPl) {
            });
    };
    $scope.addDevice = function () {
        var devices = [];
        if($scope.device){
            devices.push({
                name: $scope.device.name,
                seri: $scope.seriNumber
            });
        }else{
            devices=$scope.devices;
        }
       
        
        var promiseGet = homeService.addDevice(devices);
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
                    $scope.devices = JSON.parse(pl.data.data);

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
                    $scope.devices = JSON.parse(pl.data.data);

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


    $scope.getStatic = function () {
        debugger
        var seri=$('#seri').val();
        var serinumber ={
            seri:seri//'35367'
        } ;
        socket.emit('joinrom', serinumber);

    };

    $scope.updateStatic = function () {

        var a = $scope.isChecked;
        var static = {
            command: $scope.isChecked ? "R1ONN" : "R1OFF",
            //Room: "abc"
        };
        socket.emit('update-static', static);
    };
    socket.on('Server-send-static', function (data) {

        $scope.isChecked = data.command;
        $scope.$digest();
        console.log($scope.isChecked);
    });
    socket.on('mymessage', function (data) {
console.log(data);
    });
});