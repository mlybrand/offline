var grunt = require("grunt");

grunt.loadNpmTasks('grunt-npm-install');

grunt.registerTask('default', ['npm-install']);