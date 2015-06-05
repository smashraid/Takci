// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {

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
          'about-tab': {
            templateUrl: "templates/nav-stack.html"
          }
        }
      })
      .state('tabs.contact', {
        url: "/contact",
        views: {
          'notification-tab': {
            templateUrl: "templates/contact.html",
            controller: 'ContactTabCtrl'
          }
        }
      })
      .state('tabs.notification', {
        url: "/notification",
        views: {
          'notification-tab': {
            templateUrl: "templates/notification.html",
            controller: 'NotificationTabCtrl'
          }
        }
      })
      .state('tabs.account', {
        url: "/account",
        views: {
          'account-tab': {
            templateUrl: "templates/account.html",
            controller: 'AccountTabCtrl'
          }
        }
      })
      .state('tabs.profile', {
        url: "/profile",
        views: {
          'account-tab': {
            templateUrl: "templates/profile.html",
            controller: 'ProfileTabCtrl'
          }
        }
      })
      .state('tabs.emergencyContact', {
        url: "/emergency-contact",
        views: {
          'account-tab': {
            templateUrl: "templates/emergency-contact.html",
            controller: 'EmergencyContactTabCtrl'
          }
        }
      });


    $urlRouterProvider.otherwise("/login");

  })
  .controller('LoginTabCtrl', function($scope, $location) {
    console.log('LoginTabCtrl');
    $scope.user = {
      Username: '',
      Password: ''
    };
    $scope.error = undefined;
    $scope.submit = function() {
      $scope.search = _.find(users, function(u) {
        return u.User.Username === $scope.user.Username &&
          u.User.Password === $scope.user.Password;
      });
      if ($scope.search != undefined) {
        window.localStorage['user'] = JSON.stringify($scope.user.Username);
        $location.url('/tab/home');
      } else {
        $scope.error = 'Usuario o Contraseña incorrecta';
      }
    };
  })

.controller('RegisterTabCtrl', function($scope) {
  console.log('RegisterTabCtrl');
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
  $scope.friend = {
    Firstname: '',
    Lastname: '',
    Document: '',
    Email: '',
    Phone: '',
    Address: ''
  };
  $scope.friends = [];
  $scope.add = function() {
    $scope.friends.push($scope.friend);
  };
  $scope.remove = function(friend) {
    $scope.friends.splice($scope.friends.indexOf(friend), 1);
  };
  $scope.submit = function() {
    if ($scope.user.Username === 'smashraid' && $scope.user.Password == "1234567890") {
      window.localStorage['user'] = JSON.stringify($scope.user);
      $location.url('/tab/home');
    }
  };
})

