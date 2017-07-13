import * as React from 'react';
import { PureComponent } from 'react';

export default class Em extends PureComponent<{}, {}> {
  render() {
    return <em>{this.props.children}</em>;
  }
}
