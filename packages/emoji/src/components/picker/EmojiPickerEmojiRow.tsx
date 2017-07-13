
import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import { EmojiDescription, OnEmojiEvent } from '../../types';
import { isEmojiLoaded } from '../../type-helpers';
import Emoji from '../common/Emoji';
import EmojiPlaceholder from '../common/EmojiPlaceholder';
import { UploadPromptButton } from './EmojiPickerUploadPrompts';

export interface Props {
  emojis: EmojiDescription[];
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
  showUploadButton?: boolean;
  onOpenUpload?: () => void;
}

export default class EmojiPickerEmojiRow extends PureComponent<Props, {}> {

  private renderUploadPrompt() {
    const { onOpenUpload, showUploadButton } = this.props;

    if (!showUploadButton) {
      return undefined;
    }

    return <UploadPromptButton onOpenUpload={onOpenUpload} />;
  }

  render() {
    const { emojis, onSelected, onMouseMove } = this.props;

    return (
      <div>
        {emojis.map((emoji) => {
          const { shortName, category, id } = emoji;
          const key = id || `${shortName}-${category}`;
          let emojiComponent;

          if (isEmojiLoaded(emoji)) {
            emojiComponent = (
              <Emoji
                emoji={emoji}
                selectOnHover={true}
                onSelected={onSelected}
                onMouseMove={onMouseMove}
              />
            );
          } else {
            emojiComponent = (
              <EmojiPlaceholder shortName={shortName} />
            );
          }

          return (
            <span
              className={styles.emojiItem}
              key={key}
            >
              {emojiComponent}
            </span>
          );
        })}
        {this.renderUploadPrompt()}
      </div>
    );
  }

}