.controller('ForgotPasswordTabCtrl', function($scope, $ionicModal) {
  console.log('ForgotPasswordTabCtrl');
  $scope.user = {
    Email: ''
  };
  $scope.submit = function() {
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

.controller('HomeTabCtrl', function($scope, $location) {
  console.log('HomeTabCtrl');
  $scope.username = JSON.parse(window.localStorage['user'] || '{}');
  $scope.user = _.find(users, function(u) {
    return u.User.Username === $scope.username;
  });
  $scope.data = {
    showDelete: false
  };

  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };

  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.exit = function() {
    //localStorage.clear();
    window.localStorage.removeItem('user');
    $location.url('/login');
  }

  $scope.items = [{
    id: 0
  }, {
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }, {
    id: 4
  }, {
    id: 5
  }, {
    id: 6
  }, {
    id: 7
  }, {
    id: 8
  }, {
    id: 9
  }, {
    id: 10
  }, {
    id: 11
  }, {
    id: 12
  }, {
    id: 13
  }, {
    id: 14
  }, {
    id: 15
  }, {
    id: 16
  }, {
    id: 17
  }, {
    id: 18
  }, {
    id: 19
  }, {
    id: 20
  }, {
    id: 21
  }, {
    id: 22
  }, {
    id: 23
  }, {
    id: 24
  }, {
    id: 25
  }, {
    id: 26
  }, {
    id: 27
  }, {
    id: 28
  }, {
    id: 29
  }, {
    id: 30
  }, {
    id: 31
  }, {
    id: 32
  }, {
    id: 33
  }, {
    id: 34
  }, {
    id: 35
  }, {
    id: 36
  }, {
    id: 37
  }, {
    id: 38
  }, {
    id: 39
  }, {
    id: 40
  }, {
    id: 41
  }, {
    id: 42
  }, {
    id: 43
  }, {
    id: 44
  }, {
    id: 45
  }, {
    id: 46
  }, {
    id: 47
  }, {
    id: 48
  }, {
    id: 49
  }, {
    id: 50
  }];
})

.controller('VehicleTabCtrl', function($scope, $location) {
  console.log('VehicleTabCtrl');
  $scope.vehicle = {
    Plate: ''
  };
  $scope.search = undefined;
  $scope.submit = function() {
    if ($scope.vehicle.Plate !== '') {
      $scope.search = _.find(drivers, function(d) {
        return d.Vehicle.Plate === $scope.vehicle.Plate;
      });
    }
  };
})

.controller('GeolocationTabCtrl', function($scope, $ionicPlatform, $cordovaGeolocation) {
  console.log('GeolocationTabCtrl');
  $ionicPlatform.ready(function() {

  });
  $scope.coordinates = [];
  $scope.coordinates2 = [
    {lat: '-12.079405099999999', long: '-77.0943317'},
    {lat: '-12.07810', long: '-77.09360'},
    {lat: '-12.07746', long: '-77.09339'},
    {lat: '-12.07767', long: '-77.09292'},
    {lat: '-12.07797', long: '-77.09162'},
    {lat: '-12.07807', long: '-77.09009'},
    {lat: '-12.07813', long: '-77.08763'},
    {lat: '-12.07820', long: '-77.08606'},
    {lat: '-12.07820', long: '-77.08494'},
    {lat: '-12.07823', long: '-77.08329'},
    {lat: '-12.07829', long: '-77.08161'},
    {lat: '-12.07859', long: '-77.07987'},
    {lat: '-12.07916', long: '-77.07823'},
    {lat: '-12.07971', long: '-77.07672'},
    {lat: '-12.08042', long: '-77.07474'},
    {lat: '-12.08132', long: '-77.07231'},
    {lat: '-12.08235', long: '-77.06948'},
    {lat: '-12.08350', long: '-77.06629'},
    {lat: '-12.08426', long: '-77.06482'},
    {lat: '-12.08576', long: '-77.06415'},
    {lat: '-12.08681', long: '-77.06279'},
    {lat: '-12.08769', long: '-77.06147'},
    {lat: '-12.08861', long: '-77.06011'},
    {lat: '-12.08969', long: '-77.05845'},
    {lat: '-12.09098', long: '-77.05647'},
    {lat: '-12.09215', long: '-77.05474'},
    {lat: '-12.09303', long: '-77.05338'},
    {lat: '-12.09316', long: '-77.05319'},
    {lat: '-12.09169', long: '-77.05242'},
    {lat: '-12.08971', long: '-77.05142'},
    {lat: '-12.08843', long: '-77.05074'}
  ];
  $scope.map;
  $scope.gMap = function(position) {
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 18,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var contentString = '<div id="content">Aqui me encuentro</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Inicio'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  };
  $scope.gRoute = function(position) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    directionsDisplay.setMap(map);
    var request = {
      origin: myLatlng, //new google.maps.LatLng(-12.07949, -77.0942021),
      destination: new google.maps.LatLng(-11.922494, -77.051565),
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      }
    });

  };
  $scope.gPolilyne = function() {
    //https://developers.google.com/maps/documentation/utilities/polylineutility
    var start = $scope.coordinates[0];
    var rest = _.rest($scope.coordinates);
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(start.lat, start.long),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    var symbolOne = {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: '#2D7797',
      fillColor: '#30A1D1',
      fillOpacity: 1
    };

    var symbolTwo = {
      path: 'M 950.857 597.143v-352q-96.571 52-174.857 52-46.857 0-82.857-18.286-57.143-28-105.143-43.714t-101.714-15.714q-98.857 0-230.286 72.571v342.286q140-64.571 247.429-64.571 31.429 0 59.143 4.286t56 14.857 44 17.714 47.143 22.571l16 8q25.143 12.571 57.714 12.571 68.571 0 167.429-52.571zM182.857 146.286q0 20-10 36.571t-26.571 26.286v723.429q0 8-5.143 13.143t-13.143 5.143h-36.571q-8 0-13.143-5.143t-5.143-13.143v-723.429q-16.571-9.714-26.571-26.286t-10-36.571q0-30.286 21.429-51.714t51.714-21.429 51.714 21.429 21.429 51.714zM1024 182.857v436q0 22.286-20 32.571-5.714 2.857-9.714 5.143-124.571 66.286-210.857 66.286-50.286 0-90.286-20l-16-8q-36.571-18.857-56.571-27.429t-52-16.571-65.143-8q-58.286 0-134.571 25.143t-130.571 58.286q-8.571 5.143-18.857 5.143-9.143 0-18.286-4.571-18.286-10.857-18.286-32v-424q0-20 17.714-31.429 20-12 44.857-24.286t65.143-29.714 87.143-28.286 88.571-10.857q64 0 119.429 17.714t119.429 49.143q21.714 10.857 50.857 10.857 69.714 0 177.143-64 12.571-6.857 17.714-9.714 17.714-9.143 35.429 1.143 17.714 11.429 17.714 31.429z',
      strokeColor: '#00F',
      rotation: 45
    };

    var symbolThree = {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      strokeColor: '#292',
      strokeWeight: 4
    };


    //var flightPlanCoordinates = [
      //new google.maps.LatLng(37.772323, -122.214897),
      //new google.maps.LatLng(21.291982, -157.821856),
      //new google.maps.LatLng(-18.142599, 178.431),
      //new google.maps.LatLng(-27.46758, 153.027892)
    //];

    var flightPlanCoordinates = _.map(rest, function(point){
      return new google.maps.LatLng(point.lat, point.long);
    });

    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      icons: [
        { icon: symbolOne, offset: '0%' },
        //{ icon: symbolTwo, offset: '50%'},
        { icon: symbolThree, offset: '100%'}
      ],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);

  };
  $scope.getLocation = function() {

    $cordovaGeolocation
      .getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: false
      })
      .then(function(position) {
        console.log("position found");
        $scope.position = position;
        $scope.gMap(position);
        //$scope.gRoute(position);
        // long = position.coords.longitude
        // lat = position.coords.latitude
      }, function(err) {
        console.log("unable to find location");
        $scope.errorMsg = "Error : " + err.message;
      });
  };

  $scope.startTravel = function(){
  var watchOptions = {
    frequency: 100000,
    timeout: 30000,
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
      var lat = position.coords.latitude
      var long = position.coords.longitude
      $scope.coordinates.push({
        lat: lat,
        long: long
      });
      $scope.gPolilyne();
    });
  console.log(watch);
  //watch.clearWatch();
  //$cordovaGeolocation.clearWatch(watch)
  //.then(function(result) {
  // success
  //}, function (error) {
  // error
  //});
}
})

