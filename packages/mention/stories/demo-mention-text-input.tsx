import { action } from '@kadira/storybook';
import * as React from 'react';
import { Component } from 'react';

import MentionPicker, { Position } from '../src/components/MentionPicker';
import { MentionDescription, OnMentionEvent } from '../src/types';
import { MentionProvider } from '../src/api/MentionResource';
import { PresenceProvider } from '../src/api/PresenceResource';

import SearchTextInput from './demo-search-text-input';
import debug from '../src/util/logger';

export interface Props {
  label: string;
  onSelection?: OnMentionEvent;
  resourceProvider?: MentionProvider;
  presenceProvider?: PresenceProvider;
  relativePosition?: Position;
}

export interface State {
  active: boolean;
  query: string;
}

export default class MentionTextInput extends Component<Props, State> {
  private mentionPickerRef: MentionPicker;

  constructor(props: Props) {
    super(props);
    this.state = {
      active: false,
      query: '',
    };
  }

  private showMentionPopup = () => {
    this.setState({
      active: true,
    });
  }

  private hideMentionPopup = () => {
    this.setState({
      active: false,
    });
  }

  private handleSelection = (mention: MentionDescription) => {
    this.hideMentionPopup();
    if (this.props.onSelection) {
      this.props.onSelection(mention);
    }
  }

  private updateSearch = (event) => {
    if (this.state.active) {
      this.setState({
        query: event.target.value || '',
      });
    }
  }

  private handleInputUp = () => this.mentionPickerRef.selectPrevious();
  private handleInputDown = () => this.mentionPickerRef.selectNext();
  private handleInputEnter = () => this.mentionPickerRef.chooseCurrentSelection();
  private handleMentionPickerRef = (ref) => { this.mentionPickerRef = ref; };

  render() {
    debug('demo-mention-text-input.render');
    /* eslint no-unused-vars: 0 */
    const { label, relativePosition, resourceProvider, presenceProvider } = this.props;
    const searchInput = (
      <SearchTextInput
        inputId="demo-input"
        label={label}
        onChange={this.updateSearch}
        onUp={this.handleInputUp}
        onDown={this.handleInputDown}
        onEnter={this.handleInputEnter}
        onEscape={this.hideMentionPopup}
        onFocus={this.showMentionPopup}
        onBlur={this.hideMentionPopup}
      />
    );

    let mentionPicker;

    if (this.state.active) {
      mentionPicker = (
        <MentionPicker
          target="demo-input"
          position={relativePosition}
          resourceProvider={resourceProvider as MentionProvider}
          presenceProvider={presenceProvider}
          onSelection={this.handleSelection}
          onOpen={action('picker opened')}
          onClose={action('picker closed')}
          ref={this.handleMentionPickerRef}
          query={this.state.query}
        />
      );
    }

    return (
      <div style={{ padding: '10px' }} >
        {searchInput}
        {mentionPicker}
      </div>
    );
  }
}
