import keyCode from 'keycode';
import sinon from 'sinon';
import { keydown, keyup, keypress } from '../../src';

describe('Keyboard interaction', () => {
  const utils = { keydown, keyup, keypress };
  ['keydown', 'keyup', 'keypress'].forEach((type) => {
    const key = utils[type];
    describe(`(${type}) with a document event bound`, () => {
      let spy;
      beforeEach(() => {
        spy = sinon.spy();
        document.addEventListener(type, spy);
      });

      afterEach(() => {
        document.removeEventListener(type, spy);
      });

      it(`can fire ${type} events`, () => {
        key('[');
        expect(spy.callCount).toBe(1);
      });
      it('meta keys can be specified', () => {
        key('[', {
          eventProperties: {
            shiftKey: true,
          },
        });
        expect(spy.getCall(0).args[0].shiftKey).toBe(true);
      });
      it('key takes precedence over keycode event property', () => {
        key('A', {
          eventProperties: {
            keyCode: keyCode('Z'),
          },
        });
        expect(spy.getCall(0).args[0].keyCode).toBe(keyCode('A'));
      });

      it('meta keys are initially off', () => {
        key('[');
        expect(!!spy.getCall(0).args[0].shiftKey).toBe(false);
        expect(!!spy.getCall(0).args[0].metaKey).toBe(false);
        expect(!!spy.getCall(0).args[0].altKey).toBe(false);
        expect(!!spy.getCall(0).args[0].ctrlKey).toBe(false);
      });

      describe('with a div in the DOM', () => {
        let div;
        beforeEach(() => {
          div = document.createElement('div');
          document.body.appendChild(div);
        });

        afterEach(() => {
          document.body.removeChild(div);
        });

        it('the div can be the target of the event', () => {
          key('[', {
            target: div,
          });
          expect(spy.getCall(0).args[0].target).toBe(div);
        });
      });
    });
  });
});
