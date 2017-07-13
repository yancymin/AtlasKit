import * as React from 'react';
import { PureComponent } from 'react';
import { AkCodeBlock } from '@atlaskit/code';

export interface Props {
  text: string;
  language?: string;
}

export default class CodeBlock extends PureComponent<Props, {}> {

  render() {
    return <AkCodeBlock {...this.props} />;
  }
}
