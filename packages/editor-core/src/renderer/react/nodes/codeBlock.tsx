import * as React from 'react';
import { PureComponent } from 'react';
import { AkCodeBlock } from '@atlaskit/code';

const identity = (text: string): string => {
  return text;
};

export interface Props {
  language: string;
}

export default class CodeBlock extends PureComponent<Props, {}> {
  render() {
    const {
      children,
      language,
    } = this.props;

    const codeProps = {
      language,
      text: React.Children.map(children, identity).join('\n')
    };

    return (
      <AkCodeBlock {...codeProps}/>
    );
  }
}
