(function () {
  'use strict';

  var Controller = function Controller(repository) {
    this.repository = repository;
    this.req = null;
    this.res = null;
    var self = this;

    this.json = function json(data) {
      if (self.res) {
        self.res.json(data);
      }
      return data;
    };

    this.success = function success() {
      return self.json(200);
    };

    this.notFound = function notFound(type, id) {
      return self.json(type + ' ' + id + ' not found');
    };

    this.getAll = function getAll() {
      return self.json(self.repository.getAll());
    };

    this.get = function get(id) {
      return self.json(self.repository.get(id));
    };

    this.post = function post(item) {
      self.repository.post(item);
      self.repository.saveChanges();
      return self.success();
    };

    this.deleteItem = function deleteItem(id) {
      self.repository.delete(id);
      self.repository.saveChanges();
      return self.success();
    };

    this.deleteIfPropertyMatches = function deleteIfPropertyMatches(property, value) {
      var matchingItems = repository.getMatching(property, value);
      var i;

      for (i = 0; i < matchingItems.length; i++) {
        self.deleteItem(matchingItems[i].id);
      }
    };
  };

  module.exports = Controller;
}());