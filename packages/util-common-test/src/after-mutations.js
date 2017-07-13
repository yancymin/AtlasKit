/**
 * @description Runs a list of functions, pausing between each one to ensure the component
   has had time to re-render.
   Ensure that you pass `done` into the test and that you call it at the end
   as this will make your tests asyncronous.
 * @param {Function} fn... A list of functions to run in order.
 *                    Each function is passed the return value of the last function
 *                    (except for the last)
 * @example @js it('should respond to prop changes', (done) => {
 *    afterMutations(
 *      () => expect(component).to.be.in.some.state,
 *      () => props(component, {propName, propValue}),
 *      () => expect(component).to.be.in.another.state,
 *      () -> props(component, {propName, anotherValue}),
 *      () => expect(component).to.be.in.another.another.state,
 *      done
 *    );
 *  });
 * @ignore
 */
function afterMutations(...fns) {
  setTimeout(() => {
    const fn = fns.shift();
    const isLastFn = fns.length === 0;
    if (typeof fn === 'function') {
      afterMutations.ret = isLastFn ? fn() : fn(afterMutations.ret);
    }
    if (!isLastFn) {
      afterMutations(...fns);
    }
  }, 1);
}

export default afterMutations;
