var MethodServer = require('../').Server;
var http = require('http');
var expect = require('chai').expect;

describe('Server', () => {
  let server;
  let methodsServer;
  beforeEach(() => {
    server = http.createServer();
    methodsServer = new MethodServer(server);
  });
  it('add methods', () => {
    methodsServer.add({
      'a'() {

      }
    });
    methodsServer.add({
      'b'() {

      },
      'c'() {

      }
    });

    var result = Object.keys(methodsServer._methods);
    expect(result).to.deep.equal(['a', 'b', 'c']);
  });
});
