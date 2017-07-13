import keyCode from 'keycode';
import 'custom-event-polyfill';
import { afterMutations } from '@atlaskit/util-common-test';
import sinon from 'sinon';

import { name } from '../../package.json';
import KeyPressHandler,
      { KeyInvalidError, CallbackInvalidError } from '../../src/index.KeyPressHandler';

describe(name, () => {
  describe('KeyPressHandler', () => {
    let keyPressEvent;
    let keyPressCallback;
    let keyPressObj;

    beforeEach(() => {
      keyPressEvent = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: true,
      });
      keyPressEvent.keyCode = keyCode('ESCAPE');
      keyPressCallback = sinon.spy();
      keyPressObj = new KeyPressHandler('ESCAPE', keyPressCallback);
    });

    it('should create an event listener when created', (done) => {
      document.dispatchEvent(keyPressEvent);
      afterMutations(
        () => expect(keyPressCallback.called).toBe(true),
        done
      );
    });

    it('should be possible to add an additional event', (done) => {
      keyPressEvent.keyCode = keyCode('CTRL');
      keyPressObj.add('CTRL', keyPressCallback);
      document.dispatchEvent(keyPressEvent);

      afterMutations(
        () => expect(keyPressCallback.called).toBe(true),
        done
      );
    });

    it('correct callback should be called', (done) => {
      const newCallback = sinon.spy();
      keyPressEvent.keyCode = keyCode('CTRL');
      keyPressObj.add('CTRL', newCallback);
      document.dispatchEvent(keyPressEvent);

      afterMutations(
        () => {
          expect(keyPressCallback.called).toBe(false);
          expect(newCallback.called).toBe(true);
        },
        done
      );
    });

    it('should pass on the event object', (done) => {
      document.dispatchEvent(keyPressEvent);
      afterMutations(
        () => {
          expect(keyPressCallback.called).toBe(true);
          expect(keyPressCallback.calledWith(keyPressEvent)).toBe(true);
        },
        done
      );
    });

    it('should be possible to remove an event', (done) => {
      keyPressObj.destroy('ESCAPE');

      document.dispatchEvent(keyPressEvent);
      afterMutations(
        () => expect(keyPressCallback.called).toBe(false),
        done
      );
    });

    it('should be possible to remove all events', (done) => {
      const newCallback = sinon.spy();
      keyPressObj.add('CTRL', newCallback);
      keyPressObj.destroy();
      document.dispatchEvent(keyPressEvent);
      keyPressEvent.keyCode = keyCode('CTRL');
      document.dispatchEvent(keyPressEvent);

      afterMutations(
        () => {
          expect(keyPressCallback.called).toBe(false);
          expect(newCallback.called).toBe(false);
        },
        done
      );
    });

    describe('error cases', () => {
      it('should throw if the given key is invalid', () => {
        expect(() => new KeyPressHandler('FOOBAR', () => null)).toThrow(KeyInvalidError);
        expect(() => keyPressObj.add('FOOBAR', () => null)).toThrow(KeyInvalidError);
      });

      it('should throw if the given callback is invalid', () => {
        expect(() => new KeyPressHandler('ESCAPE', null)).toThrow(CallbackInvalidError);
        expect(() => keyPressObj.add('ESCAPE', null)).toThrow(CallbackInvalidError);
      });
    });
  });
});
