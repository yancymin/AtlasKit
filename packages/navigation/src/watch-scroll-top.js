import memoizeOne from 'memoize-one';

export default (el, fn) => {
  let frameId = null;
  const memoizedFn = memoizeOne(fn);

  // When a scroll occurs:
  // 1. If already waiting for an animation frame - do nothing.
  // 2. Request an animation frame to publish updates
  const onScroll = () => {
    if (frameId) {
      return;
    }
    frameId = requestAnimationFrame(() => {
      // only call `fn` if scrollTop has actually changed
      memoizedFn(el.scrollTop);
      frameId = null;
    });
  };

  // fire the callback immediatly with the initial value
  memoizedFn(el.scrollTop);

  el.addEventListener('scroll', onScroll, { passive: true });

  const unsubscribe = () => {
    // clear any frames that are still around
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
    el.removeEventListener('scroll', onScroll);
  };

  return unsubscribe;
};
