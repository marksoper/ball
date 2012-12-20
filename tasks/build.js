
module.exports = function(grunt) {

  grunt.registerTask("build", function(buildType) {
    buildType = buildType || "debug";
    grunt.log.writeln("running build task");
  });


};