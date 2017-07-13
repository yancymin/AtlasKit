import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ToggleStateless from './ToggleStateless';

export default class Toggle extends PureComponent {
  static propTypes = {
    /** Callback to be called when native 'change' event happens internally. */
    onChange: PropTypes.func,
    /** Whether the toggle is initially checked or not */
    isDefaultChecked: PropTypes.bool,
  }

  static defaultProps = {
    isDefaultChecked: false,
    onChange: () => {},
  }

  state = {
    isChecked: this.props.isDefaultChecked,
  }

  onChange = (e) => {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.onChange(e);
  }

  render() {
    return (
      <ToggleStateless
        {...this.props}
        isChecked={this.state.isChecked}
        onChange={this.onChange}
      />
    );
  }
}
