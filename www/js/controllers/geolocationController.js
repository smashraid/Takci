'use strict';
angular.module('starter')
.controller('GeolocationTabCtrl', ['$scope', '$ionicPopup', '$window', '$timeout', '$ionicPlatform', '$ionicActionSheet', '$cordovaGeolocation',
    '$cordovaNetwork', '$cordovaSms', '$cordovaSocialSharing', '$stateParams', 'locationFactory', 'locationDetailFactory',
    function ($scope, $ionicPopup, $window, $timeout, $ionicPlatform, $ionicActionSheet, $cordovaGeolocation, $cordovaNetwork, $cordovaSms,
        $cordovaSocialSharing, $stateParams, locationFactory, locationDetailFactory) {
        console.log('GeolocationTabCtrl');
        $ionicPlatform.ready(function () {

        });
        $scope.user = JSON.parse($window.localStorage['user'] || '{}');
        $scope.location = {
            Id: null,
            CustomerId: $scope.user.id,
            Plate: $stateParams.plate,
            //Customer: {
            //    Id: $scope.user.id
            //},
            LastCheck: moment(),
            IsSomethingWrong: false,
            Customer: null,
            LocationDetails: null
        };
        $scope.locationDetail = {
            Id: null,
            Latitude: '',
            Longitude: '',
            LocationId: '',
            Location: null
        };
        $scope.mapLeaflet = {
            defaults: {
                tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                maxZoom: 18,
                zoomControlPosition: 'bottomleft'
            },
            layers: {
                baselayers: {
                    googleTerrain: {
                        name: 'Google Terrain',
                        layerType: 'TERRAIN',
                        type: 'google'
                    },
                    googleHybrid: {
                        name: 'Google Hybrid',
                        layerType: 'HYBRID',
                        type: 'google'
                    },
                    googleRoadmap: {
                        name: 'Google Streets',
                        layerType: 'ROADMAP',
                        type: 'google'
                    }
                }
            },
            markers: {
                //mainMarker:{
                //lat: 51.505,
                //lng: -0.09,
                //focus: true,
                //message: "Hey, drag me if you want",
                //draggable: true
                //}
            },
            events: {
                map: {
                    enable: ['context'],
                    logic: 'emit'
                }
            },
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            }

        };
        $scope.friends = [];
        $scope.marker;
        $scope.current = {
            lat: 0,
            lng: 0
        };
        $scope.data = {
            email:''
        };
        $scope.emails = [];
        $scope.coordinates = [];
        $scope.coordinatesTest = [
          { lat: '-12.079405099999999', long: '-77.0943317' },
          { lat: '-12.07810', long: '-77.09360' },
          { lat: '-12.07746', long: '-77.09339' },
          { lat: '-12.07767', long: '-77.09292' },
          { lat: '-12.07797', long: '-77.09162' },
          { lat: '-12.07807', long: '-77.09009' },
          { lat: '-12.07813', long: '-77.08763' },
          { lat: '-12.07820', long: '-77.08606' },
          { lat: '-12.07820', long: '-77.08494' },
          { lat: '-12.07823', long: '-77.08329' },
          { lat: '-12.07829', long: '-77.08161' },
          { lat: '-12.07859', long: '-77.07987' },
          { lat: '-12.07916', long: '-77.07823' },
          { lat: '-12.07971', long: '-77.07672' },
          { lat: '-12.08042', long: '-77.07474' },
          { lat: '-12.08132', long: '-77.07231' },
          { lat: '-12.08235', long: '-77.06948' },
          { lat: '-12.08350', long: '-77.06629' },
          { lat: '-12.08426', long: '-77.06482' },
          { lat: '-12.08576', long: '-77.06415' },
          { lat: '-12.08681', long: '-77.06279' },
          { lat: '-12.08769', long: '-77.06147' },
          { lat: '-12.08861', long: '-77.06011' },
          { lat: '-12.08969', long: '-77.05845' },
          { lat: '-12.09098', long: '-77.05647' },
          { lat: '-12.09215', long: '-77.05474' },
          { lat: '-12.09303', long: '-77.05338' },
          { lat: '-12.09316', long: '-77.05319' },
          { lat: '-12.09169', long: '-77.05242' },
          { lat: '-12.08971', long: '-77.05142' },
          { lat: '-12.08843', long: '-77.05074' }
        ];
        $scope.map;
        //$scope.type = $cordovaNetwork.getNetwork();
        //$scope.isOnline = $cordovaNetwork.isOnline();
        //$scope.isOffline = $cordovaNetwork.isOffline();
        $scope.response = {};
        $scope.saveLocation = function () {
            locationFactory.PostLocation($scope.location)
                .success(function (data) {
                    $scope.location = data;
                    $scope.locationDetail.LocationId = $scope.location.id;
                    $scope.startTravel();
                })
                .error(function (error) {
                    console.error("Error: " + error);
                });
        };
        $scope.saveLocationDetail = function (position) {
            $scope.locationDetail.Latitude = position.coords.latitude;
            $scope.locationDetail.Longitude = position.coords.longitude;
            locationDetailFactory.PostLocationDetail($scope.locationDetail)
                .success(function (data) {

                })
                .error(function (error) {
                    console.error("Error: " + error);
                });
        };
        $scope.emergencyContactStatus = function () {
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: ''  // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                }
            };
            _.each($scope.friends, function (friend) {
                $cordovaSms
                .send(friend.phone, 'Estoy abordando el taxi con la placa ' + $stateParams.plate + ', mi ubcacion es https://www.google.com/maps/dir//' + $scope.current.lat + ',' + $scope.current.lng, options)
                .then(function () {
                    // Success! SMS was sent                
                    var alertPopup = $ionicPopup.alert({
                        title: 'Contactos de Emergencia ',
                        template: 'Tus contactos fueron notificados'
                    });
                    alertPopup.then(function (res) {
                        console.log('Thank you for not eating my delicious ice cream cone');
                    });
                }, function (error) {
                    // An error occurred
                    console.error("Error: " + error);
                });
            });
        };
        $scope.emergency = function () {
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: ''  // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                }
            };
            _.each($scope.friends, function (friend) {
                $cordovaSms
                .send(friend.phone, 'Necesito ayuda!!. Taxi de placa ' + $stateParams.plate + ', mi ubcacion es https://www.google.com/maps/dir//' + $scope.current.lat + ',' + $scope.current.lng, options)
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
        $scope.sms = function (number) {
            var myPopup = $ionicPopup.show({
                template: '<input type="tel" ng-model="data" />',
                title: 'Ingrese el destinatario',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                  { text: 'Cancelar' },
                  {
                      text: 'Enviar',
                      type: 'button-positive',
                      onTap: function (e) {
                          return $scope.data;
                      }
                  }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);
                $cordovaSocialSharing
                         .shareViaSMS('Me encuentro aqui', $scope.data)
                         .then(function (result) {
                             // Success!
                         }, function (error) {
                             // An error occurred. Show a message to the user
                             console.error("Error: " + error);
                         });
            });
            
        };

        $scope.email = function () {
            var myPopup = $ionicPopup.show({
                template: '<input type="email" data-ng-model="data.email" />',
                title: 'Ingrese el destinatario',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                  {
                      text: 'Cancelar',
                      onTap: function (e) {
                          return true;
                      }
                  },
                  {
                      text: 'Enviar',
                      type: 'button-positive',
                      onTap: function (e) {
                          return $scope.data.email;                          
                      }
                  }
                ]
            });
            myPopup.then(function (res) {
                console.log('Tapped!', res);                
                //var toArr = [];
                //toArr.push($scope.data);
                $cordovaSocialSharing
                         .shareViaEmail('Me encuentro aqui https://www.google.com/maps/dir//' + $scope.current.lat + ',' + $scope.current.lng, 'Takci', res, [], [], null)
                         .then(function (result) {
                             // Success!
                         }, function (error) {
                             // An error occurred. Show a message to the user
                             console.error("Error: " + error);
                         });
            });

        };

        $scope.twitter = function () {
            $cordovaSocialSharing
            .shareViaTwitter('Me encuentro aqui', null, 'https://www.google.com/maps/dir//' + $scope.current.lat + ',' + $scope.current.lng)
            .then(function (result) {
                // Success!
            }, function (error) {
                // An error occurred. Show a message to the user
                console.error("Error: " + error);
            });
        };

        $scope.whatsApp = function () {
            $cordovaSocialSharing
          .shareViaWhatsApp('Me encuentro aqui', null, 'https://www.google.com/maps/dir//' + $scope.current.lat + ',' + $scope.current.lng)
          .then(function (result) {
              // Success!              
              $scope.response = result;
          }, function (error) {
              // An error occurred. Show a message to the user
              console.error("Error: " + error);
          });
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

        $scope.gMap = function (position) {
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
                title: 'Aqui me encuentro'
            });
            $scope.marker = marker;
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        };
        $scope.gRoute = function (position) {
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
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });

        };
        $scope.gPolilyne = function () {
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

            var flightPlanCoordinates = _.map(rest, function (point) {
                return new google.maps.LatLng(point.lat, point.long);
            });

            var flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,
                icons: [
                  { icon: symbolOne, offset: '0%' },
                  //{ icon: symbolTwo, offset: '50%'},
                  { icon: symbolThree, offset: '100%' }
                ],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            flightPath.setMap(map);

        };

        //navigator.geolocation.getCurrentPosition(function (pos) {
        // console.log('Got pos', pos);
        //$scope.gMap(pos);
        //}, function (error) {
        //alert('Unable to get location: ' + error.message);
        //});

        $scope.getLocation = function () {
            //cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
            //console.log("Location is " + (enabled ? "enabled" : "disabled"));
            $cordovaGeolocation
              .getCurrentPosition({
                  timeout: 10000,
                  enableHighAccuracy: false
              })
              .then(function (position) {
                  console.log("position found");
                  $scope.mapLeaflet.center.lat = position.coords.latitude;
                  $scope.mapLeaflet.center.lng = position.coords.longitude;
                  $scope.mapLeaflet.center.zoom = 15;
                  $scope.mapLeaflet.markers.now = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                      message: "Me encuentro aqui",
                      focus: true,
                      draggable: false
                  };
                  $scope.current.lat = position.coords.latitude;
                  $scope.current.lng = position.coords.longitude;
                  //$scope.position = position;
                  //alert(position.coords.latitude + '  ' + position.coords.longitude);
                  $scope.gMap(position);
                  //$scope.gRoute(position);
                  // long = position.coords.longitude
                  // lat = position.coords.latitude
              }, function (error) {
                  console.error("Error: " + error);                  
              });

            //}, function (error) {
            //    console.error("Error: " + error);
            //    $scope.errorMsg = error;
            //    var alertPopup = $ionicPopup.alert({
            //        title: 'Aviso',
            //        template: 'Enciende el GPS'
            //    });
            //    alertPopup.then(function (res) {

            //    });
            //});
        };

        $scope.startTravel = function () {
            $scope.emergencyContactStatus();
            var watchOptions = {
                timeout: 30000,
                enableHighAccuracy: false // may cause errors if true
            };
            $scope.watch = $cordovaGeolocation.watchPosition(watchOptions);
            $scope.watch.then(
              null,
              function (error) {
                  // error
                  console.log(error);
                  $scope.errorMsg = error;
              },
              function (position) {
                  console.log('Position', position);
                  var lat = position.coords.latitude
                  var long = position.coords.longitude
                  $scope.coordinates.push({
                      lat: lat,
                      long: long
                  });
                  //$scope.gPolilyne();
                  var latlng = new google.maps.LatLng(lat, long);
                  //var latlng = new google.maps.LatLng('-12.07820', '-77.08494');
                  $scope.marker.setPosition(latlng);
                  $scope.current.lat = position.coords.latitude;
                  $scope.current.lng = position.coords.longitude;
                  $window.localStorage['current'] = JSON.stringify($scope.current);
                  $scope.saveLocationDetail(position);
              });
            console.log('Watch Position', watch);
        }

        $scope.stopTravel = function () {
            $scope.watch.clearWatch();
            $scope.gPolilyne();
            //$cordovaGeolocation.clearWatch($scope.watch)
            //.then(function(result) {         
            //}, function (error) {         
            //});
        };

        $scope.share = function () {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                  { text: 'Twitter' },
                  { text: 'WhatsApp' },
                  { text: 'Email' }
                ],
                //destructiveText: 'Eliminar',
                //titleText: 'Modify your album',
                cancelText: 'Cancelar',
                cancel: function () {
                    // add cancel code..
                    hideSheet();
                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:
                            $scope.twitter();
                            break;
                        case 1:
                            $scope.whatsApp();
                            break;
                        case 2:
                            $scope.email();
                            break;
                    }
                    return true;
                }
            });
        };
    }]);
