'use strict';

module.exports = function (config) {
    config.set({
        plugins: ['karma-qunit', 'karma-requirejs'],
        frameworks: ['qunit'],
        files: [
            //REQUIRE,
            //REQUIRE_ADAPTER,
            'Model/Tests/*.js',
            '*.js'
        ],
        exclude: [
            'node.js'
        ]
    });
};