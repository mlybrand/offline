var grunt = require("grunt");

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
        all: ['**/*.js'],
        options: {
            ignores: ['node_modules/**/*.js']
        }
    }
});

grunt.loadNpmTasks('grunt-npm-install');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.registerTask('default', ['npm-install', 'jshint']);