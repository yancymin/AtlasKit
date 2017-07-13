import * as React from 'react';
import { PureComponent } from 'react';
import { AkCode } from '@atlaskit/code';

export interface CodeProps {
  text: string;
}

export default class Code extends PureComponent<CodeProps, {}> {

  render() {
    return <AkCode {...this.props} />;
  }
}
