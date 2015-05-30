// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

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
          templateUrl: "templates/login.html",
          controller: 'LoginTabCtrl',
          controllerAs: 'login'
      })
      .state('register', {
          url: "/register",
          templateUrl: "templates/register.html",
          controller: 'RegisterTabCtrl',
          controllerAs: 'register'
      })
      .state('forgotPassword', {
          url: "/forgot-password",
          templateUrl: "templates/forgot-password.html",
          controller: 'ForgotPasswordTabCtrl',
          controllerAs: 'forgotPassword'
      })
      .state('tabs', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })
      .state('tabs.home', {
          url: "/home",
          views: {
              'home-tab': {
                  templateUrl: "templates/home.html",
                  controller: 'HomeTabCtrl'
              }
          }
      })
      .state('tabs.vehicle', {
          url: "/vehicle",
          views: {
              'vehicle-tab': {
                  templateUrl: "templates/vehicle.html",
                  controller: 'VehicleTabCtrl'
              }
          }
      })
      .state('tabs.geolocation', {
          url: "/geolocation",
          views: {
              'geolocation-tab': {
                  templateUrl: "templates/geolocation.html",
                  controller: 'GeolocationTabCtrl'
              }
          }
      })
      .state('tabs.facts', {
          url: "/facts",
          views: {
              'home-tab': {
                  templateUrl: "templates/facts.html"
              }
          }
      })
      .state('tabs.facts2', {
          url: "/facts2",
          views: {
              'home-tab': {
                  templateUrl: "templates/facts2.html",
                  controller: 'FactTabCtrl'
              }
          }
      })
      .state('tabs.about', {
          url: "/about",
          views: {
              'about-tab': {
                  templateUrl: "templates/about.html",
                  controller: 'AboutTabCtrl'
              }
          }
      })
      .state('tabs.navstack', {
          url: "/navstack",
          views: {
              'navstack-tab': {
                  templateUrl: "templates/nav-stack.html"
              }
          }
      })
      .state('tabs.contact', {
          url: "/contact",
          views: {
              'contact-tab': {
                  templateUrl: "templates/contact.html",
                  controller: 'ContactTabCtrl'
              }
          }
      });


    $urlRouterProvider.otherwise("/login");

})
.controller('LoginTabCtrl', function ($scope, $location) {
    console.log('LoginTabCtrl');
    $scope.user = {
        Username: '',
        Password: ''
    };
    $scope.submit = function(){
      if ($scope.user.Username === 'smashraid' && $scope.user.Password == "1234567890") {
        window.localStorage['user'] = JSON.stringify($scope.user);
        $location.url('/tab/home');
      }
    };
})

.controller('RegisterTabCtrl', function ($scope) {
    console.log('RegisterTabCtrl');
    $scope.user = {
        Firstname: '',
        Lastname: '',
        Username: '',
        Password: '',
        Email: '',
        Phone: '',
        Address: ''
    };
    $scope.friend = {
        Firstname: '',
        Lastname: '',
        Email: '',
        Phone: '',
        Address: ''
    };
    $scope.friends = [];
    $scope.add = function () {
      $scope.friends.push($scope.friend);
    };
    $scope.remove = function (friend) {
      $scope.friends.splice($scope.friends.indexOf(friend), 1);
    };
    $scope.submit = function(){
      if ($scope.user.Username === 'smashraid' && $scope.user.Password == "1234567890") {
        window.localStorage['user'] = JSON.stringify($scope.user);
        $location.url('/tab/home');
      }
    };
})

.controller('ForgotPasswordTabCtrl', function ($scope, $ionicModal) {
    console.log('ForgotPasswordTabCtrl');
    $scope.user = {
        Email: ''
    };
    $scope.submit = function(){
      if ($scope.user.Email !== '') {
        $scope.openModal();
      }
    };
    $ionicModal.fromTemplateUrl('forgot-password-message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.controller('HomeTabCtrl', function ($scope) {
    console.log('HomeTabCtrl');
    $scope.user = JSON.parse(window.localStorage['user'] || '{}');
    $scope.data = {
        showDelete: false
    };

    $scope.edit = function (item) {
        alert('Edit Item: ' + item.id);
    };
    $scope.share = function (item) {
        alert('Share Item: ' + item.id);
    };

    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function (item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.items = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32 },
      { id: 33 },
      { id: 34 },
      { id: 35 },
      { id: 36 },
      { id: 37 },
      { id: 38 },
      { id: 39 },
      { id: 40 },
      { id: 41 },
      { id: 42 },
      { id: 43 },
      { id: 44 },
      { id: 45 },
      { id: 46 },
      { id: 47 },
      { id: 48 },
      { id: 49 },
      { id: 50 }
    ];
})

