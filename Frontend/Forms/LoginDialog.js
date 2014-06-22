
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

    LoginDialog.prototype.initialize = function () {
        this.loginButton.on({
            click: $.proxy(this.onLoginButtonClick, this)
        });

        this.htmlNode.dialog({
            autoOpen: false
        });
    };

    LoginDialog.prototype.onLoginButtonClick = function () {
        Guard.handleError("Login", this, function () {
            var name = this.loginInput.val();
            var password = this.passwordInput.val();
            var user = this.context.user;
            user.name = name;
            user.password = password;
            user.login();

            this.htmlNode.dialog("close");
        });
    };

    LoginDialog.prototype.open = function () {
        this.htmlNode.dialog("open");
    };

    return LoginDialog;
});