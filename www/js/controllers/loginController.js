'use strict';
angular.module('starter')
  .controller('LoginTabCtrl', ['$scope', '$location', '$window', '$ionicLoading' , '$ionicPopup', 'accountFactory', 'customerFactory', 'infoFactory', 'tokenName', function ($scope, $location, $window, $ionicLoading, $ionicPopup, accountFactory, customerFactory, infoFactory, tokenName) {
      console.log('LoginTabCtrl');
      $scope.user = {
          Username: '',
          Password: ''
      };
      $scope.error = undefined;
      $scope.error2 = undefined;
      $scope.log = undefined;
      $scope.logText = undefined;
      $scope.show = function () {
          $ionicLoading.show({
              template: '<ion-spinner></ion-spinner>'
          });
      };
      $scope.hide = function () {
          $ionicLoading.hide();
      };
      $scope.loginAccount = function () {
          accountFactory.Login($scope.user)
              .success(function (data) {
                  //$scope.Username = data.userId.split(':')[1];
                  $scope.log = data;
                  $window.localStorage[tokenName] = data.mobileServiceAuthenticationToken;
                  $scope.selectCustomer();
              })
              .error(function (error) {
                  $scope.hide();
                  $scope.error = 'Usuario o Contrase&ntilde;a incorrecta';
              });
      };
      $scope.selectCustomer = function () {
          $scope.logText = 'inside selectCustomer';
          infoFactory.GetCustomerByUsername($scope.user.Username)
             .success(function (data) {
                 $window.localStorage['user'] = JSON.stringify(data);
                 $scope.hide();
                 $location.url('/tab/home');
             })
             .error(function (error) {
                 console.log('Error', error);
                 $scope.error = error;
                 $scope.hide();
             });
      };
      $scope.submit = function () {
          //$scope.search = _.find(users, function(u) {
          //  return u.User.Username === $scope.user.Username &&
          //    u.User.Password === $scope.user.Password;
          //});
          //if ($scope.search != undefined) {
          //    $scope.error = '';
          //  window.localStorage['user'] = JSON.stringify($scope.user.Username);
          //  $location.url('/tab/home');
          //} else {
          //  $scope.error = 'Usuario o Contraseña incorrecta';
          //}
          $scope.show();
          $scope.loginAccount();
      };
  }]);