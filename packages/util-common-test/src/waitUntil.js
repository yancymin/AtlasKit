/**
 * @description waitUntil is a testHelper to wait an arbitrary amount of time until a
 * condition is met.
 * It takes in a function (the condition of when to keep running) and returns a promise.
 * This is useful when you want to make changes to a component and then ensure that it has been
 * rendered before performing any tests.
 * Within tests this is safe as they will automatically fail after 2000ms of not responding.
 * @param fn function that must return true when it is time for the promise to continue
 * @param timeout maximum amount of time waitUntil should wait before quiting (ms).
 * @param step amount of time to wait between checks of the `fn` condition (ms).
 * @example @js const elem = document.querySelector('.fixture').firstChild;
 *  // We put name our condition function so we can re-use it a couple of times
 *  const elemRenderedImgTag = () => (elem.shadowRoot.querySelector('img') !== null);
 *
 *  // check that no image is rendered before we start
 *  expect(elemRenderedImgTag()).to.equal(false);
 *
 *  // set a property to make the image be rendered
 *  elem.showImage = true;
 *
 *  // now wait until we can see the image rendered
 *  waitUntil(elemRenderedImgTag).then(() => (expect(elemRenderedImgTag()).to.equal(true)));
 *
 *  // alternatively, we might want to do more things in the .then call, even chain more waitUntils
 *
 *  waitUntil(elemRenderedImgTag).then(() => {
 *    expect(elemRenderedImgTag()).to.equal(true);
 *    doSomeMoreStuff(elem);
 *    return waitUntil(someOtherConditionIsTrue());
 *  }).then(() => {
 *    // Now we can do more stuff in here!
    });
 *
 *  // You can also set a maximum amount of time to wait (and how long to wait in between attempts)
 *  waitUntil(elemRenderedImgTag, 1000, 10).then(() =>
 *  (expect(elemRenderedImgTag()).to.equal(true)));
 *  // this will check if the img was rendered every 10ms for up to a total of ~1 second.
 * @ignore
 */
function waitUntil(fn, timeout = 2000, step = 1) {
  let iteration = 0;
  return new Promise((resolve, reject) => {
    try {
      ((function testFn() {
        if (fn()) {
          resolve();
          return;
        }
        // making sure that this will not fall into the endless loop
        iteration++;
        if (iteration * step <= timeout) {
          setTimeout(testFn, step);
        } else {
          reject('timeout');
        }
      })());
    } catch (e) {
      reject(e);
    }
  });
}

export default waitUntil;
