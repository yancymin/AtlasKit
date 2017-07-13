import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import { EmojiDescription, OnEmojiEvent } from '../../types';
import { toEmojiId } from '../../type-helpers';
import EmojiPreview from '../common/EmojiPreview';
import { leftClick } from '../../util/mouse';

export interface Props {
  onMouseMove: OnEmojiEvent;
  onSelection: OnEmojiEvent;
  selected: boolean;
  emoji: EmojiDescription;
}

export default class EmojiTypeAheadItem extends PureComponent<Props, undefined> {

  // internal, used for callbacks
  onEmojiSelected = (event) => {
    const { emoji, onSelection } = this.props;
    if (leftClick(event) && onSelection) {
      event.preventDefault();
      onSelection(toEmojiId(emoji), emoji, event);
    }
  }

  onEmojiMenuItemMouseMove = (event) => {
    const { emoji, onMouseMove } = this.props;
    if (onMouseMove) {
      onMouseMove(toEmojiId(emoji), emoji, event);
    }
  }

  render() {
    const { selected, emoji } = this.props;
    const classes = classNames({
      'ak-emoji-typeahead-item': true,
      [styles.typeAheadItem]: true,
      [styles.selected]: selected,
    });

    return (
      <div
        className={classes}
        onMouseDown={this.onEmojiSelected}
        onMouseMove={this.onEmojiMenuItemMouseMove}
        data-emoji-id={emoji.shortName}
      >
        <div className={styles.typeAheadItemRow}>
          <EmojiPreview
            emoji={emoji}
          />
        </div>
      </div>
    );
  }
}
