var
  fs              = require('fs'),
  path            = require('path')
;

// walks parent folders until a dot file is found
module.exports = function(file, directory) {

  var
    requirePath,
    walk = function(directory) {
      var
        currentPath = path.normalize( path.join(directory, file) )
      ;
      if( fs.existsSync(currentPath) ) {
        // found file
        requirePath = path.normalize(currentPath);
        return;
      }
      else {
        // reached file system root, let's stop
        if(path.resolve(directory) == path.sep) {
          return;
        }
        // otherwise recurse
        walk(directory + '..' + path.sep, file);
      }
    }
  ;

  // start walk from outside require-dot-files directory
  directory = directory || __dirname + '..' + path.sep;

  walk(directory);

  if(!requirePath) {
    // throw new Error('Unable to find: ' + file);
    return false;
  }
  return require(requirePath);

};