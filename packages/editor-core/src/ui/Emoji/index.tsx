import * as React from 'react';
import { PureComponent } from 'react';
import {
  EmojiId,
  ResourcedEmoji,
} from '@atlaskit/emoji';
import ProviderFactory, { WithProviders } from '../../providerFactory';

export interface EmojiProps extends EmojiId {
  allowTextFallback?: boolean;
  providers?: ProviderFactory;
}

export default class EmojiNode extends PureComponent<EmojiProps, {}> {
  private providerFactory: ProviderFactory;

  constructor(props) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers) => {
    const {
      allowTextFallback,
      shortName,
      id,
      fallback,
    } = this.props;

    if (allowTextFallback && !providers.emojiProvider) {
      return <span>{fallback || shortName}</span>;
    }

    return (
      <ResourcedEmoji
        emojiId={{ id, fallback, shortName }}
        emojiProvider={providers.emojiProvider}
        showTooltip={true}
      />
    );
  }

  render() {
    return (
      <WithProviders
        providers={['emojiProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
