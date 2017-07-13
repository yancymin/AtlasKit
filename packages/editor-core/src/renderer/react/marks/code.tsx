import * as React from 'react';
import { PureComponent } from 'react';
import { AkCode } from '@atlaskit/code';

export default class Code extends PureComponent<{}, {}> {

  render() {
    const { children } = this.props;
    if (typeof children === 'string') {
      /**
       * It could be used like
       * <Code>This is the text</Code>
       */
      return <AkCode text={children as string} />;
    }

    if (Array.isArray(children) && typeof children[0] === 'string') {
      /**
       * The React Serializer would generically wrap all content in an array,
       * so it would actually looks like
       * <Code>{['This is the text']}</Code>
       */
      return <AkCode text={children[0] as string} />;
    }

    return <AkCode text={''} />;
  }
}
