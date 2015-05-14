var grunt = require("grunt");

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
        all: ['**/*.js'],
        options: {
            ignores: ['node_modules/**/*.js']
        }
    },
    mochaTest: {
        test: {
            src: ['test/**/*.js']
        }
    }
});

grunt.loadNpmTasks('grunt-npm-install');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-mocha-test');

grunt.registerTask('default', ['npm-install', 'test']);
grunt.registerTask('test', ['jshint', 'mochaTest']);