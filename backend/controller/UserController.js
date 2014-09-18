(function () {
    'use strict';
    var Repository = require('./Repository');
    var userRepository = new Repository('user');

    var UserController = function UserController() {
        this.req = null;
        this.res = null;
        var self = this;

        var json = function (data) {
            if (self.res) {
                self.res.json(data);
            }
            return data;
        };

        var success = function () {
            return json(200);
        };

        this.getAll = function () {
            return json(userRepository.getAll());
        };

        this.get = function (id) {
            return json(userRepository.get(id));
        };

        this.post = function (item) {
            var user = {
                id : item.id,
                name : item.name,
                email : item.email,
                password : item.password
            };

            userRepository.post(user);
            userRepository.saveChanges();
            return success();
        };

        this.delete = function (id) {
            var PostController = require('./PostController');
            var CommentController = require('./CommentController');
            var RatingController = require('./RatingController');

            PostController.repository.deleteIfPropertyMatches('userId', id);
            CommentController.repository.deleteIfPropertyMatches('userId', id);
            RatingController.repository.deleteIfPropertyMatches('userId', id);
            userRepository.delete(id);

            PostController.repository.saveChanges();
            CommentController.repository.saveChanges();
            RatingController.repository.saveChanges();
            userRepository.saveChanges();
            return success();
        };
    };

    UserController.repository = userRepository;

    module.exports = UserController;
}());