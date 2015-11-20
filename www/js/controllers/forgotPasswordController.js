'use strict';
angular.module('starter')
.controller('ForgotPasswordTabCtrl',['$scope', '$ionicModal', function ($scope, $ionicModal) {
    console.log('ForgotPasswordTabCtrl');
    $scope.user = {
        Email: ''
    };
    $scope.submit = function () {
        if ($scope.user.Email !== '') {
            $scope.openModal();
        }
    };
    $ionicModal.fromTemplateUrl('forgot-password-message.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
}]);