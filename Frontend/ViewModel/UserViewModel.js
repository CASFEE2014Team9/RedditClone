
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineUserViewModel(require) {
    'use strict';

    var Guard = require("Guard");
    var cookie = require("cookie");
    var $ = require("jquery");
    var User = require("User");

    function UserViewModel(user, contextViewModel) {
        this.user = user;
        this.contextViewModel = contextViewModel;
        this.htmlNode =  $($(".login")[0]);
        this.loginstate = User.LoginState.LoggedOut;
    }

    UserViewModel.FromCookie = function userFromCookie(contextViewModel) {
        var name = cookie.get("name");
        if (name === "" || name === undefined) {
            return new UserViewModel(new User(contextViewModel.context, User.anonymous, User.anonymous), contextViewModel);
        }

        var password = cookie.get("password");

        return new UserViewModel(new User(contextViewModel.context, name, password), contextViewModel);
    };

    UserViewModel.prototype.onLoginClick = function onLoginClick() {
        Guard.handleError(this, function showLoginDialog(item) {
            item.showLoginDialog();
        });
    };

    UserViewModel.prototype.showLoginDialog = function showLoginDialog() {
        this.contextViewModel.loginDialog.open();
    };

    UserViewModel.prototype.login = function login() {
        this.contextViewModel.userViewModel = this;

        Guard.string(this.user.name, "name");
        Guard.string(this.user.password, "password");

        cookie.set("name", this.user.name);
        cookie.set("password", this.user.password);

        this.loginstate = User.LoginState.LoggedIn;

        this.display();
    };

    UserViewModel.prototype.logout = function logout() {
        this.contextViewModel.userViewModel = null;

        cookie.set("name", "");
        cookie.set("password", "");

        this.loginstate = User.LoginState.LoggedOut;

        this.display();
    };


    UserViewModel.prototype.display = function display() {
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

    return UserViewModel;
});