import service from './service';

/**
 * Returns a sequence of tracking analytics event and the provided function.
 *
 * Usage:
 *
 *     let doSomething = function(a, b) { // ... }
 *     doSomething = trackAndInvoke('atlassian.editor.dosomething', doSomething);
 *
 *     doSomething(); // this will send analytics event and call the original function
 *
 */
export default function trackAndInvoke(analyticsEventName: string, fn: (...args: any[]) => any) {
  return (...args: any[]) => {
    const result = fn(...args);
    if (result) {
      service.trackEvent(analyticsEventName);
    }
    return result;
  };
}
