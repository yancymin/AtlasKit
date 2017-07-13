import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';
import AkButton from '@atlaskit/button';
import Emoji from '../../components/common/Emoji';
import EmojiPlaceholder from '../../components/common/EmojiPlaceholder';
import ToneSelector from './ToneSelector';
import { EmojiDescription, EmojiDescriptionWithVariations, OnToneSelected } from '../../types';
import { isEmojiLoaded } from '../../type-helpers';

export interface Props {
  emoji?: EmojiDescription;
  toneEmoji?: EmojiDescriptionWithVariations;
  selectedTone?: number;
  onToneSelected?: OnToneSelected;
}

export interface State {
  selectingTone: boolean;
}

export default class EmojiPreview extends PureComponent<Props, State> {

  state = {
    selectingTone: false,
  };

  onToneButtonClick = () => {
    this.setState({
      selectingTone: true,
    });
  }

  onToneSelected = (toneValue) => {
    this.setState({
      selectingTone: false,
    });

    if (this.props.onToneSelected) {
      this.props.onToneSelected(toneValue);
    }
  }

  onMouseLeave = () => {
    this.setState({
      selectingTone: false,
    });
  }

  renderTones() {
    const { emoji, toneEmoji, selectedTone } = this.props;
    if (!toneEmoji || !emoji) {
      return null;
    }

    if (this.state.selectingTone) {
      return (
        <div className={styles.toneSelectorContainer}>
          <ToneSelector
            emoji={toneEmoji}
            onToneSelected={this.onToneSelected}
          />
        </div>
      );
    }

    let previewEmoji = toneEmoji;
    if (selectedTone && previewEmoji.skinVariations) {
      previewEmoji = previewEmoji.skinVariations[(selectedTone || 1) - 1];
    }

    return (
      <div className={styles.buttons}>
        <AkButton
          id="toneSelectorButton"
          appearance="subtle"
          iconBefore={<Emoji emoji={previewEmoji} />}
          onClick={this.onToneButtonClick}
          spacing="none"
        />
      </div>
    );
  }

  renderEmojiPreview() {
    const emoji = this.props.emoji;

    if (!emoji) {
      return null;
    }

    const previewClasses = classNames({
      [styles.preview]: true,
      [styles.withToneSelector]: !!this.props.toneEmoji,
    });

    const previewTextClasses = classNames({
      [styles.previewText]: true,
      [styles.previewSingleLine]: !emoji.name,
    });

    let emojiComponent;

    if (isEmojiLoaded(emoji)) {
      emojiComponent = (
        <Emoji emoji={emoji} />
      );
    } else {
      const { shortName } = emoji;
      emojiComponent = (
        <EmojiPlaceholder shortName={shortName} size={32} />
      );
    }

    return (
      <div className={previewClasses}>
        <span className={styles.previewImg}>
          {emojiComponent}
        </span>
        <div className={previewTextClasses}>
          <span className={styles.name}>{emoji.name}</span>
          <span className={styles.shortName}>{emoji.shortName}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className={styles.emojiPreview}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderEmojiPreview()}
        {this.renderTones()}
      </div>
    );
  }
}
