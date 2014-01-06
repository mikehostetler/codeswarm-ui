var static = require('node-static');

var servers = [new static.Server(__dirname + '/public')];


// addDir

exports.addDir = addDir;

function addDir(dir) {
  servers.unshift(new static.Server(dir));
}

// serve

exports.serve = serve;

function serve(req, res, cb) {
  var serverIndex = 0;
  var lastError;
  tryServe();

  function tryServe() {
    var server = servers[serverIndex];
    if (! server)
      cb(lastError);
    else {
      server.serve(req, res, triedServing);
    }
  }

  function triedServing(err) {
    if (err) {
      lastError = err;
      serverIndex ++;
      tryServe();
    } else cb();
  }
}

