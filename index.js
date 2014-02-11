require('colors')
var fork   = require('child_process').fork;
var server = require('./server');
var config = require('./config');

if (require.main == module) {
  var port = process.env.PORT || 1337;
  server.listen(port, listening);
}

function listening() {
  console.log('CodeSwarm Web server listening on port %d', server.address().port);
}

var devMode = (process.env.NODE_ENV || 'development') == 'development';
if (devMode) {
  console.log('development mode detected; launching watcher...');
  launchWatcher();
}

var watcher;
function launchWatcher() {
  if (! exiting) {
    watcher = fork(__dirname + '/watch');
    watcher.once('exit', watcherExited);
  }
}

function watcherExited() {
  if (! exiting) {
    console.log('Launcher exited, restarting...'.red);
    launchWatcher();
  }
}

var exiting = false;
process.once('SIGINT', function() {
  exiting = true;
  if (watcher) watcher.kill();
  process.exit();
});


// Exports

module.exports   = server;

/// addDir
server.addDir    = addDir;
var staticAddDir = require('./static').addDir;
var baseAddDir   = require('./base').addDir;

function addDir(d) {
  staticAddDir(d);
  baseAddDir(d);
}

/// config

server.config = configure;

function configure(options) {
  config.override(options);
}
