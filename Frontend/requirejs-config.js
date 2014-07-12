
/*jslint browser: true*/
/*global window, requirejs, define */

requirejs.config({
    baseUrl: 'http://localhost:9000/',
    paths: {
        domReady : './Lib/requirejs-domready/domReady',
        jquery: './Lib/jquery/dist/jquery',
        jqueryui: './Lib/jquery-ui/jquery-ui',
        cookie: './Lib/Cookies/dist/cookies.min',
        linqjs: './Lib/linqjs-amd/linq',
        handlebars: './Lib/handlebars/handlebars',
        hbs: './Lib/require-handlebars-plugin/hbs',
        Guard: './Lib/guard',
        string: './Lib/string',
        List: './Lib/List',

        Context: './Model/Context',
        User: './Model/User',
        Post: './Model/Post',
        Comment: './Model/Comment',
        Category: './Model/Category',
        Rating: './Model/Rating',

        ContextViewModel: './ViewModel/ContextViewModel',
        UserViewModel: './ViewModel/UserViewModel',
        PostViewModel: './ViewModel/PostViewModel',
        CommentViewModel: './ViewModel/CommentViewModel',
        CategoryViewModel: './ViewModel/CategoryViewModel',
        RatingViewModel: './ViewModel/RatingViewModel',

        LoginDialog: './View/LoginDialog'
    },
    hbs: {
        partialsUrl: 'View'
    }
});