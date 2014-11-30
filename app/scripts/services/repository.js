
/*jslint browser: true*/
/*global window, angular */

(function () {
  'use strict';
  var reposityModule = angular.module('repository', ['io']);

  reposityModule
    .factory('Repository', function ($http, $q, $injector, io) {
      function Repository(type) {
        this.type = type;
        var itemsPromise = null;
        var itemsByIdPromises = {};
        var update = {};
        var itemsByPropertyPromises = {};
        var self = this;
        var loc = window.location;
        var url = loc.origin + loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1) + 'data/';
        url = url + type + 's/';

        var indexOf = function (items, id) {
          var i = 0;
          for (i; i < items.length; i++) {
            if (parseInt(items[i].id) === id) {
              return i;
            }
          }
          return -1;
        };

        var getInternal = function (items, id) {
          var idx = indexOf(items, id);
          if (idx === -1) {
            return null;
          }
          return items[idx];
        };

        /*get all items*/
        this.getAll = function getAll() {
          if (!itemsPromise) {
            update = itemsPromise = $http.get(url).then(function (data) {
              var result = [];
              if (data.data.ret === 'success') {
                var id;
                for (id in data.data.data) {
                  result.push(data.data.data[id]);
                }
                return result;
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
                if (item[property] == value) {
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
          if (typeof id === 'string') {
            id = parseInt(id);
          }
          if (!itemsByIdPromises[id]) {
            itemsByIdPromises[id] = self.getAll().then(function (data) {
              return getInternal(data, id);
            });
          }
          return itemsByIdPromises[id];
        };

        /*is called if a post was successful or io receives an update*/
        var onPostSuccess = function (item) {
          update = update.then(function (existing) {
            var property, promise;

            var updatePromise = function (filtered) {
              var idx = indexOf(filtered, item.id);
              if (idx >= 0) {
                filtered[idx] = item;
              } else {
                filtered.push(item);
              }
              return filtered;
            };

            updatePromise(existing);

            for (property in itemsByPropertyPromises) {
              promise = itemsByPropertyPromises[property][item[property]];
              if (promise) {
                itemsByPropertyPromises[property][item[property]] = promise.then(updatePromise);
              }
            }
            return existing;
          });
          return item;
        };

        /*is called if a delete was successful or io receives an delete*/
        var onDeleteSuccess = function (id) {
          update = update.then(function (existing) {
            var idx = indexOf(existing, id);
            if (idx !== -1) {
              existing.splice(idx, 1);
            }
            return existing;
          });
        };

        /*if id is undefined create a new item*/
        /*if id is defined update an existing item*/
        this.post = function post(item) {
          var session = $injector.get('session');
          return $http.post(url, {
            credentialsUser : session.user.name,
            credentialsPassword : session.user.password,
            data : item
          }).then(function (data) {
            if (data.data.ret === 'success') {
              item = data.data.data;
              return onPostSuccess(item);
            }
          });
        };

        /*delete an item by its id*/
        this.delete = function (id) {
          var session = $injector.get('session');
          return $http.delete(url + id + '/', {
            credentialsUser : session.user.name,
            credentialsPassword : session.user.password
          }).then(function (data) {
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
          console.log('post ' + type + ' ');
          console.dir(item);
          onPostSuccess(item);
        });

        socket.on('delete', function (id) {
          console.log('delete ' + type + ' ' + id);
          onDeleteSuccess(id);
        });
      }
      return Repository;
    });
}());
