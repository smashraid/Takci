// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'leaflet-directive'])
//.value('urlService', 'http://localhost:59733')
.value('urlService', 'http://takci.azure-mobile.net')
.value('tokenName', 'takci')
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
	  .state('login', {
	      url: "/login",
	      templateUrl: "js/templates/loginView.html",
	      controller: 'LoginTabCtrl',
	      controllerAs: 'login'
	  })
	  .state('register', {
	      url: "/register",
	      templateUrl: "js/templates/registerView.html",
	      controller: 'RegisterTabCtrl',
	      controllerAs: 'register'
	  })
	  .state('forgotPassword', {
	      url: "/forgot-password",
	      templateUrl: "js/templates/forgotPasswordView.html",
	      controller: 'ForgotPasswordTabCtrl',
	      controllerAs: 'forgotPassword'
	  })
	  .state('tabs', {
	      url: "/tab",
	      abstract: true,
	      templateUrl: "js/templates/layoutView.html"
	  })
	  .state('tabs.home', {
	      url: "/home",
	      views: {
	          'home-tab': {
	              templateUrl: "js/templates/homeView.html",
	              controller: 'HomeTabCtrl'
	          }
	      }
	  })
	  .state('tabs.vehicle', {
	      url: "/vehicle",
	      views: {
	          'vehicle-tab': {
	              templateUrl: "js/templates/vehicleView.html",
	              controller: 'VehicleTabCtrl'
	          }
	      }
	  })
	  .state('tabs.rate', {
	      url: "/rate",
	      views: {
	          'vehicle-tab': {
	              templateUrl: "js/templates/rateView.html",
	              controller: 'RateTabCtrl'
	          }
	      }
	  })
	  .state('tabs.calification', {
	      url: "/calification/:plate",
	      views: {
	          'vehicle-tab': {
	              templateUrl: "js/templates/calificationView.html",
	              controller: 'CalificationTabCtrl'
	          }
	      }
	  })
	  .state('tabs.geolocation', {
	      url: "/geolocation/:plate",
	      views: {
	          'geolocation-tab': {
	              templateUrl: "js/templates/geolocationView.html",
	              controller: 'GeolocationTabCtrl'
	          }
	      }
	  })
	  //.state('tabs.notification', {
	  //    url: "/notification",
	  //    views: {
	  //        'notification-tab': {
	  //            templateUrl: "js/templates/notificationView.html",
	  //            controller: 'NotificationTabCtrl'
	  //        }
	  //    }
	  //})
	  //.state('tabs.account', {
	  //    url: "/account",
	  //    views: {
	  //        'account-tab': {
	  //            templateUrl: "js/templates/accountView.html",
	  //            controller: 'AccountTabCtrl'
	  //        }
	  //    }
	  //})
	  .state('profile', {
	      url: "/profile",
	      templateUrl: "js/templates/profileView.html",
	      controller: 'CustomerTabCtrl',
	      controllerAs: 'customer'
	  })
	  .state('emergencyContact', {
	      url: "/emergency-contact",
	      templateUrl: "js/templates/emergencyContactView.html",
	      controller: 'EmergencyContactTabCtrl',
	      controllerAs: 'emergencyContact'
	  })
	.state('editEmergencyContact', {
	    url: "/edit-emergency-contact",
	    templateUrl: "js/templates/editEmergencyContactView.html",
	    controller: 'EmergencyContactTabCtrl',
	    controllerAs: 'emergencyContact'
	});
    $urlRouterProvider.otherwise("/login");
});