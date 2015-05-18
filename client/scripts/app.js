var myApp = angular.module('myApp', []);
var from = "USD", to = "EUR";

myApp.controller('CurrencyController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
        $scope.heading = "Enter Amount: ";
        var symbol;

        $scope.convert = function (curr) {

            if (curr == "special") {
                from = $scope.from;
                to = $scope.to;
            } else {
                from = curr.slice(0, 3);
                to = curr.slice(3);
            }

            var symbol = to == "USD" ? symbol = "$" : symbol = to+"$";
            if (to=="EUR"){symbol="€"}

            $http.get('/currency/get?from=' + from + '&to=' + to).
                success(function (data) {
                    console.log(data.rate);
                    $scope.message = $filter('currency')($scope.amt * data.rate, symbol);
                });
        };

    }
])
;