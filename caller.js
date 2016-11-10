module.exports = function caller(methods, message, ws) {
  var id = message.id;
  var arg = message.arg;
  var name = message.method;
  var returnValue;
  let handledError = false;
  let async = false;
  let args = [arg];

  function sendResult(result) {
    ws.write({
      id: id,
      result: result,
      error: null
    });
  }

  function sendError(errorMessage, description = null, code = null) {
    ws.write({
      id: id,
      result: null,
      error: {
        message: errorMessage,
        description,
        code
      }
    });
  }

  if (!(name in methods)) {
    sendError('not-found');
    return;
  }

  let context = {
    error(errorMessage, description, code) {
      handledError = true;
      sendError(errorMessage, description, code);
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
      sendError('general-error');
    }
  }

  if (async === false && !handledError) {
    ws.write({
      id: id,
      result: returnValue
    });
  }
};
