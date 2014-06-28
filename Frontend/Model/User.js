
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineUser(require) {
    'use strict';

    var Guard = require("Guard");
    var cookie = require("cookie");
    var $ = require("jquery");

    function User(context, name, password) {

        var Context = require("Context");
        Guard.customType(context, "context", Context);
        Guard.string(name, "name");
        Guard.string(password, "password");

        this.context = context;
        this.name = name;
        this.password = password;
        this.posts = [];
        this.htmlNode =  $($(".login")[0]);
        this.loginstate = User.LoginState.LoggedOut;
    }

    User.LoginState = {
        LoggedOut : {value: 0, name: "LoggedOut"},
        LoggedIn:   {value: 1, name: "LoggedIn"}
    };

    User.anonymous = "anonymous";

    User.userFromCookie = function userFromCookie(context) {
        var name = cookie.get("name");
        if (name === "" || name === undefined) {
            return new User(context, User.anonymous, User.anonymous);
        }

        var password = cookie.get("password");

        return new User(context, name, password);
    };

    User.prototype.display = function display() {
        this.htmlNode.empty();

        if (this.loginstate === User.LoginState.LoggedIn) {
            var nameLabel = $("<label/>")
                .html(this.name);
            var logoutButton = $("<button/>")
                .html("logout")
                .on({
                    click: $.proxy(this.logout, this)
                });

            this.htmlNode.append(nameLabel);
            this.htmlNode.logoutButton = logoutButton;
            this.htmlNode.append(logoutButton);
        } else if (this.loginstate === User.LoginState.LoggedOut) {
            var loginButton = $("<Button/>")
                .html("login")
                .on({
                    click: $.proxy(this.onLoginClick, this)
                });

            this.htmlNode.loginButton = loginButton;
            this.htmlNode.append(loginButton);
        }
    };

    User.prototype.onLoginClick = function onLoginClick() {
        Guard.handleError(this, function showLoginDialog(item) {
            item.showLoginDialog();
        });
    };

    User.prototype.showLoginDialog = function showLoginDialog() {
        this.context.loginDialog.open();
    };

    User.prototype.login = function login() {
        this.context.user = this;

        cookie.set("name", this.name);
        cookie.set("password", this.password);

        this.loginstate = User.LoginState.LoggedIn;

        this.display();
    };

    User.prototype.logout = function logout() {
        this.context.user = null;

        cookie.set("name", "");
        cookie.set("password", "");

        this.loginstate = User.LoginState.LoggedOut;

        this.display();
    };

    return User;
});