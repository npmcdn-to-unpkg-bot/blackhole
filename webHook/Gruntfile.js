
module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dist: {
        src: ['js/app.js', 'js/barChart.js', 'js/lineChart.js'],
        dest: '/var/www/html/full.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);

};



