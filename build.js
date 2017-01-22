var path = require('path');
var Primus = require('primus');
var fs = require('fs');



var files = [
  './client.js'
];

var code = primus.library();

files.forEach(function (file) {
  code += fs.openSync(path.resove(file));
});

fs.writeSync(path.resolve('./build/client.js'))
