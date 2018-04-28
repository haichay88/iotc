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
                var data=JSON.parse(pl.data);
                $scope.lam1=data[0].lam1=='1'?true:false ;
                $scope.lam2=data[0].lam2=='1'?true:false ;
                $scope.lam3=data[0].lam3=='1'?true:false ;
                $scope.lam4=data[0].lam4=='1'?true:false ;
                //toastr.error(pl.data.Message)
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
            
                var data=JSON.parse(pl.data);
                $scope.lam1=data[0].lam1=='1'?true:false ;
                $scope.lam2=data[0].lam2=='1'?true:false ;
                $scope.lam3=data[0].lam3=='1'?true:false ;
                $scope.lam4=data[0].lam4=='1'?true:false ;
            }

        },
            function (errorPl) {
            });
    };
});