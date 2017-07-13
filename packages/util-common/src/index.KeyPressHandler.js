import keyCode from 'keycode';
import createError from 'create-error';

const KeyInvalidError = createError('KeyInvalidError');
const CallbackInvalidError = createError('CallbackInvalidError');

function keyInvalidError(key) {
  return new KeyInvalidError(`Given key "${key}" is not valid`);
}
/**
* A general class to deal with key activations
*
*/
class KeyPressHandler {

  /**
  * Adds a new keypress handler
  *
  * @constructor
  * @param {String} key A named key. Case insensitive.
  * @param {Function} callback A callback function to invoke if the given key was activated.
  *                            The callback is passed the event object.
  * @param {Node} [elem]  The element to listen for the key activation.
  *                       Defaults to document if none given.
  */
  constructor(key, callback, elem) {
    this.keyListeners = {};
    const code = keyCode(key);
    if (typeof code === 'undefined') {
      throw keyInvalidError(key);
    }
    if (typeof callback !== 'function') {
      throw new CallbackInvalidError();
    }
    this.keyListeners[code] = callback;
    this.elem = elem || document;
    this.listener = (e) => {
      if (this.keyListeners[e.keyCode]) {
        this.keyListeners[e.keyCode](e);
      }
    };

    this.elem.addEventListener('keydown', this.listener);
  }

  /**
  * Adds or replaces a key that is listened for.
  *
  * @param {String} key A named key. Case insensitive. Replaces any previous listened key.
  * @param {Function} callback The callback function to invoke.
  */
  add(key, callback) {
    const code = keyCode(key);
    if (typeof code === 'undefined') {
      throw keyInvalidError(key);
    }

    if (typeof callback !== 'function') {
      throw new CallbackInvalidError();
    }
    this.keyListeners[code] = callback;
  }

  /**
  * Removes a key from the list of listened keys.
  * Or removes the whole listener if no key given.
  *
  * @param {String} [key] A named key. Case insensitive. If none given, event listener is removed.
  */
  destroy(key) {
    if (!key) {
      // Don't change this to {}, otherwise a destroyed KeyPressHandler can be "recycled"
      // without having an event listener attached
      this.keyListeners = undefined;
      this.elem.removeEventListener('keydown', this.listener);
    } else {
      delete this.keyListeners[keyCode(key)];
    }
  }
}

export default KeyPressHandler;
export { KeyInvalidError, CallbackInvalidError };
