
/*jslint browser: true*/
/*global window, requirejs, define, alert */

(function () {
    'use strict';

    requirejs.onError = function (err) {
        var errorMessage = 'failed to load: ' + err.requireModules + ' ' + err.message;
        console.log(errorMessage);
        alert(errorMessage);
        throw err;
    };

    require(["requirejs-config"], function () {
        require(['domReady!', 'ContextViewModel'],
            function main(dom, ContextViewModel) {

                var contextViewModel = new ContextViewModel();
                contextViewModel.initialize();
                window.contextViewModel = contextViewModel;

                contextViewModel.context.getCategories();
                contextViewModel.context.getPosts();
                contextViewModel.connectModelWithView();
            });
    });
}());