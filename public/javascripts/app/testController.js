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
});

app.controller("testController", function ($scope, testService) {
    $scope.updateStatic = function () {

        $scope.static = {
            lam1: $scope.lam1 ? '1000' : '0000',
            lam2: $scope.lam2 ? '1000' : '0000'
        };
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

        $scope.static = {
            lam1: $scope.lam1 ? '1000' : '0000',
            lam2: $scope.lam2 ? '1000' : '0000'
        };
        var promiseGet = testService.updateStatic($scope.static);
        promiseGet.then(function (pl) {
            if (pl.data) {
                
                //toastr.error(pl.data.Message)
            }

        },
            function (errorPl) {
            });
    };
});