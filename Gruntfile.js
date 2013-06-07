'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('footable.jquery.json'),
        clean: {
            files: ['dist']
        },
        uglify: {
            all : {
                options: {
                    preserveComments: 'some',
                    mangle: {
                        except: [ "undefined" ]
                    }
                },
                files: {
                    'dist/footable.min.js': [ 'js/footable.js' ],
                    'dist/footable.filter.min.js': [ 'js/footable.js' ],
                    'dist/footable.paginate.min.js': [ 'js/footable.paginate.js' ],
                    'dist/footable.sort.min.js': [ 'js/footable.sort.js' ]
                }
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'js/.jshintrc'
                },
                src: ['js/**/*.js']
            }
        },
        less: {
            development: {
                files: {
                    "css/footable.core.css": "less/footable.core.less",
                    "css/footable.metro.css": "less/footable.metro.less",
                    "css/footable.standalone.css": "less/footable.standalone.less",
                    "css/footable.css": "less/*.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "css/footable.core.min.css": "less/footable.core.less",
                    "css/footable.metro.min.css": "less/footable.metro.less",
                    "css/footable.standalone.min.css": "less/footable.standalone.less",
                    "css/footable.min.css": "less/*.less"
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            },
            less: {
                files: 'less/*.less',
                tasks: ['less:development']
            }
        }
    });

    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task.
    grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'less']);

    // Test task
    grunt.registerTask('test', ['jshint']);

};
