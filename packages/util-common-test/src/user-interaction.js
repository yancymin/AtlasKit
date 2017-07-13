import 'custom-event-polyfill';
import keyCode from 'keycode';

function sendKeyEvent(key, { eventProperties, target }, type) {
  const event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
  });
  Object.assign(event, eventProperties);
  event.keyCode = keyCode(key);
  target.dispatchEvent(event);
}

/**
 * Simulate a user's keydown input
 * @param key – the key to press, will be passed to keycode
 * @param options {Object} – options for the event.
 * @param options.target – a DOM element to trigger the event on. Default:triggered on the document.
 * @param options.eventProperties {Object} – properties to assign to the event (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * @ignore
 * */
export function keydown(key, { eventProperties = {}, target = document } = {}) {
  sendKeyEvent(key, { eventProperties, target }, 'keydown');
}

/**
 * Simulate a user's keyup input
 * @param key – the key to press, will be passed to keycode
 * @param options {Object} – options for the event.
 * @param options.target – a DOM element to trigger the event on. Default:triggered on the document.
 * @param options.eventProperties {Object} – properties to assign to the event (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * @ignore
 */
export function keyup(key, { eventProperties = {}, target = document } = {}) {
  sendKeyEvent(key, { eventProperties, target }, 'keyup');
}

/**
 * Simulate a user's keypress input
 * @param key – the key to press, will be passed to keycode
 * @param options {Object} – options for the event.
 * @param options.target – a DOM element to trigger the event on. Default:triggered on the document.
 * @param options.eventProperties {Object} – properties to assign to the event (see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
 * @ignore
 */
export function keypress(key, { eventProperties = {}, target = document } = {}) {
  sendKeyEvent(key, { eventProperties, target }, 'keypress');
}
