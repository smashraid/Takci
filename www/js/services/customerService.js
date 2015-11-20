'use strict';
angular.module('starter')
.factory('customerFactory', ['$http', '$window', 'urlService', 'tokenName', function ($http, $window, urlService, tokenName) {
    var urlBase = urlService;
    //var token = $window.localStorage[tokenName];
    var dataFactory = {};

    dataFactory.GetAllCustomer = function () {
        return $http.get(urlBase +'/tables/Customer');
    };

    dataFactory.GetCustomer = function (id) {
        return $http.get(urlBase + '/tables/Customer/' + id);
    };

    dataFactory.PatchCustomer = function (id, customer) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'PATCH',
            url: urlBase + '/tables/Customer/' + id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: customer
        }        
        return $http(req);
        //return $http.patch(urlBase + '/tables/Customer/' + id, customer);
    };

    dataFactory.PostCustomer = function (customer) {
        var token = $window.localStorage[tokenName];
        var req = {
            method: 'POST',
            url: urlBase + '/tables/Customer',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'X-ZUMO-AUTH': token
            },
            data: customer
        }
        //return $http.post(urlBase + '/tables/Customer', customer);
        return $http(req);
    };

    dataFactory.DeleteCustomer = function (id) {
        return $http.delete(urlBase + '/tables/Customer/' + id);
    };
    return dataFactory;
}]);