var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var root = path.resolve(process.cwd());

/*get all users*/
router.get('/users', function(req, res) {

    var usersPath = path.join(root, "public/data", "users.json");

    res.sendfile(usersPath);
});

/*get all ratings*/
router.get('/ratings', function(req, res) {
    var usersPath = path.join(root, "public/data", "ratings.json");

    res.sendfile(usersPath);
});
/*get one user by Id*/
router.get('/ratings/:id', function(req, res) {

    var ratingsPath = path.join(root, "public/data", "ratings.json");

    var id = req.params.id;

    fs.readFile( ratingsPath, function( err, data ) {
        var ratings = JSON.parse(data);

        res.json(ratings[id]);
    } );
});

/*post one user*/
/*with id -> update*/
/*without id -> create*/
router.post('/users', function(req, res) {

    var usersPath = path.join(root, "public/data", "users.json");

    var user = {
        id : req.body.id,
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    };


    fs.readFile( usersPath, function( err, data ) {
        var users = JSON.parse(data);

        if (user.id === undefined)
        {
            users.maxId = users.maxId + 1;
            user.id = users.maxId;
        }

        users[user.id] = user;

        fs.writeFile( usersPath, JSON.stringify(users) );

        res.returnValue = 200;
    } );
});

/*post one rating*/
/*with id -> update*/
/*without id -> create*/
router.post('/ratings', function(req, res) {

    var ratingsPath = path.join(root, "public/data", "ratings.json");

    var rating = {
        id : req.body.id,
        user_id: req.body.user_id,
        post_id : req.body.post_id,
        score: req.body.score
    };


    fs.readFile( ratingsPath, function( err, data ) {
        var ratings = JSON.parse(data);

        if (rating.id === undefined)
        {
            ratings.maxId = ratings.maxId + 1;
            rating.id = ratings.maxId;
        }

        ratings[rating.id] = rating;

        fs.writeFile( ratingsPath, JSON.stringify(ratings) );

        res.end('Rating wurde durchgeführt');
    } );
});

/*get one user by Id*/
router.delete('/users/:id', function(req, res) {

    var usersPath = path.join(root, "public/data", "users.json");

    var id = req.params.id;

    fs.readFile( usersPath, function( err, data ) {
        var users = JSON.parse(data);

        delete users[id];

        fs.writeFile( usersPath, JSON.stringify(users) );

        res.returnValue = 200;
    } );
});

/*get one rating by Id*/
router.delete('/ratings/:id', function(req, res) {

    var ratingsPath = path.join(root, "public/data", "ratings.json");

    var id = req.params.id;

    fs.readFile( ratingsPath, function( err, data ) {
        var ratings = JSON.parse(data);

        delete ratings[id];

        fs.writeFile( ratingsPath, JSON.stringify(ratings) );

        res.returnValue = 200;
    } );
});

/* ---------- */
/* data/posts */

/*get all post*/
router.get('/posts', function(req, res) {
    res.sendfile(postsPath);
});

/*get one post by Id*/
router.get('/posts/:id', function(req, res) {
    var id = req.params.id;

    fs.readFile( postsPath, function( err, data ) {
        var posts = JSON.parse(data);

        res.json(posts[id]);
    } );
});

/*post one post*/
/*with id -> update*/
/*without id -> create*/
router.post('/posts', function(req, res) {
    var post = {
        url : req.body.url,
        description : req.body.description,
        creatorId : req.body.creatorId,
        createdAt : req.body.createdAt
    };


    fs.readFile( postsPath, function( err, data ) {
        var posts = JSON.parse(data);

        if (post.id === undefined)
        {
            posts.maxId = posts.maxId + 1;
            post.id = posts.maxId;
        }

        posts[post.id] = post;

        fs.writeFile( postsPath, JSON.stringify(posts) );

        res.returnValue = 200;
    } );
});


/*delete one post by Id*/
router.delete('/posts/:id', function(req, res) {
    var id = req.params.id;

    fs.readFile( postsPath, function( err, data ) {
        var posts = JSON.parse(data);

        delete posts[id];

        fs.writeFile( postsPath, JSON.stringify(users) );

        res.returnValue = 200;
    } );
});

module.exports = router;
