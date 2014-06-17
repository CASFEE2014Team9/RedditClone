'use strict';

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
        Context: './Model/Context',
        User: './Model/User',
        Post: './Model/Post',
        Comment: './Model/Comment',
        Rating: './Model/Rating'
    }
});

require(['jquery', 'jqueryui', 'domReady!', 'Context', 'User', 'Post', 'Guard'],
    function ($, $ui, dom, Context, User, Post, Guard) {

        var context = new Context();
        var loginDialog = $("#loginDialog").dialog({
            autoOpen: false
        });

        loginDialog.loginInput = $("#loginDialogLoginInput");
        loginDialog.passwordInput = $("#loginDialogPasswordInput");
        loginDialog.loginButton = $("#loginDialogLoginButton");
        loginDialog.onLoginButtonClick = function () {
            var name = loginDialog.loginInput.val();
            var password = loginDialog.passwordInput.val();
            var user = new User(loginDialog.context, name, password);
            user.login();

            loginDialog.dialog("close");
        };

        loginDialog.loginButton.on({
            click: loginDialog.onLoginButtonClick
        });

        context.loginDialog = loginDialog;
        loginDialog.context = context;

        context.addPostButton = $("#addPostButton");
        context.addPostButton.on({
            click: $.proxy(context.onLoginButtonClick, context)
        });

        window.context = context;

        context.GetPosts();
    });
