
/*jslint browser: true*/
/*global window, requirejs, define */

requirejs.config({
    baseUrl: 'http://localhost:9000/',
    paths: {
        domReady : './Lib/requirejs-domready/domReady',
        jquery: './Lib/jquery/dist/jquery',
        jqueryui: './Lib/jquery-ui/ui/jquery-ui',
        cookie: './Lib/Cookies/dist/cookies.min',
        Guard: './Lib/guard',
        string: './Lib/string',
        Array: './Lib/Array',
        Context: './Model/Context',
        User: './Model/User',
        Post: './Model/Post',
        Comment: './Model/Comment',
        Rating: './Model/Rating',
        LoginDialog: './Forms/LoginDialog'
    }
});