app.service("testService", function ($http) {
    this.updateStatic = function (data) {
        var request = $http({
            method: "post",
            url: "/update",
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

});

app.controller("testController", function ($scope, testService) {
    $scope.updateStatic = function () {

        $scope.static = {
            lam1: $scope.lam1 ? '1' : '0',
            lam2: $scope.lam2 ? '1' : '0',
            lam3: $scope.lam3 ? '1' : '0',
            lam4: $scope.lam4 ? '1' : '0'
        };
        debugger
        var promiseGet = testService.updateStatic($scope.static);
        promiseGet.then(function (pl) {
            if (pl.data) {
                
                //toastr.error(pl.data.Message)
            }

        },
            function (errorPl) {
            });
    };

    $scope.loadStatic = function () {

       
        var promiseGet = testService.getStatic();
        promiseGet.then(function (pl) {
            if (pl.data) {
                debugger
                //toastr.error(pl.data.Message)
            }

        },
            function (errorPl) {
            });
    };
});