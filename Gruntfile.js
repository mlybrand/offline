var grunt = require("grunt");

grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    bower: {
        install: {
            options: {
                copy: false
            }
        }
    },
    copy: {
        main: {
            files: [
                { cwd: 'bower_components/bootstrap/dist/', src: '**/*', dest: 'public/vendor', expand: true },
                { cwd: 'bower_components/jquery/dist/', src: '*', dest: 'public/vendor/js', expand: true },
                { cwd: 'bower_components/knockoutjs/dist/', src: 'knockout.js', dest: 'public/vendor/js', expand: true }
            ]
        }
    },
    jshint: {
        all: ['**/*.js'],
        options: {
            ignores: ['node_modules/**/*.js', 'bower_components/**/*.js', 'public/vendor/**/*.js' ]
        }
    },
    mochaTest: {
        test: {
            src: ['test/**/*.js']
        }
    }
});

grunt.loadNpmTasks('grunt-npm-install');
grunt.loadNpmTasks('grunt-bower-task');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-mocha-test');

grunt.registerTask('default', ['npm-install', 'bower:install', 'copy', 'test']);
grunt.registerTask('test', ['jshint', 'mochaTest']);