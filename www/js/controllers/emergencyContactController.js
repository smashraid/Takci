'use strict';
angular.module('starter')
.controller('EmergencyContactTabCtrl', ['$scope', '$location', '$window', '$ionicModal', '$ionicLoading', 'emergencyContactFactory', 'infoFactory', function ($scope, $location, $window, $ionicModal, $ionicLoading, emergencyContactFactory, infoFactory) {
    console.log('EmergencyContactTabCtrl');
    $scope.title = 'Nuevo';
    $scope.user = JSON.parse($window.localStorage['user'] || '{}');    
    $scope.friend = {
        id:null,
        customerId: $scope.user.id,
        firstname: '',
        lastname: '',
        document: '',
        birthday: '',
        email: '',
        phone: '',
        address: '',
        facebook: '',
        twitter: ''
    };
    $scope.friendTmp = JSON.parse($window.localStorage['friend'] || '{}');
    if ($scope.friendTmp.id) {
        $scope.title = 'Editar';
        $scope.friend = $scope.friendTmp;
    }
    $scope.friends = [];
    $scope.submit = function () {
        $scope.show();
        if ($scope.friend.id == null) {
            $scope.insert();
        } else {
            $scope.update();
        }
    };
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.edit = function (item) {
        $scope.title = 'Editar';
        $scope.friend = item;
        $window.localStorage['friend'] = JSON.stringify(item);
        $location.url('/edit-emergency-contact');
    };
    
    $scope.selectAll = function () {
        infoFactory.GetAllEmergencyContactByCustomerId($scope.user.id)
           .success(function (data) {
               $scope.friends = data;
           })
           .error(function (error) {
               console.log('Error', error);
           });
    };
    $scope.insert = function () {
        emergencyContactFactory.PostEmergencyContact($scope.friend)
          .success(function (data) {
              //$scope.selectAll();
              $scope.hide();
              $location.url('/emergency-contact');
          })
          .error(function (error) {
              console.log('Error', error);
              $scope.hide();
          });
    };
    $scope.update = function () {
        emergencyContactFactory.PatchEmergencyContact($scope.friend.id, $scope.friend)
          .success(function (data) {
              //$scope.selectAll();
              $scope.hide();
              $location.url('/emergency-contact');
          })
          .error(function (error) {
              console.log('Error', error);
              $scope.hide();
          });
    };
    $scope.delete = function (item) {
        emergencyContactFactory.DeleteEmergencyContact(item.id)
          .success(function (data) {
              $scope.selectAll();
          })
          .error(function (error) {
              console.log('Error', error);
          });
    };
    $scope.init = function () {
        //var u = _.find(users, function (u) {
        //    return u.User.Username === $scope.username;
        //});
        //$scope.friends = u.Friends;
        $scope.selectAll();
    };
}]);