'use strict';
angular.module('starter')
.controller('RegisterTabCtrl', ['$scope', '$location', '$window', '$ionicLoading', 'accountFactory', 'customerFactory', 'tokenName', function ($scope, $location, $window, $ionicLoading, accountFactory, customerFactory, tokenName) {
    console.log('RegisterTabCtrl');    
    $scope.user = {
        Id: null,
        Username: '',
        Firstname: '',
        Lastname: '',
        Document: '',
        Birthday: '',        
        Email: '',
        Phone: '',
        Address: '',
        Facebook: '',
        Twitter: '',
        Califications: null,
        EmergencyContacts: null,
        Locations: null,
        Points: null
    };

    $scope.account = {
        Username: '',
        Password: '',
    };
    $scope.error = undefined;
    $scope.show = function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };
    $scope.insertCustomer = function () {
        var d = moment($scope.user.Birthday, moment.ISO_8601);
        $scope.user.Birthday = d;
        $scope.user.Username = $scope.account.Username;
        customerFactory.PostCustomer($scope.user)
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
    $scope.insertAccount = function () {
        accountFactory.Registration($scope.account)
            .success(function (data) {
                $scope.loginAccount();
            })
            .error(function (error) {
                $scope.error = error;
                $scope.hide();
            });
    };
    $scope.loginAccount = function () {
        accountFactory.Login($scope.account)
            .success(function (data) {
                $window.localStorage[tokenName] = data.mobileServiceAuthenticationToken;
                $scope.insertCustomer();
            })
            .error(function (error) {
                $scope.error = error;
                $scope.hide();
            });
    };
    $scope.submit = function () {
        $scope.show();
        $scope.insertAccount();
        //var d = moment($scope.user.Birthday, moment.ISO_8601);
        //$scope.user.Birthday = d;
        //if ($scope.user.Username === 'smashraid' && $scope.user.Password == "1234567890") {
        //    window.localStorage['user'] = JSON.stringify($scope.user);
        //    $location.url('/tab/home');
        //}
    };
}]);