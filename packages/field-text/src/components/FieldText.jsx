import React, { PureComponent } from 'react';
import FieldTextStateless from './FieldTextStateless';

export { FieldTextStateless };

/* eslint-disable react/prop-types */
export default class extends PureComponent {
  static defaultProps = {
    onChange: () => {},
  }

  state = {
    value: this.props.value,
  }

  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  focus = () => {
    this.input.focus();
  }

  render() {
    return (
      <FieldTextStateless
        {...this.props}
        value={this.state.value}
        onChange={this.handleOnChange}
        ref={(fieldRef) => { this.input = fieldRef; }}
      />
    );
  }
}
