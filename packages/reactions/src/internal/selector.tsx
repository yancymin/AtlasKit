import * as React from 'react';
import * as cx from 'classnames';
import { PureComponent, SyntheticEvent } from 'react';
import { style } from 'typestyle';
import { EmojiId, EmojiProvider, OnEmojiEvent, OptionalEmojiDescription } from '@atlaskit/emoji';
import EmojiButton from './emoji-button';

import { equalEmojiId } from './helpers';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  onSelection: OnEmojiEvent;
}

const selectorStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  padding: 0
});

const emojiStyle = style({
  display: 'inline-block',
  transition: 'transform 200ms ease-in-out',
  $nest: {
    '&.selected': {
      transform: 'translateY(-48px) scale(2.667)'
    },
  }
});

export const defaultReactionsByShortName: Map<string, EmojiId> = new Map<string, EmojiId>([
  [':thumbsup:', { id: '1f44d', shortName: ':thumbsup:' }],
  [':thumbsdown:', { id: '1f44e', shortName: ':thumbsdown:' }],
  [':grinning:', { id: '1f600', shortName: ':grinning:' }],
  [':tada:', { id: '1f389', shortName: ':tada:' }],
  [':heart:', { id: '2764', shortName: ':heart:' }],
]);

export const defaultReactions: EmojiId[] = [
  defaultReactionsByShortName.get(':thumbsup:') as EmojiId,
  defaultReactionsByShortName.get(':thumbsdown:') as EmojiId,
  defaultReactionsByShortName.get(':grinning:') as EmojiId,
  defaultReactionsByShortName.get(':tada:') as EmojiId,
  defaultReactionsByShortName.get(':heart:') as EmojiId,
];

export const isDefaultReaction = (emojiId: EmojiId) => defaultReactions.filter(otherEmojiId => equalEmojiId(otherEmojiId, emojiId)).length > 0;

export interface State {
  selection: EmojiId | undefined;
}

export default class Selector extends PureComponent<Props, State> {
  private timeouts: Array<number>;

  constructor(props) {
    super(props);
    this.timeouts = [];

    this.state = {
      selection: undefined
    };
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  private onEmojiSelected = (emojiId: EmojiId, emoji: OptionalEmojiDescription, event: SyntheticEvent<any>) => {
    this.timeouts.push(setTimeout(() => this.props.onSelection(emojiId, emoji, event), 250));
    this.setState({
      selection: emojiId
    });
  }

  render() {
    const { emojiProvider } = this.props;

    return (
      <div className={selectorStyle}>
        {defaultReactions.map(emojiId => {
          const key = emojiId.id || emojiId.shortName;

          const classNames = cx(emojiStyle, {
            'selected': emojiId === this.state.selection,
          });

          return (
            <div className={classNames} key={key}>
              <EmojiButton emojiId={emojiId} emojiProvider={emojiProvider} onClick={this.onEmojiSelected} />
            </div>
          );
        })}
      </div>
    );
  }

}
