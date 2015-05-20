var myApp = angular.module('myApp', ['angular.filter']);
var from = "USD", to = "EUR";
var lastRate;

myApp.controller('CurrencyController', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
        $scope.message = "Enter Amount: ";

        //Load presets
        $scope.getPreset = function () {
            $http.get('/currency/load').
                success(function (data) {
                    console.log(data);
                    $scope.presets = data;
                });
        };
        $scope.getPreset();

        $scope.savePreset = function () {
            $http.post('/currency/save', {from: from, to: to, rate: lastRate}).
                success(function (data) {
                    console.log("Saved!");
                    $scope.getPreset();
                });
        };

        $scope.convert = function (curr) {
            $scope.running = true;
            $scope.message = "Loading...";
            console.log(curr);
            if (curr == "special") {
                from = $scope.from.toUpperCase();
                to = $scope.to.toUpperCase();
            } else {
                from = curr.slice(0, 3);
                to = curr.slice(3);
                //console.log(from,to);
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
                    lastRate = data.rate;
                    $scope.message = $filter('currency')($scope.amt, fromSymbol) + " = "
                        + $filter('currency')($scope.amt * data.rate, symbol);
                });
        };

    }
]);