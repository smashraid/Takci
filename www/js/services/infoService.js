'use strict';
angular.module('starter')
.factory('infoFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllInfo = function (plate) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'GET',
            url: urlBase + '/api/info/GetAllInfo?plate=' + plate + '&t=1&e=2',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            }
        }
        return $http(req);
    };

    dataFactory.GetCustomerByUsername = function (username) {
        var token = $window.localStorage[tokenName];        
        var req = {
            method: 'GET',
            url: urlBase + '/api/info/GetCustomerByUsername?username=' + username + '&t=1',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'Access-Control-Allow-Origin': '*',
                //'Authorization': 'Basic ' + token,
                //'X-ZUMO-APPLICATION': 'QcvCOpjcLCIEHdwBbaZYFfTZkbSWno91',
                'X-ZUMO-AUTH': token
            }
        }        
        return $http(req);
    };

    dataFactory.GetAllEmergencyContactByCustomerId = function (id) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'GET',
            url: urlBase + '/api/info/GetAllEmergencyContactByCustomerId?id=' + id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            }
        }
        return $http(req);
    };
       
    return dataFactory;
}]);