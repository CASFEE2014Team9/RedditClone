
/*jslint browser: true*/
/*global window, requirejs, define */

var requirejs = require('requirejs');

requirejs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname,
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    paths: {
        domReady : 'Lib/requirejs-domready/domReady',
        linqjs: 'Lib/linqjs-amd/linq',
        Guard: 'Lib/guard',
        string: 'Lib/string',
        List: 'Lib/List',
        Context: 'Model/Context',
        Post: 'Model/Post',
        Category: 'Model/Category',
        User: 'Model/User',
        Comment: 'Model/Comment',
        Rating: 'Model/Rating'
    }
});

requirejs(['http', 'express', 'fs', 'hbs', './routes'], function (http, express, fs, hbs, routes) {
    'use strict';

    var port = 9000;
    var app = express();

    // setup error handling
    app.use(function errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.send(500, err.stack);
    });

    // setup static routes for static stuff
    var dir = __dirname;
    app.use("/css", express.static(dir + '/css/'));
    app.use("/Lib", express.static(dir + '/Lib/'));
    app.use("/Model", express.static(dir + '/Model/'));
    app.use("/style-guide", express.static(dir + '/style-guide/'));
    app.use("/View", express.static(dir + '/View/'));
    app.use("/ViewModel", express.static(dir + '/ViewModel/'));
    app.use("/Tests", express.static(dir + '/Tests/'));

    // setup routes
    routes(app, dir);

    //setup view render engine
    app.set('view engine', 'hbs');
    app.set('views', dir + '/View');

    var handlebars = hbs.handlebars;

    fs.readFile(dir + '/View/' + 'category.hbs', function (err, content) {
        if (err) {
            console.error(err);
            return;
        }

        handlebars.registerPartial('category', content.toString());
    });

    fs.readFile(dir + '/View/' + 'post.hbs', function (err, content) {
        if (err) {
            console.error(err);
            return;
        }

        handlebars.registerPartial('post', content.toString());
    });

    fs.readFile(dir + '/View/' + 'comment.hbs', function (err, content) {
        if (err) {
            console.error(err);
            return;
        }

        handlebars.registerPartial('comment', content.toString());
    });

    //setup server
    var server = http.createServer(app);
    server.listen(port);
});