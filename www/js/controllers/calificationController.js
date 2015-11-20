'use strict';
angular.module('starter')
.controller('CalificationTabCtrl', ['$scope', '$location', '$window', '$stateParams', 'calificationFactory', function ($scope, $location, $window, $stateParams,calificationFactory) {
    console.log('CalificationTabCtrl');
    $scope.user = JSON.parse($window.localStorage['user'] || '{}');
    $scope.calification = {
        customerId: $scope.user.id,
        plate: $stateParams.plate,
        qualityService: 0,
        driverTreat: 0,
        vehicleClean: 0,
        goodPresence: 0,
        recommended: false
    };
    $scope.setRate = function (item, index) {
        switch (item) {
            case 'qualityService':
                $scope.reviews.qualityService = index;
                break;
            case 'driverTreat':
                $scope.reviews.driverTreat = index;
                break;
            case 'vehicleClean':
                $scope.reviews.vehicleClean = index;
                break;
            case 'goodPresence':
                $scope.reviews.goodPresence = index;
                break;

        }
    };
    $scope.insert = function () {
        calificationFactory.PostCalification($scope.calification)
            .success(function (data) {
                $location.url('/tab/vehicle');
            })
            .error(function (error) {

            });
    };
    $scope.submit = function () {
        $scope.insert();
    };
}]);