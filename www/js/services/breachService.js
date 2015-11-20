'use strict';
angular.module('starter')
.factory('breachFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllBreach = function () {
        return $http.get(urlBase + '/tables/Breach');
    };

    dataFactory.GetBreach = function (id) {
        return $http.get(urlBase + '/tables/Breach/' + id);
    };

    dataFactory.PatchBreach = function (id, breach) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'PATCH',
            url: urlBase + '/tables/Breach/' + id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: breach
        }        
        return $http(req);
        //return $http.patch(urlBase + '/tables/Customer/' + id, customer);
    };

    dataFactory.PostBreach = function (breach) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'POST',
            url: urlBase + '/tables/Breach',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: breach
        }
        //return $http.post(urlBase + '/tables/Customer', customer);
        return $http(req);
    };

    dataFactory.DeleteBreach = function (id) {
        return $http.delete(urlBase + '/tables/Breach/' + id);
    };
    return dataFactory;
}]);