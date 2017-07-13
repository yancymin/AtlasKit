import { EmojiId, EmojiProvider, ResourcedEmoji, OnEmojiEvent } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { isLeftClick } from './helpers';
import { analyticsService } from '../analytics';

const emojiButtonStyle = style({
  outline: 'none',
  display: 'flex',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0',
  padding: '10px 8px',
  $nest: {
    '&:hover > span': {
      transition: 'transform cubic-bezier(0.23, 1, 0.32, 1) 200ms',
      transform: 'scale(1.33)'
    }
  }
});

export interface Props {
  emojiId: EmojiId;
  emojiProvider: Promise<EmojiProvider>;
  onClick: OnEmojiEvent;
}

export default class EmojiButton extends PureComponent<Props, {}> {

  private handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && isLeftClick(event)) {
      const emojiId = this.props.emojiId.id ? this.props.emojiId.id  : '';
      analyticsService.trackEvent('reactions.emoji.click', { emojiId });
      this.props.onClick(this.props.emojiId, undefined, event);
    }
  }

  render() {
    const { emojiId, emojiProvider } = this.props;

    return (
      <button
        onMouseUp={this.handleMouseDown}
        className={emojiButtonStyle}
      >
        <ResourcedEmoji emojiProvider={emojiProvider} emojiId={emojiId} />
      </button>
    );
  }

}
