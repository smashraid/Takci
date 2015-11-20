'use strict';
angular.module('starter')
.factory('accountFactory', ['$http', 'urlService', function ($http, urlService) {
    var urlBase = urlService;
    //var client = new WindowsAzure.MobileServiceClient('http://localhost:59733/', '', '');
    //var todoItemTable = client.getTable('c');
    var dataFactory = {};

    dataFactory.Registration = function (account) {
        //return todoItemTable.insert(account);
        //return $http.post(urlBase +'/api/CustomRegistration', account);
        var req = {
            method: 'POST',
            url: urlBase + '/api/CustomRegistration',
            headers: {
                'Content-Type': 'application/json;charset=utf-8 ',
                'Access-Control-Allow-Origin': 'localhost'
            },
            data: account
        }
        return $http(req);
    };

    dataFactory.Login = function (account) {
        return $http.post(urlBase +'/api/CustomLogin', account);
    };
    return dataFactory;
}]);