import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { ToggleStateless as Toggle } from '@atlaskit/toggle';

class SmartToggle extends PureComponent {
  static propTypes = {
    isDefaultChecked: PropTypes.bool,
  }

  static defaultPrpps = {
    isDefaultChecked: false,
  }

  state = {
    isChecked: this.props.isDefaultChecked,
  }

  onChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <Toggle
        {...this.props}
        isChecked={this.state.isChecked}
        onChange={this.onChange}
      />
    );
  }
}

export default (
  <div>
    <SmartToggle />
    <SmartToggle size="large" />
  </div>
);
