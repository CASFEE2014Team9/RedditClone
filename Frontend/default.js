
/*jslint browser: true*/
/*global window, requirejs, define */

(function () {
    'use strict';

    require(["requirejs-config"], function () {
        require(['domReady!', 'Context'],
            function (dom, Context) {

                var context = new Context();
                context.initialize();
                window.context = context;
                context.GetPosts();
            });
    });
}());