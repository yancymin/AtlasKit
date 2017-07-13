import * as React from 'react';
import { PureComponent } from 'react';

export default class Underline extends PureComponent<{}, {}> {
  render() {
    return <u>{this.props.children}</u>;
  }
}
