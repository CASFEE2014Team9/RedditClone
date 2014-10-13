
/*jslint browser: true*/
/*global window, angular, io */

(function () {
  'use strict';
  var reposityModule = angular.module('repository', []);

  reposityModule
    .factory('Repository', function ($http, $q) {
      function Repository(type) {
        this.type = type;
        var itemsPromise = null;
        var itemsByIdPromises = {};
        var itemsByPropertyPromises = {};
        var self = this;
        var loc = window.location;
        var url = loc.origin + loc.pathname + 'data/';
        url = url + type + 's/';

        /*get all items*/
        this.getAll = function getAll() {
          if (!itemsPromise) {
            itemsPromise = $http.get(url).then(function (data) {
              if (data.data.ret === 'success') {
                var id, item;
                var localData = {};
                delete data.data.data.maxId;
                for (id in data.data.data) {
                  item = data.data.data[id];
                  item.id = id;
                  localData[id] = item;
                }
                return localData;
              }
              return $q.reject(data.data.message);
            });
          }
          return itemsPromise;
        };

        /*get all items where the given property matches the given value*/
        this.getMatching = function getMatching(property, value) {
          if (!itemsByPropertyPromises[property]) {
            itemsByPropertyPromises[property] = {};
          }
          if (!itemsByPropertyPromises[property][value]) {
            itemsByPropertyPromises[property][value] = self.getAll().then(function (data) {
              var filtered = [];
              var id, item;
              for (id in data) {
                item = data[id];
                if (item[property] === value) {
                  filtered.push(item);
                }
              }
              return filtered;
            });
          }
          return itemsByPropertyPromises[property][value];
        };

        this.getFirstMatching = function getFirstMatching(property, value) {
          return self.getMatching(property, value).then(function (data) {
            return data[0];
          });
        };

        /*get one item by its id*/
        this.get = function get(id) {
          if (!itemsByIdPromises[id]) {
            itemsByIdPromises[id] = self.getAll().then(function (data) {
              return data[id];
            });
          }
          return itemsByIdPromises[id];
        };

        /*is called if a post was successful or io receives an update*/
        var onPostSuccess = function (item) {
          self.getAll().then(function (existing) {
            var property, promise;

            existing[item.id] = item;

            var updatePromise = function (filtered) {
              filtered.push(item);
            };

            for (property in itemsByPropertyPromises) {
              promise = itemsByPropertyPromises[property][item[property]];
              if (promise) {
                promise.then(updatePromise);
              }
            }
            return item;
          });
        };

        /*is called if a delete was successful or io receives an delete*/
        var onDeleteSuccess = function (id) {
          self.getAll().then(function (existing) {
            delete existing[id];
          });
        };

        /*if id is undefined create a new item*/
        /*if id is defined update an existing item*/
        this.post = function post(item) {
          return $http.post(url, item).then(function (data) {
            if (data.data.ret === 'success') {
              item = data.data.data;
              return onPostSuccess(item);
            }
          });
        };

        /*delete an item by its id*/
        this.delete = function (id) {
          return $http.delete(url + id + '/').then(function (data) {
            if (data.data.ret === 'success') {
              onDeleteSuccess(id);
            }
          });
        };

        var updatePath = 'http://localhost:3001/' + type + 's';
        var socket = io(updatePath);
        socket.on('connect', function () {
          console.log('connected to ' + updatePath);
        });

        socket.on('disconnect', function () {
          console.log('disconnected from ' + updatePath);
        });

        socket.on('post', function (item) {
          console.log('post ');
          console.dir(item);
          onPostSuccess(item);
        });

        socket.on('delete ', function (id) {
          console.log('delete ' + id);
          onDeleteSuccess(id);
        });
      }
      return Repository;
    });
}());