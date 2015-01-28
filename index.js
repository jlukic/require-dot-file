var
  fs              = require('fs'),
  path            = require('path')
;

// walks parent folders until a dot file is found
module.exports = function(file, directory) {
  var
    requirePath,
    walk = function(directory) {

      if( fs.existsSync(directory + file) ) {
        // found file
        requirePath = path.normalize(directory + file);
        return;
      }
      else {
        // reached file system root, let's stop
        if(path.resolve(directory) == '/') {
          return;
        }
        // otherwise recurse
        walk(directory + '../', file);
      }
    }
  ;
  // start walk from current directory
  walk(__dirname + '/');

  if(!requirePath) {
    throw new Error('Unable to find: ' + file);
  }

  require(requirePath);
  return true;

};