.controller('VehicleTabCtrl', function ($scope, $location) {
    console.log('VehicleTabCtrl');
    $scope.vehicle = {
        Plate: ''
    };
    $scope.submit = function(){
      if ($scope.vehicle.Plate !== '') {

      }
    };
})

.controller('GeolocationTabCtrl', function ($scope, $cordovaGeolocation) {
    console.log('GeolocationTabCtrl');
    $scope.coordinates = [];
    $scope.map;
    $scope.gMap = function (position) {
      var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      var mapOptions = {
        zoom: 4,
        center: myLatlng
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var contentString = '<div id="content">Good Job!!!</div>';
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    };
    $scope.gRoute = function (position) {
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      var mapOptions = {
        zoom:12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: myLatlng
      }
      var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      directionsDisplay.setMap(map);
      var request = {
        origin:new google.maps.LatLng(-12.07949, -77.0942021),
        destination:new google.maps.LatLng(-11.922494, -77.051565),
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });

    };
    $scope.getLocation = function () {

      $cordovaGeolocation
        .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
        .then(function (position) {
          console.log("position found");
          $scope.position = position;
          //$scope.gMap(position);
          $scope.gRoute(position);
          // long = position.coords.longitude
          // lat = position.coords.latitude
        }, function (err) {
          console.log("unable to find location");
          $scope.errorMsg = "Error : " + err.message;
        });
    };

    var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
      console.log(err);
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.coordinates.push({lat: lat, long: long});
  });
  console.log(watch);
  //watch.clearWatch();
  //$cordovaGeolocation.clearWatch(watch)
    //.then(function(result) {
      // success
      //}, function (error) {
      // error
    //});
})

.controller('AboutTabCtrl', function ($scope) {
    console.log('AboutTabCtrl');
    var data = JSON.parse('{"00001":{"name":"Grand Theft Auto V","quantity":"53","description":"Grand Theft Auto V is an open world, action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released on 17 September 2013 for the PlayStation 3 and Xbox 360.","image":"http://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1364906194.jpg"},"00002":{"name":"The Last of Us","quantity":"13","description":"The Last of Us is an action-adventure survival horror video game developed by Naughty Dog and published by Sony Computer Entertainment on June 14, 2013 for the PlayStation 3","image":"https://quietmemories.files.wordpress.com/2013/09/the-last-of-us_playstation3_cover.jpg"},"00003":{"name":"Call of Duty: Advanced Warfare","quantity":"15","description":"Call of Duty: Advanced Warfare is a first-person shooter video game published by Activision. Released on November 4, 2014, Sledgehammer Games developed the Microsoft Windows, PlayStation 4 and Xbox One ","image":"http://blogs-images.forbes.com/jasonevangelho/files/2014/08/Call-of-Duty-Advanced-Warfare1.jpg"},"00004":{"name":"Assassin&lsquo;s Creed Rogue","quantity":"18","description":"Assassin&lsquo;s Creed Rogue is a 2014 historical fiction action-adventure open world stealth video game developed by Ubisoft Sofia and published by Ubisoft","image":"http://media.moddb.com/images/articles/1/166/165622/auto/assassin_s_creed_rogue_by_sgo_manator-d7uey6r.jpg"}}');

    $scope.items = [];
    _.forEach(data, function (n, key) {
        console.log(n, key);
        n.id = key;
        $scope.items.push(n);
    });
})

.controller('ContactTabCtrl', function ($scope) {
    console.log('ContactTabCtrl');
    $scope.product = {
        Category: '',
        Name: '',
        Description: '',
        Price: '',
        Stock: '',
        IsActive: true,
        IsAvailable: true
    };
})

.controller('FactTabCtrl', function ($scope) {
    //google.maps.event.addDomListener(window, 'load', function () {
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var contentString = '<div><b>PIXAR  </b></div>';
    navigator.geolocation.getCurrentPosition(function (pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "Work"
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    });

    $scope.map = map;
    //});
});
