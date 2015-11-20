'use strict';
angular.module('starter')
.controller('VehicleTabCtrl', ['$scope', '$location', '$window', '$ionicLoading', '$ionicPopup', 'infoFactory', 'breachFactory', function ($scope, $location, $window, $ionicLoading, $ionicPopup, infoFactory, breachFactory) {
    console.log('VehicleTabCtrl');
    $scope.user = JSON.parse($window.localStorage['user'] || '{}');
    $scope.vehicle = {
        Plate: ''
    };
    $scope.breach = {
        Plate: '',
        HasSoat: false,
        HasRevision: false,
        HasInfraction: false,
        HasCapture: false
    };
    $scope.search = undefined;
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.insertBreach = function () {
        $scope.show();
        breachFactory.PostBreach($scope.breach)
             .success(function (data) {                 
                 $scope.hide();
                 var alertPopup = $ionicPopup.alert({
                     title: 'Aviso',
                     template: 'Se registro el vehiculo'
                 });
                 alertPopup.then(function (res) {

                 });
             })
             .error(function (error) {
                 $scope.hide();
                 $scope.error = 'Usuario o Contrase&ntilde;a incorrecta';
             });
    };
    $scope.findVehicle = function () {
        $scope.show();
        $scope.search = undefined;
        infoFactory.GetAllInfo($scope.vehicle.Plate)
           .success(function (data) {
               if (data.vehicleYear != null) {
                   $scope.search = data;
                   $window.localStorage['plate'] = $scope.vehicle.Plate;
                   $scope.breach.Plate = $scope.vehicle.Plate;
                   $scope.breach.HasCapture = data.hasCapture;
                   $scope.breach.HasInfraction = data.hasInfraction;
                   $scope.breach.HasRevision = data.hasRevision;
                   $scope.breach.HasSoat = data.hasSoat;
                   $scope.vehicle.Plate = '';
                   $scope.hide();
               } else {
                   $scope.hide();
                   var alertPopup = $ionicPopup.alert({
                       title: 'Aviso',
                       template: 'El vehiculo no se encuentra registrado'
                   });
                   alertPopup.then(function (res) {

                   });
               }
           })
           .error(function (error) {
               console.log('Error', error);
               $scope.hide();
           });
    };
    $scope.submit = function () {
        if ($scope.search !== '') {
            //$scope.search = _.find(drivers, function (d) {
            //    return d.Vehicle.Plate === $scope.vehicle.Plate;
            //});
            $scope.findVehicle();
        }
    };
}]);