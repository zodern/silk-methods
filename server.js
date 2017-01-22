var Primus = require('primus');
var caller = require('./caller');


function Server(httpServer) {
  this.httpServer = httpServer;
  this._primus = new Primus(httpServer, {
    pathname: 'silk-methods'
  });
  this._methods = {};

  this._primus.on('connection', (spark) => {
    spark.on('data', (data) => {
      console.log(data);
    });
  });
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
