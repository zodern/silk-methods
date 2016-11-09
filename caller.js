module.exports = function caller(methods, message, ws) {
  var id = message.id;
  var arg = message.arg;
  var name = message.method;
  var returnValue;
  let handledError = false;
  let async = false;
  let args = [arg];

  if (!(name in methods)) {
    ws.write({
      id: id,
      error: 'not-found'
    });
    return;
  }

  let context = {
    error(errorMessage, description, code) {
      ws.write({
        id: id,
        error: {
          errorMessage,
          description,
          code
        }
      });

      console.log('context.error');

      this.handledError = true;
    }
  };

  async = methods[name].length === 2;
  if (async) {
    args.push(function done(err, value) {
      if (err) {

      }
    });
  }
  try {
    returnValue = methods[name].apply(context, args);
  } catch (e) {
    if (!handledError) {
      ws.write({
        id: id,
        error: 'general-error'
      });

      return;
    }
  }

  if (async === false) {
    ws.write({
      id: id,
      result: returnValue
    });
  }
};