.controller('AboutTabCtrl', function($scope) {
  console.log('AboutTabCtrl');
  var data = JSON.parse('{"00001":{"name":"Grand Theft Auto V","quantity":"53","description":"Grand Theft Auto V is an open world, action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released on 17 September 2013 for the PlayStation 3 and Xbox 360.","image":"http://media.rockstargames.com/rockstargames/img/global/news/upload/actual_1364906194.jpg"},"00002":{"name":"The Last of Us","quantity":"13","description":"The Last of Us is an action-adventure survival horror video game developed by Naughty Dog and published by Sony Computer Entertainment on June 14, 2013 for the PlayStation 3","image":"https://quietmemories.files.wordpress.com/2013/09/the-last-of-us_playstation3_cover.jpg"},"00003":{"name":"Call of Duty: Advanced Warfare","quantity":"15","description":"Call of Duty: Advanced Warfare is a first-person shooter video game published by Activision. Released on November 4, 2014, Sledgehammer Games developed the Microsoft Windows, PlayStation 4 and Xbox One ","image":"http://blogs-images.forbes.com/jasonevangelho/files/2014/08/Call-of-Duty-Advanced-Warfare1.jpg"},"00004":{"name":"Assassin&lsquo;s Creed Rogue","quantity":"18","description":"Assassin&lsquo;s Creed Rogue is a 2014 historical fiction action-adventure open world stealth video game developed by Ubisoft Sofia and published by Ubisoft","image":"http://media.moddb.com/images/articles/1/166/165622/auto/assassin_s_creed_rogue_by_sgo_manator-d7uey6r.jpg"}}');

  $scope.items = [];
  _.forEach(data, function(n, key) {
    console.log(n, key);
    n.id = key;
    $scope.items.push(n);
  });
})

.controller('ContactTabCtrl', function($scope) {
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

.controller('FactTabCtrl', function($scope) {
  //google.maps.event.addDomListener(window, 'load', function () {
  var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

  var mapOptions = {
    center: myLatlng,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var contentString = '<div><b>PIXAR  </b></div>';
  navigator.geolocation.getCurrentPosition(function(pos) {
    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
      map: map,
      title: "Work"
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  });

  $scope.map = map;
  //});
})

.controller('AccountTabCtrl', function($scope, $location) {
  console.log('AccountTabCtrl');

})

.controller('NotificationTabCtrl', function($scope, $location) {
  console.log('NotificationTabCtrl');

})

.controller('ProfileTabCtrl', function($scope) {
  console.log('ProfileTabCtrl');
  $scope.username = JSON.parse(window.localStorage['user'] || '{}');
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
  $scope.submit = function() {

  };
  $scope.init = function () {
    var u = _.find(users, function(u) {
      return u.User.Username === $scope.username;
    });
    $scope.user = u.User;
  }
})

.controller('EmergencyContactTabCtrl', function($scope) {
  console.log('EmergencyContactTabCtrl');
  $scope.username = JSON.parse(window.localStorage['user'] || '{}');
  $scope.friend = {
    Firstname: '',
    Lastname: '',
    Document: '',
    Email: '',
    Phone: '',
    Address: ''
  };
  $scope.friends = [];
  $scope.submit = function() {

  };
  $scope.init = function () {
    var u = _.find(users, function(u) {
      return u.User.Username === $scope.username;
    });
    $scope.friends = u.Friends;
  }
});
