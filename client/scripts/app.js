var myApp = angular.module('myApp', []);
var from = "USD", to = "EUR";

myApp.controller('CurrencyController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
        $scope.message = "Enter Amount: ";

        $scope.convert = function (curr) {
            $scope.running=true;
            $scope.message="Loading...";

            if (curr == "special") {
                from = $scope.from.toUpperCase();
                to = $scope.to.toUpperCase();
            } else {
                from = curr.slice(0, 3);
                to = curr.slice(3);
            }

            var symbol = to == "USD" ? symbol = "$" : symbol = to + " ";
            if (to == "EUR") {
                symbol = "€"
            }
            var fromSymbol = from == "USD" ? fromSymbol = "$" : fromSymbol = from + " ";
            if (from == "EUR") {
                fromSymbol = "€"
            }

            $http.get('/currency/get?from=' + from + '&to=' + to).
                success(function (data) {
                    console.log(data.rate);
                    $scope.message =$filter('currency')($scope.amt,fromSymbol)+" = "
                        +$filter('currency')($scope.amt * data.rate, symbol);
                });
        };

    }
])
;