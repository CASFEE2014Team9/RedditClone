
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function (require) {
    'use strict';
    var $ = require('jquery');
    var Guard = require('Guard');
    var $ui = require('jqueryui');

    function LoginDialog(htmlNode, context) {
        var Context = require('Context');
        Guard.customType(context, "context", Context);

        this.htmlNode = htmlNode;
        this.context = context;

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
        Guard.handleError(this, function login(item) {
            var name = item.loginInput.val();
            var password = item.passwordInput.val();
            var user = item.context.user;
            user.name = name;
            user.password = password;
            user.login();

            item.htmlNode.dialog("close");
        });
    };

    LoginDialog.prototype.open = function open() {
        this.htmlNode.dialog("open");
    };

    return LoginDialog;
});