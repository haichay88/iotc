var app;
(function () {
    app = angular.module("iotModule", []);
    
    app.showWait = function (val) {
        if (val)
            $('#loading').show();
        else
            $('#loading').hide();
    }
    app.directive('bootstrapSwitch', [
        function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bootstrapSwitch();

                    element.on('switchChange.bootstrapSwitch', function(event, state) {
                        if (ngModel) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(state);
                            });
                        }
                    });

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue) {
                            element.bootstrapSwitch('state', true, true);
                        } else {
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }
    ]);
    app.factory('socket', ['$rootScope', function($rootScope) {
        var socket = io.connect();
      
        return {
          on: function(eventName, callback){
            socket.on(eventName, callback);
          },
          emit: function(eventName, data) {
            socket.emit(eventName, data);
          }
        }}]);
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
      });
    
})()