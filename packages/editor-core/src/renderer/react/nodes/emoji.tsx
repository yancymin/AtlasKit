import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiId } from '@atlaskit/emoji';
import Emoji from '../../../ui/Emoji';
import ProviderFactory from '../../../providerFactory';

export interface EmojiProps extends EmojiId {
  providers?: ProviderFactory;
}

export default class EmojiItem extends PureComponent<EmojiProps, {}> {
  render() {
    return (
      <Emoji
        allowTextFallback={true}
        {...this.props}
      />
    );
  }
}
