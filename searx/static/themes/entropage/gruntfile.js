module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/searx_src/*.js'],
        dest: 'js/searx.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! oscar/searx.min.js | <%= grunt.template.today("dd-mm-yyyy") %> | https://github.com/asciimoo/searx */\n'
      },
      dist: {
        files: {
          'js/searx.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'js/searx_src/*.js'],
      options: {
        reporterOutput: "",
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
        "pc-development": {
            options: {
              paths: ["less/logicodev"]
            },
            files: {
              "css/logicodev.min.css": "less/logicodev/oscar.less",
            }
        },
        "pc-production": {
            options: {
                paths: ["less/logicodev"],
                //banner: '/*! less/oscar/oscar.css | <%= grunt.template.today("dd-mm-yyyy") %> | https://github.com/asciimoo/searx */\n',
                cleancss: true
            },
            files: {
                    "css/logicodev.min.css": "less/logicodev/oscar.less",
                    }
        },
        "m-development": {
          options: {
            paths: ["less/m-logicodev"]
          },
          files: {
            "css/m-logicodev.min.css": "less/m-logicodev/oscar.less",
          }
        },
        "m-production": {
            options: {
                paths: ["less/m-logicodev"],
                //banner: '/*! less/oscar/oscar.css | <%= grunt.template.today("dd-mm-yyyy") %> | https://github.com/asciimoo/searx */\n',
                cleancss: true
            },
            files: {
              "css/m-logicodev.min.css": "less/m-logicodev/oscar.less",
            }
        },
    },
    watch: {
        scripts: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'concat', 'uglify']
        },
        pc_styles: {
          files: ['less/logicodev/**/*.less'],
          tasks: ['less:pc-development', 'less:pc-production']
        },
        mobile_styles: {
          files: ['less/m-logicodev/**/*.less'],
          tasks: ['less:m-development', 'less:m-production']
        },
        bootstrap_styles: {
            files: ['less/bootstrap/**/*.less'],
            tasks: ['less:bootstrap']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);

};
