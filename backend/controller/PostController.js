(function () {
    'use strict';
    var Repository = require('./Repository');
    var postRepository = new Repository('post');

    var PostController = function PostController() {
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
            return json(postRepository.getAll());
        };

        this.get = function (id) {
            return json(postRepository.get(id));
        };

        this.post = function (item) {
            var post = {
                id : item.id,
                url : item.url,
                description : item.description,
                userId : item.userId,
                createdAt : item.createdAt
            };

            var UserController = require('./UserController');
            if (!UserController.repository.exists(item.userId)) {
                return json('user ' + item.userId + ' not found');
            }

            postRepository.post(post);
            postRepository.saveChanges();
            return success();
        };

        this.delete = function (id) {
            var CommentController = require('./CommentController');
            var RatingController = require('./RatingController');

            CommentController.repository.deleteIfPropertyMatches('postId', id);
            RatingController.repository.deleteIfPropertyMatches('postId', id);
            postRepository.delete(id);

            CommentController.repository.saveChanges();
            RatingController.repository.saveChanges();
            postRepository.saveChanges();
            return success();
        };
    };

    PostController.repository = postRepository;

    module.exports = PostController;
}());