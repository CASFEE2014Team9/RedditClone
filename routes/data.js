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

/*get one user by Id*/
router.get('/users/:id', function(req, res) {

    var usersPath = path.join(root, "public/data", "users.json");

    var id = req.params.id;

    fs.readFile( usersPath, function( err, data ) {
        var users = JSON.parse(data);

        res.json(users[id]);
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

module.exports = router;
