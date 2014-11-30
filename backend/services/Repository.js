(function () {
  'use strict';
  var FS = require('q-io/fs');
  var path = require('path');

  var Repository = function Repository(type) {
    this.type = type;
    var dataPath = path.join(__dirname, './../data', type + 's.json');
    var items = null;
    var saving = null;
    var sockets = {};
    var self = this;

    this.getPublicData = function getPublicData(id, item) {
      item.id = id;
      return item;
    };

    /*saves pending modifications*/
    this.saveChanges = function saveChanges() {
      //handle file concurrency by allowing just one write at a time
      //if saving is in progress schedule next save after current is completed
      if (saving) {
        return saving.then(function () {
          saveChanges();
        });
      }

      saving = FS.write(dataPath, JSON.stringify(items));
      saving.then(function () {
        saving = null;
      });
    };

    /*get all items*/
    this.getAll = function getAll() {
      var localData = {};
      var id;
      for (id in items) {
        if (id === 'maxId') {
          continue;
        }
        localData[id] = self.getPublicData(id, items[id]);
      }
      return localData;
    };

    /*get all items where the given property matches the given value*/
    this.getMatching = function getMatching(property, value, forinternal) {
      var filtered = [];
      var id;
      var item;
      var getPublicData = self.getPublicData;
      if (forinternal) {
        getPublicData = function (id, item) {
          return item;
        };
      }

      for (id in items) {
        item = items[id];
        if (item[property] == value) {
          filtered.push(getPublicData(id, item));
        }
      }
      return filtered;
    };

    /*get one item by its id*/
    this.get = function get(id) {
      return self.getPublicData(id, items[id]);
    };

    /*if id is undefined create a new item*/
    /*if id is defined update an existing item*/
    this.post = function post(item) {
      var sockId;
      if (item.id === undefined || item.id === '') {
        items.maxId = items.maxId + 1;
        item.id = items.maxId;
      }

      items[item.id] = item;
      for (sockId in sockets) {
        sockets[sockId].emit('post', item);
      }
    };

    /*delete an item by its id*/
    this.deleteItem = function (id) {
      var sockId;

      delete items[id];
      for (sockId in sockets) {
        sockets[sockId].emit('delete', id);
      }
    };

    this.exists = function (id) {
      if (id === undefined) {
        return false;
      } else {
        return items[id] !== undefined;
      }
    };

    FS.exists(dataPath).then(function success() {
      FS.read(dataPath).then(function success(data) {
        items = JSON.parse(data);
      });
    }, function failed() {
      items = {
        maxId : 0
      };
    });

    this.handleUpdates = function (io) {
      io.on('connection', function (socket) {
        sockets[socket.id] = socket;
        console.log('connection ' + socket.id);

        socket.on('disconnect', function () {
          console.log('disconnection ' + socket.id);
          delete sockets[socket.id];
        });
      });
    };
  };

  module.exports = Repository;
}());