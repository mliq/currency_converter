var myApp = angular.module('myApp', ['angular.filter']);
var from = "USD", to = "EUR";
var lastRate;


myApp.service('MarkerService', ['$http', function ($http) {
    this.add = function(){
        return $http.get('https://restcountries.eu/rest/v1/currency/eur').
            success(function (data) {
                latlng = data[0].latlng;
                var newFeature = {
                    "type": "Feature",
                    "properties": {
                        title: from + to + " = " + lastRate,
                        'marker-symbol': 'a'
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": latlng
                    }
                };
                geojson.features.push(newFeature);
                markerLayer();
                console.log(geojson);
            });
    }
}]);

myApp.controller('CurrencyController', ['$scope', '$http', '$filter', 'MarkerService',
    function ($scope, $http, $filter, MarkerService) {
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
                    MarkerService.add();
                });
        };
    }
]);
//angular.element(document).ready(function () {
//    angular.bootstrap(document, ['myApp']);
//});

