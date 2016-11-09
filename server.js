var Primus = require('primus');
var caller = require('./caller');


function Server(httpServer) {
  this.httpServer = httpServer;
  this._methods = {};
}

Server.prototype = {
  add(methods) {
    for (var method in methods) {
      if (method in this._methods) {
        console.log(method + ' has already been added.');
      }
      this._methods[method] = methods[method];
    }
  },
  _call(message, ws) {
    caller(this._methods, message, ws);
  }
};

module.exports = Server;
