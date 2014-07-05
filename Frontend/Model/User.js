
/*jslint browser: true*/
/*global window, requirejs, define, alert */

define(function defineUser(require) {
    'use strict';

    var Guard = require("Guard");

    var ids = 0;

    function User(context, name, password) {

        var Context = require("Context");
        Guard.customType(context, "context", Context);
        Guard.string(name, "name");
        Guard.string(password, "password");

        this.id = ids;
        ids = ids + 1;
        this.context = context;
        this.name = name;
        this.password = password;
        this.posts = [];
        this.loginstate = User.LoginState.LoggedOut;
    }

    User.LoginState = {
        LoggedOut : {value: 0, name: "LoggedOut"},
        LoggedIn:   {value: 1, name: "LoggedIn"}
    };

    User.anonymous = "anonymous";

    return User;
});