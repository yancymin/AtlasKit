import * as classNames from 'classnames';
import * as React from 'react';
import { MouseEvent } from 'react';

import * as styles from './styles';
import Emoji from './Emoji';
import { toEmojiId } from '../../type-helpers';
import { EmojiDescription, OnEmojiEvent } from '../../types';
import { leftClick } from '../../util/mouse';

export interface Props {
  emoji: EmojiDescription;
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
  selected?: boolean;
}

const handleMouseDown = (props: Props, event: MouseEvent<any>) => {
  const { emoji, onSelected } = props;
  event.preventDefault();
  if (onSelected && leftClick(event)) {
    onSelected(toEmojiId(emoji), emoji, event);
  }
};

const handleMouseMove = (props: Props, event: MouseEvent<any>) => {
  const { emoji, onMouseMove } = props;
  if (onMouseMove) {
    onMouseMove(toEmojiId(emoji), emoji, event);
  }
};

// tslint:disable-next-line:variable-name
export const EmojiButton = (props: Props) => {
  const { emoji, selected } = props;

  const classes = [styles.emojiButton];

  return (
    <button
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
    >
      <Emoji
        emoji={emoji}
        selected={selected}
      />
    </button>
  );
};

export default EmojiButton;
