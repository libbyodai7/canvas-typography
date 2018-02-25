module.exports = function(grunt) {

  var globalConfig = {
        today: grunt.template.today("yyyy-mm-dd"),
        banner: '/*! <%= pkg.title %>, v<%= pkg.version %> (built <%= globalConfig.today %>) <%= pkg.homepage %> @preserve */\n'
      };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    globalConfig: globalConfig,
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {

    options: {
      banner: globalConfig.banner
    },

    dist: {
      files: {
        'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.config('concat', {
    options: {
      banner: globalConfig.banner + '(function(){\n\n',
      separator: '\n\n////////////////////////////////////////\n\n',
      footer: '\n\n})();',
    },
    dist: {
      files: {
        'dist/<%= pkg.name %>.js': [
          'src/Canvallax.js',
          'src/Utilities/**/*.js',
          'src/Elements/**/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
    scripts: {
      files: 'src/**/*.js',
      tasks: ['uglify'],
      options: { debounceDelay: 250 },
    }
  });

  grunt.registerTask('default', ['concat','uglify']);

};
