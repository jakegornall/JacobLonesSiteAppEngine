module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto',
                    trace: true
                },
                files: {
                    "static/css/MainPageStyles.css": "src/sass/main.scss"
                }
            }
        },

        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass']
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: './static/js',
                    paths: {
                        "main" : "main",
                        "BandMemberModel": "./components/BandMemberModel",
                        "BandMembersCollection": "./components/BandMembersCollection",
                        "BandMembersView": "./components/BandMembersView",
                        "BandMemberView": "./components/BandMemberView"
                    },
                    generateSourceMaps: true,
                    include: ['main'],
                    out: './static/js/compiled/main.js'
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'requirejs']);

};
