import sinon from 'sinon';
import subscribe from '../../src/watch-scroll-top';

describe('watch scroll top', () => {
  let unsubscribeManaged;

  const triggerScroll = (el, scrollTop) => {
    el.scrollTop = scrollTop;
    // currently not working with new CustomEvent() so using an older syntax
    const event = document.createEvent('Event');
    event.initEvent('scroll', true, true);
    el.dispatchEvent(event);
  };

  const startManagedSubscription = (el, fn) => {
    unsubscribeManaged = subscribe(el, fn);
  };

  beforeAll(() => { // eslint-disable-line no-undef
    requestAnimationFrame.reset();
  });

  afterEach(() => {
    requestAnimationFrame.reset();
    if (unsubscribeManaged) {
      unsubscribeManaged();
      unsubscribeManaged = null;
    }
  });

  it('should execute the callback immediately with the current scroll', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');
    el.scrollTop = 500;

    startManagedSubscription(el, callback);

    expect(callback.calledWith(500)).toBe(true);
  });

  it('should execute the callback when the user scrolls', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    startManagedSubscription(el, callback);
    triggerScroll(el, 200);
    requestAnimationFrame.step();

    expect(callback.calledWith(200)).toBe(true);
  });

  it('should execute the callback if the scroll changes', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    startManagedSubscription(el, callback);

    triggerScroll(el, 200);
    requestAnimationFrame.step();

    expect(callback.secondCall.calledWith(200)).toBe(true);

    triggerScroll(el, 500);
    requestAnimationFrame.step();

    expect(callback.thirdCall.calledWith(500)).toBe(true);
  });

  it('should not execute the callback if the scroll has not changed', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    startManagedSubscription(el, callback);

    triggerScroll(el, 200);
    requestAnimationFrame.step();

    expect(callback.callCount).toBe(2);

    triggerScroll(el, 200);
    requestAnimationFrame.step();

    expect(callback.callCount).toBe(2);
  });

  it('should wait for an animation frame before triggering the returning the scrollTop', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');
    el.scrollTop = 0;

    startManagedSubscription(el, callback);

    triggerScroll(el, 200);
    triggerScroll(el, 300);
    triggerScroll(el, 400);
    requestAnimationFrame.step();

    expect(callback.firstCall.calledWith(0)).toBe(true);
    expect(callback.secondCall.calledWith(400)).toBe(true);
  });

  it('should return a function that cancels the subscription', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    const unsubscribe = subscribe(el, callback);

    expect(callback.callCount).toBe(1);

    unsubscribe();

    // would normally trigger the scroll handler
    triggerScroll(el, 400);
    requestAnimationFrame.step();

    expect(callback.callCount).toBe(1);
  });

  it('should cancel any pending animation frames on unsubscribe', () => {
    const callback = sinon.stub();
    const el = document.createElement('div');

    const unsubscribe = subscribe(el, callback);

    expect(callback.callCount).toBe(1);

    // will create an animation frame
    triggerScroll(el, 400);
    // unsubscribe before frame is executed
    unsubscribe();
    // tick any frames
    requestAnimationFrame.step();

    expect(callback.callCount).toBe(1);
  });
});
