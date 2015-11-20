'use strict';
angular.module('starter')
.factory('calificationFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllCalification = function () {
        return $http.get(urlBase + '/tables/Calification');
    };

    dataFactory.GetCalification = function (id) {
        return $http.get(urlBase + '/tables/Calification/' + id);
    };

    dataFactory.PatchCalification = function (id, calification) {
        return $http.patch(urlBase + '/tables/Calification/' + id, calification);
    };

    dataFactory.PostCalification = function (calification) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'POST',
            url: urlBase + '/tables/Calification',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: calification
        }        
        return $http(req);
    };

    dataFactory.DeleteCalification = function (id) {
        return $http.delete(urlBase + '/tables/Calification/' + id);
    };
    return dataFactory;
}]);