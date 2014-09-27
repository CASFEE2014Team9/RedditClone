(function () {
  'use strict';
  var repositoryModule = angular.module('repository', []);

  repositoryModule
    .factory('Repository', function ($http, $location, $q) {
      function Repository(type, wrapper) {
        this.type = type;
        this.wrapper = wrapper;
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
                if (data.ret === 'success') {
                  var localData = data.data;
                  if (self.wrapper !== undefined) {
                    var id;
                    for (id in localData) {
                      self.wrapper(localData[id]);
                    }
                  }
                  items = localData;
                  deferred.resolve(items);
                } else {
                  console.log(data.message);
                  deferred.reject(data.message);
                }
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
          var deferred = $q.defer();

          var filtered = [];
          self.getAll().then(function (data) {
            var id;
            var item;
            for (id in data) {
              item = data[id];
              if (item[property] === value) {
                filtered.push(item);
              }
            }
            deferred.resolve(filtered);
          });

          return deferred.promise;
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
                if (data.ret === 'success') {
                  var localData = data.data;
                  if (self.wrapper !== undefined) {
                    self.wrapper(localData);
                  }
                  items[id] = localData;
                  deferred.resolve(localData);
                } else {
                  console.log(data.message);
                  deferred.reject(data.message);
                }
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
              if (data.ret === 'success') {
                item = data.data;
                items[item.id] = item;
                deferred.resolve(item);
              } else {
                console.log(data.message);
                deferred.reject(data.message);
              }
            })
            .error(function (data, status, headers, config) {
              console.log(data);
              deferred.reject(status);
            });

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