import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { name } from '../package.json';
import ResourcedMentionList from '../src/components/ResourcedMentionList';
import SearchTextInput from './demo-search-text-input';
import { resourceProvider } from './story-data';

export interface State {
  query: string;
}

class ResourcedMentionListStoryDemo extends Component<{}, State> {
  private resourcedMentionListRef: ResourcedMentionList;

  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  private updateQuery = (event: SyntheticEvent<any>): void => {
    const target = event.target as HTMLInputElement;
    this.setState({
      query: target.value,
    });
  }

  private handleMentionListRef = (ref) => {
    this.resourcedMentionListRef = ref;
  }

  private handleInputUp = () => { this.resourcedMentionListRef.selectPrevious(); };
  private handleInputDown = () => { this.resourcedMentionListRef.selectNext(); };
  private handleInputEnter = () => { this.resourcedMentionListRef.chooseCurrentSelection(); };

  render() {
    const mentionList = (
      <ResourcedMentionList
        onSelection={action('mention selected')}
        resourceProvider={resourceProvider}
        query={this.state.query}
        ref={this.handleMentionListRef}
      />
    );

    return (
      <div style={{ width: '400px', padding: '10px' }}>
        <SearchTextInput
          inputId="mention-input"
          label="User search"
          onChange={this.updateQuery}
          onUp={this.handleInputUp}
          onDown={this.handleInputDown}
          onEnter={this.handleInputEnter}
        />
        {mentionList}
      </div>
    );
  }

}

storiesOf(`${name}/ResourcedMentionList`, module)
  .add('Input field mention list.  Real API. Key binding', () => <ResourcedMentionListStoryDemo />);
