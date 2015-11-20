'use strict';
angular.module('starter')
.factory('emergencyContactFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllEmergencyContact = function () {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'GET',
            url: urlBase + '/tables/EmergencyContact',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: emergencyContact
        }
        return $http(req);
        //return $http.get(urlBase + '/tables/EmergencyContact');
    };

    dataFactory.GetEmergencyContact = function (id) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'GET',
            url: urlBase + '/tables/EmergencyContact' + id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            }            
        }
        return $http(req);
        //return $http.get(urlBase + '/tables/EmergencyContact/' + id);
    };

    dataFactory.PatchEmergencyContact = function (id, emergencyContact) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'PATCH',
            url: urlBase + '/tables/EmergencyContact/' + id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: emergencyContact
        }
        return $http(req);
        //return $http.patch(urlBase + '/tables/EmergencyContact/' + id, emergencyContact);
    };

    dataFactory.PostEmergencyContact = function (emergencyContact) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'POST',
            url: urlBase + '/tables/EmergencyContact',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: emergencyContact
        }        
        return $http(req);
    };

    dataFactory.DeleteEmergencyContact = function (id) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'DELETE',
            url: urlBase + '/tables/EmergencyContact/' + id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            }            
        }
        return $http(req);
        //return $http.delete(urlBase + '/tables/EmergencyContact/' + id);
    };
    return dataFactory;
}]);