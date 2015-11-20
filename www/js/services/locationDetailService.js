'use strict';
angular.module('starter')
.factory('locationDetailFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllLocationDetail = function () {
        return $http.get(urlBase + '/tables/LocationDetail');
    };

    dataFactory.GetLocationDetail = function (id) {
        return $http.get(urlBase + '/tables/LocationDetail/' + id);
    };

    dataFactory.PatchLocationDetail = function (id, locationDetail) {
        return $http.patch(urlBase + '/tables/LocationDetail/' + id, locationDetail);
    };

    dataFactory.PostLocationDetail = function (locationDetail) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'POST',
            url: urlBase + '/tables/LocationDetail',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: locationDetail
        }        
        return $http(req);
    };

    dataFactory.DeleteLocationDetail = function (id) {
        return $http.delete(urlBase + '/tables/LocationDetail/' + id);
    };
    return dataFactory;
}]);