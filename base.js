var fs     = require('fs');
var hogan  = require('hogan.js');
var static = require('./static');
var config = require('./config');

var args = {
  config: config
};

var base;

function loadTemplate(path) {
  base = hogan.compile(fs.readFileSync(path, { encoding: 'utf8'} ));
}

loadTemplate(__dirname + '/public/index.html');


/// serveBase

function serveBase(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(base.render(args));
}


/// addDir

function addDir(d) {
  var templatePath = d + '/index.html';
  if (fs.existsSync(templatePath)) {
    loadTemplate(templatePath);
  }
}

/// Exports

exports = module.exports = serveBase;
exports.addDir = addDir;