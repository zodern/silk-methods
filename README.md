# silk-methods
Bidirectional RPC for node.js

Example
```js

var MethodServer = require('silk-methods).Server;
var http = require('http');

var server = http.createServer();

var methodsServer = new MethodServer(server);

methodsServer.add({
  'echo' (text) {
    return text;
  },
  'async' ({data1, data2}, done) {
    someAsyncFunction(data1, function (err, result) {
      done(err, result);
    });
  },
  'syncGeneralError' () {
    throw new Error('test');
  },
  'syncError'() {
    this.error('test');
  }
});

```


