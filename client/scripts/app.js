var myApp = angular.module('myApp', []);
var from = "USD", to = "EUR";

myApp.controller('CurrencyController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.heading = "Enter Amount: ";

        $scope.convert = function (curr) {
            if (curr == "EURUSD") {
                from = "EUR";
                to = "USD";
            }

            $http.get('/currency').
                success(function (data) {
                    console.log(data.rate);
                    //$scope.message = $scope.amt * data.rate;
                });
        };

    }
])
;