import { ReactWrapper } from 'enzyme';

const primaryButton: number = 0;

export const dispatchWindowMouseEvent = (
  eventName: string,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
): MouseEvent => {
  const event = new window.MouseEvent(eventName, {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX,
    clientY,
    button,
  });
  window.dispatchEvent(event);
  return event;
};

export const dispatchWindowKeyDownEvent = (
  key: string,
): KeyboardEvent => {
  const event = new window.KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key,
  });
  window.dispatchEvent(event);
  return event;
};

export const mouseEvent = (
  eventName: string,
  wrapper: ReactWrapper<any>,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
  options?: Object = {},
): void => wrapper.simulate(eventName, { button, clientX, clientY, ...options });

export const liftWithMouse = (
  wrapper: ReactWrapper<any>,
  clientX?: number = 0,
  clientY?: number = 0,
  button?: number = primaryButton,
  options?: Object = {},
): void =>
  wrapper.simulate('mousedown', { button, clientX, clientY, ...options });

export const withKeyboard = (key: string): Function =>
  (wrapper: ReactWrapper<any>, options?: Object = {}) =>
    wrapper.simulate('keydown', { key, ...options });
