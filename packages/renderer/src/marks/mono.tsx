import * as React from 'react';
import { PureComponent } from 'react';

export default class Mono extends PureComponent<{}, {}> {
  render() {
    return <span style={{fontFamily: 'monospace', whiteSpace: 'pre-wrap'}}>{this.props.children}</span>;
  }
}
