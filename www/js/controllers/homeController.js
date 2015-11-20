'use strict';
angular.module('starter')
.controller('HomeTabCtrl', ['$scope', '$location', '$window', 'tokenName', function ($scope, $location, $window, tokenName) {
    console.log('HomeTabCtrl');
    $scope.user = JSON.parse($window.localStorage['user'] || '{}');
    //$scope.user = _.find(users, function (u) {
    //    return u.User.Username === $scope.username;
    //});    

    $scope.exit = function () {
        //localStorage.clear();
        $window.localStorage.removeItem('user');
        $window.localStorage.removeItem(tokenName);
        $location.url('/login');
    };
}]);