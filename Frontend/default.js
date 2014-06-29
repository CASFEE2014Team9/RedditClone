
/*jslint browser: true*/
/*global window, requirejs, define, alert */

(function () {
    'use strict';

    requirejs.onError = function (err) {
        var errorMessage = 'failed to load: ' + err.requireModules;
        console.log(errorMessage);
        alert(errorMessage);
        throw err;
    };

    require(["requirejs-config"], function () {
        require(['domReady!', 'Context'],
            function main(dom, Context) {

                var context = new Context();
                context.initialize();
                window.context = context;
                context.getCategories();
                context.getPosts();
            });
    });
}());