var fork   = require('child_process').fork;
var server = require('./server');

module.exports = server;

if (process.main == module) {
  server.listen(port, listening);
  var port = process.env.PORT || 1337;
}

function listening() {
  console.log('BrowserSwarm Web server listening on port %d', server.address().port);
}

var devMode = (process.env.NODE_ENV || 'development') == 'development';
if (devMode) launchWatcher();

var watcher;
function launchWatcher() {
  console.log('development mode detected; launching watcher...');
  if (! exiting) {
    watcher = fork('./watch');
    watcher.once('exit', launchWatcher);
  }
}

var exiting = false;
process.once('SIGINT', function() {
  exiting = true;
  if (watcher) watcher.kill();
  process.exit();
});