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
            $http.get('http://jsonrates.com/get/?from=' + from + '&to=' + to + '&apiKey=jr-5be588f08ecd7855e0c8266a4aeb7d36').
                success(function (data) {
                    console.log(data);
                    $scope.message = $scope.amt * data.rate;
                });
        };

    }
])
;