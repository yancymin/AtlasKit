import React, { PureComponent, PropTypes } from 'react';

import FieldBaseStateless from './Stateless';
//
const ON_BLUR_KEY = 'onBlurKey';
const ON_CONTENT_BLUR_KEY = 'onContentBlurKey';

function waitForRender(cb) {
  // Execute the callback after any upcoming render calls in the execution queue
  setTimeout(cb, 0);
}

export default class FieldBase extends PureComponent {
  static propTypes = {
    /** focus the element when initially rendered */
    defaultIsFocused: PropTypes.bool,
    /** focus event handler */
    onFocus: PropTypes.func,
    /** blur event handler */
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    defaultIsFocused: false,
    onFocus: () => {},
    onBlur: () => {},
  }

  state = {
    isFocused: this.props.defaultIsFocused,
    isDialogFocused: false,
    shouldIgnoreNextDialogBlur: false,
  }

  onFocus = (e) => {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
    // Escape from a possible race-condition when blur and focus happen one by one
    // (otherwise the dialog might be left closed)
    this.cancelSchedule(ON_BLUR_KEY);
  }

  onBlur = (e) => {
    // Because the blur event fires before the focus event, we want to make sure that we don't
    // render and close the dialog before we can check if the dialog is focused.
    this.reschedule(ON_BLUR_KEY, () => this.setState({ isFocused: false }));
    this.props.onBlur(e);
  }

  onContentFocus = () => {
    if (this.state.isDialogFocused) {
      // If we are tabbing between two elements in the warning dialog, we need to prevent the
      // dialog from closing.
      this.setState({ shouldIgnoreNextDialogBlur: true });
    } else {
      this.setState({ isDialogFocused: true });
    }

    // Escape from a possible race-condition when blur and focus happen one by one
    // (otherwise the dialog might be left closed)
    this.cancelSchedule(ON_CONTENT_BLUR_KEY);
  }

  onContentBlur = () => {
    waitForRender(() => {
      if (this.state.shouldIgnoreNextDialogBlur) {
        // Ignore the blur event if we are still focused in the dialog.
        this.setState({ shouldIgnoreNextDialogBlur: false });
      } else {
        this.setState({ isDialogFocused: false });
      }
    });
  }

  cancelSchedule(key) {
    this.timers = this.timers || {};
    if (this.timers[key]) {
      clearTimeout(this.timers[key]);
      delete this.timers[key];
    }
  }

  reschedule(key, callback) {
    // Use reschedule (not just schedule) to avoid race conditions when multiple blur events
    // happen one by one.
    this.timers = this.timers || {};
    this.cancelSchedule(key);
    this.timers[key] = setTimeout(() => {
      callback();
      this.cancelSchedule(key);
    }, 0);
  }

  render() {
    const { isFocused, isDialogFocused } = this.state;
    return (
      <FieldBaseStateless
        {...this.props}
        isDialogOpen={isFocused || isDialogFocused}
        isFocused={isFocused}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onDialogFocus={this.onContentFocus}
        onDialogBlur={this.onContentBlur}
      />
    );
  }
}
