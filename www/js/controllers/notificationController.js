'use strict';
angular.module('starter')
.controller('NotificationTabCtrl', ['$scope', '$window', function ($scope, $window) {
    console.log('NotificationTabCtrl');
    $scope.user = JSON.parse($window.localStorage['user'] || '{}');
    $scope.plate = JSON.parse($window.localStorage['plate'] || '{}');
    $scope.current = JSON.parse($window.localStorage['current'] || '{}');
    $scope.friends = [];
    $scope.user = {
        Firstname: '',
        Lastname: '',
        Document: '',
        Birthday: '',
        Username: '',
        Password: '',
        Email: '',
        Phone: '',
        Address: '',
        Facebook: '',
        Twitter: ''
    };
    $scope.selectAllEmergencyContact = function () {
        infoFactory.GetAllEmergencyContactByCustomerId($scope.user.id)
           .success(function (data) {
               $scope.friends = data;
           })
           .error(function (error) {
               console.log('Error', error);
           });
    };
    $scope.emergency = function () {
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };
        _.each($scope.friends, function (friend) {
            $cordovaSms
            .send(friend.phone, 'Necesito ayuda!!. Taxi de placa ' + $stateParams.plate + ', mi ubcacion es https://www.google.com/maps/dir//' + $scope.current.lat + ',' + $scope.current.lng)
            .then(function () {
                // Success! SMS was sent                
                var alertPopup = $ionicPopup.alert({
                    title: 'Notificacion de Emergencia ',
                    template: 'Tus contactos fueron alertados'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            }, function (error) {
                // An error occurred
                $scope.response = error;
            });
        });
    };
    $scope.submit = function () {

    };
    $scope.init = function () {
        //var u = _.find(users, function (u) {
        //    return u.User.Username === $scope.username;
        //});
        //$scope.user = u.User;
        $scope.selectAllEmergencyContact();
    }
}]);