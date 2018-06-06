app.service("homeService", function($http) {
  this.userRegister = function(data) {
    var request = $http({
      method: "post",
      url: "/home/register",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };
  this.userLogin = function(data) {
    var request = $http({
      method: "post",
      url: "/home/login",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };

  this.updateUser = function(data) {
    var request = $http({
      method: "post",
      url: "/setting/updateUser",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };

  this.changePass = function(data) {
    var request = $http({
      method: "post",
      url: "/setting/changePass",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };
  this.getStatic = function() {
    var request = $http({
      method: "get",
      url: "/static",
      contentType: "application/json; charset=UTF-8",

    });
    return request;
  };


  this.addDevice = function(data) {
    var request = $http({
      method: "post",
      url: "/device/add",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };

  this.getDevices = function() {
    var request = $http({
      method: "get",
      url: "/device/getDevices",
      contentType: "application/json; charset=UTF-8",

    });
    return request;
  };

  this.getUser = function() {
    var request = $http({
      method: "get",
      url: "/setting/getUser",
      contentType: "application/json; charset=UTF-8",

    });
    return request;
  };

  this.getDevice = function(val) {
    var request = $http({
      method: "get",
      url: "/device/getDevice/" + val,
      contentType: "application/json; charset=UTF-8",

    });
    return request;
  };

  this.updateDevice = function(data) {
    var request = $http({
      method: "post",
      url: "/device/updateDevice",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };

  this.deleteDevice = function(data) {
    var request = $http({
      method: "post",
      url: "/device/deleteDevice",
      contentType: "application/json; charset=UTF-8",
      data: data
    });
    return request;
  };
  this.checkSeriNumber = function(data) {
    var request = $http({
      method: "post",
      url: "/device/checkSeriNumber",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({
        seriNumber: data
      })
    });
    return request;
  };

});

app.controller("homeController", function($scope, homeService, socket) {

  $scope.model = {};
  $scope.userRegister = function() {

    var promiseGet = homeService.userRegister($scope.user);
    promiseGet.then(function(pl) {
        if (pl.data.statusCode == 200) {
          window.location = "/home/login";
         

          //toastr.error(pl.data.Message)
        }else{

        }

      },
      function(errorPl) {});
  };

  $scope.updateUser = function() {
    $scope.user.fullName=$scope.user.firstName+" "+ $scope.user.lastName;
    var promiseGet = homeService.updateUser($scope.user);
    promiseGet.then(function(pl) {
        if (pl.data.statusCode == 200) {

          console.log(pl.data);


          //toastr.error(pl.data.Message)
        }

      },
      function(errorPl) {});
  };
  $scope.getUser = function() {

    var promiseGet = homeService.getUser($scope.user);
    promiseGet.then(function(pl) {
        if (pl.data.statusCode == 200) {
          $scope.user = JSON.parse(pl.data.data);

          //toastr.error(pl.data.Message)
        }

      },
      function(errorPl) {});
  };

  var inputCode = ['INPUTA', 'INPUTB', 'INPUTC', 'INPUTD', 'INPUTE']
  $scope.userLogin = function() {

    if(!$scope.user||!$scope.user.userName || !$scope.user.password){
      $scope.error="username or password invalid";
      return;
    }
    var promiseGet = homeService.userLogin($scope.user);
    promiseGet.then(function(pl) {
      if (pl.data.statusCode == 200) {
        window.location = "/device";
      }else{
       
        $scope.error=pl.data.data.message;
      }
      },
      function(errorPl) {});
  };
  $scope.changePass = function() {

    // if(!$scope.user||!$scope.user.userName || !$scope.user.password){
    //   $scope.error="username or password invalid";
    //   return;
    // }
    var senddata={
      password:$scope.user.currentPass,
      newPass:$scope.user.newPass,
      confirmNewPass:$scope.user.confirmNewPass
    }
    var promiseGet = homeService.changePass(senddata);
    promiseGet.then(function(pl) {
      if (pl.data.statusCode == 200) {
        //window.location = "/device";
      }else{
       
        $scope.error=pl.data.data.message;
      }
      },
      function(errorPl) {});
  };


  $scope.getDeviceInfo = function() {
    var seri = $('#seri').val();
    var promiseGet = homeService.getDevice(seri);
    promiseGet.then(function(pl) {
        if (pl.data) {
          if (pl.data.statusCode == 200) {
            //window.location = "/device";
            $scope.deviceInfo = JSON.parse(pl.data.data);
          }

        }

      },
      function(errorPl) {});
  };

  $scope.checkSeriNumber = function() {
    $scope.error = undefined;
    var promiseGet = homeService.checkSeriNumber($scope.seriNumber);
    promiseGet.then(function(pl) {
        if (pl.data) {
          if (pl.data.statusCode == 200) {
            $scope.model = JSON.parse(pl.data.data);
            const devices = [];
            if ($scope.model.channelInput > 1) {
              for (let index = 0; index < $scope.model.channelInput; index++) {
                const element = {
                  name: "Input " + parseInt(index + 1),
                  seri: $scope.seriNumber,
                  channelCode: inputCode[index],
                  isRepeat: false,
                  repeatTime: 60,
                  isSetTime: false,
                  setTime: '08_30'
                };
                devices.push(element);
              }
              $scope.devices = devices;
            }


          } else {
            $scope.error = "Khong tim thay seri, vui long kiem tra lai, Hoac lien he nha cung cap";
            $scope.model = {};
          }

        }

      },
      function(errorPl) {});
  };

  $scope.addDevice = function() {
    $scope.error = undefined;
    if (!$scope.device) {
      $scope.error = "Thông tin thiết bị không hợp lệ, vui lòng kiểm tra lại";
      return;
    }
    var devices = [];
    if ($scope.device) {
      devices.push({
        name: $scope.device.name,
        seri: $scope.seriNumber,
        channelCode: inputCode[0],
        isRepeat: false,
        repeatTime: 60,
        isSetTime: false,
        setTime: '08_30'
      });
    } else {
      devices = $scope.devices;
    }


    var promiseGet = homeService.addDevice(devices);
    promiseGet.then(function(pl) {
        if (pl.data) {
          if (pl.data.statusCode == 200) {
            window.location = "/device";
          }

        }

      },
      function(errorPl) {});
  };

  $scope.getDevices = function() {

    var promiseGet = homeService.getDevices();
    promiseGet.then(function(pl) {

        if (pl.data) {
          if (pl.data.statusCode == 200) {
            $scope.devices = [];
            var result = JSON.parse(pl.data.data);
            result.forEach(element => {
              var row = {
                _id: element._id,
                name: element.name,
                seri: element.seri,
                nameEncode: Base64.encode(element.name),
                channel: element.channel,
                channelCode: element.channelCode,
                isRepeat: element.isRepeat,
                repeatTime: element.repeatTime,
                isSetTime: element.isSetTime,
                setTime: element.setTime

              }
              $scope.devices.push(row);
            });

          }

        }

      },
      function(errorPl) {});
  };

  $scope.updateDevice = function() {

    var promiseGet = homeService.updateDevice($scope.deviceInfo);
    promiseGet.then(function(pl) {

        if (pl.data) {
          if (pl.data.statusCode == 200) {
            //$scope.devices = JSON.parse(pl.data.data);

          }

        }

      },
      function(errorPl) {});
  };

  $scope.deleteDevice = function() {

    if (!$scope.selectedDevice) return;
    var promiseGet = homeService.deleteDevice($scope.selectedDevice);
    promiseGet.then(function(pl) {

        if (pl.data) {
          if (pl.data.statusCode == 200) {
            hideDropdowns();
            $scope.getDevices();

          }

        }

      },
      function(errorPl) {});
  };
  $scope.selectDevice = function(data) {

    $scope.selectedDevice = data;

  };



  $scope.getStatic = function() {

    var serinumber = {
      seri: $scope.deviceInfo.seri //'35367'
    };
    socket.emit('joinrom', serinumber);

  };

  $scope.updateStatic = function() {

    var a = $scope.isChecked;

    var static = {
      command: $scope.isChecked ? "R1ONN" : "R1OFF",
      seri: $scope.deviceInfo.seri,
      channelCode: $scope.deviceInfo.channelCode
      //Room: "abc"
    };
    socket.emit('update-static', static);
  };
  socket.on('Server-send-static', function(data) {

    $scope.isChecked = data.command;
    $scope.$digest();
    console.log($scope.isChecked);
  });

  socket.on('mymessage', function(data) {
    var res = data.split('=');

    console.log(data);
  });
});