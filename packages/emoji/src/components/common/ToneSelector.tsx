import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiDescription, EmojiDescriptionWithVariations, OnToneSelected } from '../../types';
import EmojiButton from './EmojiButton';

export interface Props {
  emoji: EmojiDescriptionWithVariations;
  onToneSelected: OnToneSelected;
}

const extractAllTones = (emoji: EmojiDescriptionWithVariations): EmojiDescription[] => {
  if (emoji.skinVariations) {
    return [ emoji, ...emoji.skinVariations ];
  }
  return [ emoji ];
};

export default class ToneSelector extends PureComponent<Props, undefined> {
  render() {
    const { emoji, onToneSelected } = this.props;
    const toneEmojis: EmojiDescription[] = extractAllTones(emoji);

    return (
      <div>
        {
          toneEmojis.map((tone, i) => (
            <EmojiButton
              key={`${tone.id}`}
              // tslint:disable-next-line:jsx-no-lambda
              onSelected={() => onToneSelected(i + 1)}
              emoji={tone}
            />
          ))
        }
      </div>
    );
  }
}
