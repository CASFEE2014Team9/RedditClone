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

    this.success = function success(data) {
      return self.json({
        ret : 'success',
        data : data
      });
    };

    this.notFound = function notFound(type, id) {
      return self.json({
        ret : 'not found',
        message : type + ' ' + id + ' not found'
      });
    };

    this.getAll = function getAll() {
      return self.success(self.repository.getAll());
    };

    this.get = function get(id) {
      return self.success(self.repository.get(id));
    };

    this.getMatching = function getMatching(property, value) {
      return self.success(self.repository.getMatching(property, value));
    };

    this.deleteItem = function deleteItem(id) {
      self.repository.delete(id);
      self.repository.saveChanges();
      return self.success();
    };

    this.deleteIfPropertyMatches = function deleteIfPropertyMatches(property, value) {
      var matchingItems = self.repository.getMatching(property, value);
      var i;

      for (i = 0; i < matchingItems.length; i++) {
        self.deleteItem(matchingItems[i].id);
      }
    };
  };

  module.exports = Controller;
}());