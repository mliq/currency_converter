var myApp = angular.module('myApp', []);
var from = "USD", to = "EUR";

myApp.controller('CurrencyController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.heading = "Enter Amount: ";

        $scope.convert = function (curr) {
            from = curr.slice(0,3);
            to = curr.slice(3);

            $http.get('/currency/get?from='+from+'&to='+to).
                success(function (data) {
                    console.log(data.rate);
                    //$scope.message = $scope.amt * data.rate;
                });
        };

    }
])
;