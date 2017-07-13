import { action } from '@kadira/storybook';
import * as React from 'react';
import { PureComponent } from 'react';

import EmojiTypeAhead from '../src/components/typeahead/EmojiTypeAhead';
import { EmojiProvider } from '../src/api/EmojiResource';
import debug from '../src/util/logger';
import { OnEmojiEvent, RelativePosition } from '../src/types';

import SearchTextInput from './demo-search-text-input';
import { lorem } from './story-data';

export interface Props {
  label: string;
  onSelection: OnEmojiEvent;
  emojiProvider: Promise<EmojiProvider>;
  position?: RelativePosition;
  beforeContent?: boolean;
  afterContent?: boolean;
  disableBlur?: boolean;
}

export interface State {
  active: boolean;
  query?: string;
}

export default class EmojiTypeAheadTextInput extends PureComponent<Props, State> {
  private emojiTypeAheadRef: EmojiTypeAhead;

  static defaultProps = {
    onSelection: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      query: '',
    };
  }

  showEmojiPopup = () => {
    this.setState({
      active: true,
    });
  }

  hideEmojiPopup = () => {
    this.setState({
      active: false,
    });
  }

  handleSelection = (emojiId, emoji) => {
    this.hideEmojiPopup();
    this.props.onSelection(emojiId, emoji);
  }

  updateSearch = (event) => {
    if (this.state.active) {
      this.setState({
        query: event.target.value || '',
      } as State);
    }
  }

  private handleSearchTextInputChange = (query) => { this.updateSearch(query); };
  private handleSearchTextInputUp = () => { this.emojiTypeAheadRef.selectPrevious(); };
  private handleSearchTextInputDown = () => { this.emojiTypeAheadRef.selectNext(); };
  private handleSearchTextInputEnter = () => { this.emojiTypeAheadRef.chooseCurrentSelection(); };
  private handleEmojiTypeAheadRef = (ref) => { this.emojiTypeAheadRef = ref; };
  private handleEmojiTypeAheadSelection = (emojiId, emoji) => { this.handleSelection(emojiId, emoji); };

  render() {
    const { label, emojiProvider, position, beforeContent, afterContent, disableBlur } = this.props;
    debug('demo-emoji-text-input.render', position);
    const target = position ? '#demo-input' : undefined;
    const onBlur = disableBlur ? () => {} : this.hideEmojiPopup;
    const searchInput = (
      <SearchTextInput
        inputId="demo-input"
        label={label}
        onChange={this.handleSearchTextInputChange}
        onUp={this.handleSearchTextInputUp}
        onDown={this.handleSearchTextInputDown}
        onEnter={this.handleSearchTextInputEnter}
        onEscape={this.hideEmojiPopup}
        onFocus={this.showEmojiPopup}
        onBlur={onBlur}
      />
    );

    let emojiTypeAhead;

    if (this.state.active) {
      emojiTypeAhead = (
        <EmojiTypeAhead
          target={target}
          position={position}
          onSelection={this.handleEmojiTypeAheadSelection}
          onOpen={action('picker opened')}
          onClose={action('picker closed')}
          ref={this.handleEmojiTypeAheadRef}
          query={this.state.query}
          emojiProvider={emojiProvider}
        />
      );
    }

    const loremContent = (
      <div>
        <p style={{ width: '400px' }}>{lorem}</p>
        <p style={{ width: '400px' }}>{lorem}</p>
      </div>
    );
    const before = beforeContent ? loremContent : null;
    const after = afterContent ? loremContent : null;

    return (
      <div style={{ padding: '10px' }} >
        {before}
        {searchInput}
        {emojiTypeAhead}
        {after}
      </div>
    );
  }
}
