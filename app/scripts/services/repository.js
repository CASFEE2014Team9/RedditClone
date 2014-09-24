(function () {
  'use strict';
  var repositoryModule = angular.module('repository', []);

  repositoryModule
    .factory('Repository', function ($http, $location, $q) {
      function Repository(type) {
        this.type = type;
        var items = null;
        var self = this;
        var loc = window.location;
        var url = loc.origin + loc.pathname + 'data/';
        url = url + type + 's/';
        var changes = [];

        /*saves pending modifications*/
        this.saveChanges = function saveChanges() {
        };

        /*get all items*/
        this.getAll = function getAll() {
          var deferred = $q.defer();
          if (items !== null) {
            deferred.resolve(items);
          } else {
            $http.get(url)
              .success(function (data, status, headers, config) {
                items = data;
                deferred.resolve(items);
              })
              .error(function (data, status, headers, config) {
                console.log(data);
                deferred.reject(data, status, headers, config);
              });
          }
          return deferred.promise;
        };

        /*get all items where the given property matches the given value*/
        this.getMatching = function getMatching(property, value) {
          var filtered = [];
          var id;
          var item;

          for (id in items) {
            item = items[id];
            if (item[property] === value) {
              filtered.push(item);
            }
          }
          return filtered;
        };

        /*get one item by its id*/
        this.get = function get(id) {
          var deferred = $q.defer();

          var found = false;
          if (items === null) {
            items = {};
          } else {
            var item = items[id];
            if (item !== undefined) {
              deferred.resolve(item);
              found = true;
            }
          }

          if (!found) {
            $http.get(url + id + '/')
              .success(function (data, status, headers, config) {
                items[id] = data;
                deferred.resolve(data);
              })
              .error(function (data, status, headers, config) {
                console.log(data);
                deferred.reject(status);
              });
          }

          return deferred.promise;
        };

        /*if id is undefined create a new item*/
        /*if id is defined update an existing item*/
        this.post = function post(item) {
          var deferred = $q.defer();
          $http.post(url, item)
            .success(function (data, status, headers, config) {
              deferred.resolve(item);
            })
            .error(function (data, status, headers, config) {
              console.log(data);
              deferred.reject(status);
            });
           // .then(self.get() )
          items[item.id] = item;

          return deferred.promise;
        };

        /*delete an item by its id*/
        this.delete = function (id) {
          delete items[id];
        };

        this.exists = function (id) {
          if (id === undefined) {
            return false;
          } else {
            return self.get(id) !== undefined;
          }
        };
      }
      return Repository;
    });
}());