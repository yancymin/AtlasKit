import * as React from 'react';
import { Component } from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { name } from '../package.json';
import { MentionDescription } from '../src/types';
import { HttpError } from '../src/api/MentionResource';
import MentionList from '../src/components/MentionList';
import { mentions } from './story-data';

function randomMentions() {
  return mentions.filter(() => Math.random() < 0.7);
}

export interface Props {}

export interface State {
  mentions: MentionDescription[];
}

class RefreshableMentionList extends Component<Props, State> {
  private mentionListRef: MentionList;

  constructor(props) {
    super(props);
    this.state = {
      mentions: randomMentions(),
    };
  }

  private updateData = () => {
    this.setState({
      mentions: randomMentions(),
    });
  }

  private moveUp = () => {
    if (this.mentionListRef) {
      // FIXME reactify should expose prototype methods from a wc
      this.mentionListRef.selectPrevious();
    }
  }

  private moveDown = () => {
    if (this.mentionListRef) {
      this.mentionListRef.selectNext();
    }
  }

  private handleMentionListRef = (ref) => {
    this.mentionListRef = ref;
  }

  render() {
    const mentionList = (
      <MentionList
        mentions={this.state.mentions}
        onSelection={action('onSelection')}
        ref={this.handleMentionListRef}
      />
    );

    return (
      <div style={{ paddingLeft: '10px' }}>
        <div style={{ paddingBottom: '10px' }}>
          <button onClick={this.updateData} style={{ height: '30px', marginRight: '10px' }}>Random refresh</button>
          <button onClick={this.moveUp} style={{ height: '30px', marginRight: '10px' }}>Up</button>
          <button onClick={this.moveDown} style={{ height: '30px', marginRight: '10px' }}>Down</button>
        </div>
        {mentionList}
      </div>
    );
  }
}

storiesOf(`${name}/MentionList`, module)
  .add('simple mention list', () => <RefreshableMentionList />)
  .add('generic error mention list', () => (
    <div style={{ padding: '10px' }} >
      <MentionList resourceError={new Error('monkey trousers')} mentions={[]} />
    </div>
  ))
  .add('error mention list for 401', () => (
    <div style={{ padding: '10px' }} >
      <MentionList resourceError={new HttpError(401, 'not used')} mentions={[]} />
    </div>
  ))
  .add('error mention list for 403', () => (
    <div style={{ padding: '10px' }} >
      <MentionList resourceError={new HttpError(403, 'not used')} mentions={[]} />
    </div>
  ));

