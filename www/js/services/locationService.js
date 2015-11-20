'use strict';
angular.module('starter')
.factory('locationFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllLocation = function () {
        return $http.get(urlBase + '/tables/Location');
    };

    dataFactory.GetLocation = function (id) {
        return $http.get(urlBase + '/tables/Location/' + id);
    };

    dataFactory.PatchLocation = function (id, location) {
        return $http.patch(urlBase + '/tables/Location/' + id, location);
    };

    dataFactory.PostLocation = function (location) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'POST',
            url: urlBase + '/tables/Location',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: location
        }        
        return $http(req);
    };

    dataFactory.DeleteLocation = function (id) {
        return $http.delete(urlBase + '/tables/Location/' + id);
    };
    return dataFactory;
}]);