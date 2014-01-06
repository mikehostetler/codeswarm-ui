var extend = require('xtend');
var config = require('konphyg')(__dirname);

var strider = config('strider');
strider.url = '//' + strider.host;
if (strider.port) strider.url += ':' + strider.port;

exports = module.exports = {
  strider: strider
};

exports.override = override;

function override(options) {
  exports = extend(module.exports, options);
  exports.override = override;

  console.log('overridden config:', exports);
}