(function () {
  'use strict';
  var fs = require('fs');
  var path = require('path');

  var Repository = function Repository(type) {
    var dataPath = path.join(__dirname, "./../data", type + "s.json");
    var items = null;

    /*saves pending modifications*/
    this.saveChanges = function saveChanges() {
      fs.writeFile(dataPath, JSON.stringify(items));
    };

    /*get all items*/
    this.getAll = function getAll() {
      return items;
    };

    /*get one item by its id*/
    this.get = function get(id) {
      return items[id];
    };

    /*if id is undefined create a new item*/
    /*if id is defined update an existing item*/
    this.post = function post(item) {
      if (item.id === undefined || item.id === "") {
        items.maxId = items.maxId + 1;
        item.id = items.maxId;
      }

      items[item.id] = item;
    };

    /*delete an item by its id*/
    this.delete = function (id) {
      delete items[id];
    };

    /*delete an item if its property matches a certain value*/
    this.deleteIfPropertyMatches = function (property, value) {
      for (var id in items) {
        var item = items[id];
        if (item[property] === value) {
            this.delete(id);
        }
      }
    };

    this.exists = function(id) {
      if (id === undefined) {
        return false;
      } else {
        return items[id] !== undefined;
      }
    };

    if (fs.existsSync(dataPath)) {
      fs.readFile(dataPath, function (err, data) {
        items = JSON.parse(data);
      });
    } else {
      items = {
        maxId : 0
      };
    }
  };

  module.exports = Repository;
}());