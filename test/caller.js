let expect = require('chai').expect;
let caller = require('../caller');

describe('Caller', () => {
  it('should call method', (done) => {
    const methods = {
      test() {
        done();
      }
    };

    caller(methods, {
      id: 1,
      method: 'test'
    },
      { write: {} });
  });

  it('should handle nonexistent method', (done) => {
    let ws = {
      write(message) {
        expect(message).to.deep.equal({
          id: 1,
          error: {
            message: 'not-found',
            code: null,
            description: null
          },
          result: null
        });
        done();
      }
    };

    caller({}, {
      id: 1,
      method: 'nonexistent'
    },
      ws);
  });
  it('should handle method sync general error', (done) => {
    let methods = {
      'syncError'() {
        throw new Error('test');
      }
    };

    let ws = {
      write(message) {
        expect(message).to.deep.equal({
          id: 1,
          error: {
            message: 'general-error',
            description: null,
            code: null
          },
          result: null
        });
        done();
      }
    };

    caller(methods, {
      id: 1,
      method: 'syncError'
    }, ws);
  });
  it('should handle sync context.error', (done) => {
    const methods = {
      'syncError'() {
        this.error('specific-error', 'desc', 1);
      }
    };

    let ws = {
      write(message) {
        // console.log('message', JSON.stringify(message));

        try {
          expect(message).to.deep.equal({
            id: 1,
            error: {
              message: 'specific-error',
              description: 'desc',
              code: 1
            },
            result: null
          });
        } catch (e) {
          console.log(e);
        }
        done();
      }
    };

    caller(methods, {
      id: 1,
      method: 'syncError'
    },
      ws);
  });
  it('should pass arg and return value', (done) => {
    let ws = {
      write(message) {
        expect(message).to.deep.equal({
          id: 1,
          result: 'value'
        });

        done();
      }
    };

    const methods = {
      'echo'(text) {
        return text;
      }
    };

    caller(methods, {
      method: 'echo',
      arg: 'value',
      id: 1
    },
      ws);
  });
});
