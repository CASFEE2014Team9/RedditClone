
/*jslint browser: true*/
/*global window, alert, angular */

(function () {
  'use strict';
  var repositoryModule = angular.module('repository', []);

  repositoryModule
    .factory('Repository', function ($http, $q) {
      function Repository(type, wrapper) {
        this.type = type;
        this.wrapper = wrapper;
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
            itemsPromise = $http.get(url).then(function (data, status, headers, config) {
              if (data.data.ret === 'success') {
                var localData = {};
                if (self.wrapper !== undefined) {
                  var id;
                  var item;
                  for (id in data.data.data) {
                    item = data.data.data[id];
                    self.wrapper(item);
                    localData[id] = item;
                  }
                }
                return localData;
              }
              console.log(data.data.message);
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
              var id;
              var item;
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

        /*get one item by its id*/
        this.get = function get(id) {
          if (!itemsByIdPromises[id]) {
            itemsByIdPromises[id] = self.getAll().then(function (data) {
              return data[id];
            });
          }
          //$http.get(url + id + '/');

          return itemsByIdPromises[id];
        };

        /*if id is undefined create a new item*/
        /*if id is defined update an existing item*/
        this.post = function post(item) {
          return $http.post(url, item).then(function (data, status, headers, config) {
            if (data.data.ret === 'success') {
              item = data.data.data;
              self.getAll().then(function (existing) {
                if (self.wrapper !== undefined) {
                  self.wrapper(item);
                }
                existing[item.id] = item;
                return item;
              });
            }
          });
        };

        /*delete an item by its id*/
        this.delete = function (id) {
          return $http.delete(url + id + '/').then(function (data, status, headers, config) {
            if (data.data.ret === 'success') {
              self.getAll().then(function (existing) {
                delete existing[id];
              });
            }
          });
        };
      }
      return Repository;
    });
}());