import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import AkProfilecardResourced from '@atlaskit/profilecard';

import MockProfileClient from '../story-data';

const mockClient = new MockProfileClient({
  cacheSize: 10,
  cacheMaxAge: 5000,
});

function randomNumber() {
  return Math.floor(Math.random() * 10).toString();
}

const newRandomUser = (oldUserid) => {
  const rnd = randomNumber();

  if (rnd !== oldUserid) {
    return rnd;
  }

  return newRandomUser(oldUserid);
};

const handleActionClick = title => action(`${title} button clicked`);

const actions = [
  {
    label: 'View profile',
    id: 'view-profile',
    callback: handleActionClick('View profile'),
  },
];

class AkProfilecardRandomById extends PureComponent {
  state = {
    userId: randomNumber(),
    isVisible: true,
  };

  reloadRandomCardData = () => {
    this.setState({
      userId: newRandomUser(this.state.userId),
    });
  }

  toggleVisibility() {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  reloadCardData = (id) => {
    this.setState({
      userId: id,
    });
  }

  flushStoryCache = () => {
    mockClient.flushCache();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.toggleVisibility()}>{this.state.isVisible ? 'Unmount' : 'Mount'}</button>
        &nbsp;
        <button onClick={() => this.reloadRandomCardData()}>Set random user id</button>
        &nbsp;
        <button onClick={() => this.reloadCardData('404')}>Set card data to error</button>
        &nbsp;
        <button onClick={this.flushStoryCache}>Delete cache</button>
        <br /><br />
        {
          this.state.isVisible ?
            <AkProfilecardResourced
              actions={actions}
              cloudId="DUMMY-CLOUDID"
              resourceClient={mockClient}
              userId={this.state.userId}
              analytics={(eventname, attributes) => {
                action(eventname)(JSON.stringify(attributes));
              }}
            /> : null
        }
      </div>
    );
  }
}

export default (
  <AkProfilecardRandomById />
);
