'use strict';
angular.module('starter')
.controller('CustomerTabCtrl', ['$scope', '$location', '$window', '$ionicModal', '$ionicLoading', 'accountFactory', 'customerFactory', function ($scope, $location, $window, $ionicModal, $ionicLoading, accountFactory, customerFactory) {
    console.log('CustomerTabCtrl');
    $scope.user = JSON.parse($window.localStorage['user'] || '{}');
    var d = moment($scope.user.birthday).format('YYYY-MM-DD');
    $scope.user.birthday = d;
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.update = function () {
        $scope.show();
        var d = moment($scope.user.birthday, moment.ISO_8601);
        $scope.user.birthday = d;
        customerFactory.PatchCustomer($scope.user.id, $scope.user)
          .success(function (data) {
              $window.localStorage['user'] = JSON.stringify(data);
              $scope.hide();
              $location.url('/tab/home');
          })
          .error(function (error) {
              console.log('Error', error);
              $window.localStorage['user'] = JSON.stringify($scope.user);
              $scope.hide();              
          });
    };
    $scope.submit = function () {
        $scope.update();
    };
}]);