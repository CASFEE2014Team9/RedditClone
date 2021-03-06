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

    this.notAuthentificated = function notAuthentificated() {
      return self.json({
        ret : 'not Authentificated',
        message : 'not Authentificated'
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
      self.repository.deleteItem(id);
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

    this.authenticate = function (userId) {
      if (self.req) {
        if (userId !== undefined) {
          return self.req.user.id === userId || self.req.user.role === 4;
        }
        return self.req.user !== undefined;
      }
      return true;
    };
  };

  module.exports = Controller;
}());