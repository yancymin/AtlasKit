import sinon from 'sinon';

import { waitUntil } from '../../src';

describe('waitUntil', () => {
  it('should call .then after condition is met', (done) => {
    let val = 0;
    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1;
    waitUntil(() => val === 1).then(() => {
      expect(val).toBe(1);
      done();
    });
  });

  it('should call the passed in function', (done) => {
    let val = 0;

    function valEqualsOne() {
      return val === 1;
    }

    const spy = sinon.spy(valEqualsOne);

    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1;
    waitUntil(spy).then(() => {
      expect(spy.called).toBe(true);
      done();
    });
  });

  it('should be able to chain calls', (done) => {
    let val = 0;

    setTimeout(() => (val += 1), 10);

    waitUntil(() => (val === 1))
      .then(() => {
        expect(val).toBe(1);

        setTimeout(() => (val += 1));

        return waitUntil(() => (val === 2));
      })
      .then(() => {
        expect(val).toBe(2);
        done();
      });
  });

  it('should reject after a certain timeout', (done) => {
    let val = 2;
    // Change the value of val in 10ms time
    setTimeout(() => (val += 1), 10);
    // now wait until val = 1, which will never happen;
    waitUntil(() => (val === 1), 100, 10).then(() => {}, (e) => {
      expect(e).toBe('timeout');
      done();
    });
  });
});
