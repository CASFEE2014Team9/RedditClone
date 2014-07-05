
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Guard = require('Guard');
    var $ui = require('jqueryui');

    function LoginDialog(htmlNode, contextViewModel) {
        //var Context = require('Context');
        //Guard.customType(context, "context", Context);

        this.htmlNode = htmlNode;
        this.contextViewModel = contextViewModel;

        this.loginInput = $("#loginDialogLoginInput");
        this.passwordInput = $("#loginDialogPasswordInput");
        this.loginButton = $("#loginDialogLoginButton");
    }

    LoginDialog.prototype.initialize = function initialize() {
        this.loginButton.on({
            click: $.proxy(this.onLoginButtonClick, this)
        });

        this.htmlNode.dialog({
            autoOpen: false
        });
    };

    LoginDialog.prototype.onLoginButtonClick = function onLoginButtonClick() {
        try {
            Guard.handleError(this, function login(item) {
                var name = item.loginInput.val();
                var password = item.passwordInput.val();
                var userViewModel = item.contextViewModel.userViewModel;
                var user = userViewModel.user;
                user.name = name;
                user.password = password;
                userViewModel.login();

                item.htmlNode.dialog("close");
            }, true);
        } finally {
            return false;
        }
    };

    LoginDialog.prototype.open = function open() {
        this.htmlNode.dialog("open");
    };

    return LoginDialog;
});