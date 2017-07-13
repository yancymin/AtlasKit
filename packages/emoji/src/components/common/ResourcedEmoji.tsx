import * as React from 'react';
import { PureComponent } from 'react';

import Emoji from './Emoji';
import EmojiPlaceholder from './EmojiPlaceholder';
import { EmojiId, OptionalEmojiDescription } from '../../types';
import EmojiProvider from '../../api/EmojiResource';

export interface Props {
  emojiId: EmojiId;
  emojiProvider: Promise<EmojiProvider>;
  showTooltip?: boolean;
}

export interface State {
  emoji: OptionalEmojiDescription;
  loaded: boolean;
}

export default class ResourcedEmoji extends PureComponent<Props, State> {
  private ready = false;

  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
      loaded: false,
    };
  }

  private refreshEmoji(emojiProviderPromise: Promise<EmojiProvider>, emojiId: EmojiId) {
    if (emojiProviderPromise) {
      this.setState({
        loaded: false,
      });
      emojiProviderPromise.then(emojiProvider => {
        emojiProvider.findByEmojiId(emojiId).then(emoji => {
          if (this.ready) {
            // don't update state if component was unmounted
            this.setState({
              emoji,
              loaded: true,
            });
          }
        });
      });
    }
  }

  componentDidMount() {
    this.ready = true;
    if (!this.state.emoji) {
      this.refreshEmoji(this.props.emojiProvider, this.props.emojiId);
    }
  }

  componentWillUnmount() {
    this.ready = false;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.emojiProvider !== this.props.emojiProvider || nextProps.emojiId !== this.props.emojiId) {
      this.refreshEmoji(nextProps.emojiProvider, nextProps.emojiId);
    }
  }

  render() {
    const { emoji, loaded } = this.state;
    if (emoji) {
      return (<Emoji emoji={emoji} showTooltip={this.props.showTooltip} />);
    } else if (loaded) {
      // loaded but not found - render fallback
      const { shortName, fallback } = this.props.emojiId;
      return (<span>{fallback || shortName}</span>);
    }

    const { shortName } = this.props.emojiId;
    return <EmojiPlaceholder shortName={shortName} showTooltip={this.props.showTooltip}/>;
  }
}
