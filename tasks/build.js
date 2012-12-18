
module.exports = function(grunt) {
    
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

  grunt.registerTask("build", function(buildType) {
    buildType = buildType || "debug";

  });

};