import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';

import { ReactionsProvider } from './reactions-resource';
import ReactionPicker from './reaction-picker';

export interface Props {
  containerAri: string;
  ari: string;
  reactionsProvider: Promise<ReactionsProvider>;
  emojiProvider: Promise<EmojiProvider>;
  miniMode?: boolean;
  boundariesElement?: string;
  className?: string;
  allowAllEmojis?: boolean;
  text?: string;
}

export interface State {
  reactionsProvider: ReactionsProvider | null;
}

export default class ResourcedReactionPicker extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      reactionsProvider: null
    };
  }

  private refreshReactions(reactionsProviderPromise: Promise<ReactionsProvider>) {
    if (reactionsProviderPromise) {
      reactionsProviderPromise.then(reactionsProvider => {
        this.setState({
          reactionsProvider
        });
      });
    }
  }

  componentDidMount() {
    if (!this.state.reactionsProvider) {
      this.refreshReactions(this.props.reactionsProvider);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.reactionsProvider !== this.props.reactionsProvider) {
      this.refreshReactions(nextProps.reactionsProvider);
    }
  }

  private handleReactionPickerSelection = (emojiId) => {
    const { containerAri, ari } = this.props;
    const { reactionsProvider } = this.state;
    if (reactionsProvider) {
      reactionsProvider.toggleReaction(containerAri, ari, emojiId);
    }
  }

  render() {
    const { reactionsProvider } = this.state;

    if (!reactionsProvider) {
      return null;
    }

    const { boundariesElement, emojiProvider, miniMode, className, allowAllEmojis, text } = this.props;

    return (
      <ReactionPicker
        emojiProvider={emojiProvider}
        onSelection={this.handleReactionPickerSelection}
        miniMode={miniMode}
        boundariesElement={boundariesElement}
        className={className}
        allowAllEmojis={allowAllEmojis}
        text={text}
      />
    );
  }
}
