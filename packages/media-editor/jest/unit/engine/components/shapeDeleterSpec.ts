import {expect} from 'chai';
import * as sinon from 'sinon';

import {DefaultShapeDeleter} from '../../../../src/engine/components/shapeDeleter';

describe('MediaEditor DefaultShapeDeleter', () => {
  let textArea: HTMLTextAreaElement;
  let shapeDeleter: DefaultShapeDeleter;
  let signalSpy;

  beforeEach(() => {
    textArea = document.createElement('textarea');
    shapeDeleter = new DefaultShapeDeleter(textArea);

    signalSpy = sinon.spy();
    shapeDeleter.deleteShape.listen(signalSpy);
  });

  afterEach(() => {
    shapeDeleter.unload();
  });

  it('should not emit deleteShape if deletion is not allowed', () => {
    textArea.dispatchEvent(createEventWithKey('Delete'));

    expect(signalSpy.notCalled).to.equal(true);
  });

  it('should emit deleteShape when Delete key is passed and deletion is allowed', () => {
    shapeDeleter.deleteEnabled();
    textArea.dispatchEvent(createEventWithKey('Delete'));

    expect(signalSpy.calledOnce).to.equal(true);
  });

  it('should emit deleteShape when Backspace key is passed and deletion is allowed', () => {
    shapeDeleter.deleteEnabled();
    textArea.dispatchEvent(createEventWithKey('Backspace'));

    expect(signalSpy.calledOnce).to.equal(true);
  });

  it('should emit deleteShape when key #46 (delete) is passed and deletion is allowed', () => {
    shapeDeleter.deleteEnabled();
    textArea.dispatchEvent(createEventWithWhich(46));

    expect(signalSpy.calledOnce).to.equal(true);
  });

  it('should emit deleteShape when key #8 (backspace) is passed and deletion is allowed', () => {
    shapeDeleter.deleteEnabled();
    textArea.dispatchEvent(createEventWithWhich(8));

    expect(signalSpy.calledOnce).to.equal(true);
  });

  it('should not emit deleteShape when PageDown key is passed and deletion is allowed', () => {
    shapeDeleter.deleteEnabled();
    textArea.dispatchEvent(createEventWithKey('PageDown'));

    expect(signalSpy.calledOnce).to.equal(false);
  });

  it('should not emit deleteShape when key #37 (arrow left) is passed and deletion is allowed', () => {
    shapeDeleter.deleteEnabled();
    textArea.dispatchEvent(createEventWithWhich(37));

    expect(signalSpy.calledOnce).to.equal(false);
  });

  it('should not emit deleteShape if deletion was already disabled', () => {
    shapeDeleter.deleteEnabled();
    shapeDeleter.deleteDisabled();
    textArea.dispatchEvent(createEventWithKey('Delete'));

    expect(signalSpy.notCalled).to.equal(true);
  });

  const createEventWithKey = (key: string) => {
    if (document.createEvent) {
      const event = document.createEvent('Events');
      event.initEvent('keydown', true, true);
      event['key'] = key;
      return event;
    }

    return new KeyboardEvent('keydown', {key});
  };

  const createEventWithWhich = (which: number) => {
    if (document.createEvent) {
      const event = document.createEvent('Events');
      event.initEvent('keydown', true, true);
      event['which'] = which;
      return event;
    }

    const initializer: KeyboardEventInit = {};
    initializer['which'] = which;
    return new KeyboardEvent('keydown', initializer);
  };
});
