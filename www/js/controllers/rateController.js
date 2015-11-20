'use strict';
angular.module('starter')
.controller('RateTabCtrl',['$scope', '$location', function ($scope, $location) {
    console.log('RateTabCtrl');
    $scope.rates = rates;
    $scope.selectedOrigin;
    $scope.selectedDestination;
    $scope.loadDestination = function () {

    };
}]);