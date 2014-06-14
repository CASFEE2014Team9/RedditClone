module.exports = function(config) {
    config.set({
        frameworks: ['qunit'],
        plugins: ['karma-qunit'],
        files: [
            REQUIRE,
            REQUIRE_ADAPTER,
            '*.js'
        ]
    });
};