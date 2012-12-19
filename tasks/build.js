
module.exports = function(grunt) {
    
  grunt.registerHelper("clean", function(path) {
    var fs = require('fs');
    grunt.file.recurse(path, function(abspath, rootdir, subdir, filename) {
      grunt.file.delete(abspath);
      grunt.log.writeln("abspath: " + abspath);
    });
  });

/*
  grunt.registerHelper("copyDir", function(sourcePath, destPath) {
   grunt.file.recurse(sourcePath, function callback(abspath, rootdir, subdir, filename) {
        var targetPath;
        if (subdir) {
          targetPath = osTarget + "/" + subdir + "/" + filename;
        } else {
          targetPath = osTarget + "/" + filename;
        }
        var contents = grunt.file.read(abspath);
        grunt.log.writeln("writing to: " + targetPath);
        grunt.file.write(targetPath, contents);
      });
  });

*/

  grunt.registerTask("build", function(buildType) {
    buildType = buildType || "debug";
    grunt.helper("clean", "dist");
  });


};