import { storiesOf, action } from '@kadira/storybook';
import React, { PureComponent } from 'react';

import { name } from '../package.json';
import { AkProfilecard } from '../src/';
import interActiveCard from './profile-interactive';
import profiles from './profile-data';

const InteractiveCard = interActiveCard({ React, AkProfilecard });

const handleActionClick = title => action(`${title} button clicked`);

const fakeProfileData = {
  avatarUrl: profiles[6].User.avatarUrl,
  fullName: profiles[6].User.fullName,
  nickname: profiles[6].User.nickname,
  email: profiles[6].User.email,
  location: 'Sydney, Australia',
  timestring: '9:00am',
  meta: profiles[6].User.meta,
  presence: 'available',
  actions: [
    {
      label: 'View profile',
      id: 'view-profile',
      callback: handleActionClick('View profile'),
    },
  ],
};

const fakeData = data => ({
  ...fakeProfileData,
  ...data,
});

// have some more space around the profilecard
const canvasStyle = { padding: '30px' };

class AkProfilecardHeightTransition extends PureComponent {
  constructor(data) {
    super();

    this.data = data;
    this.interval = null;

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <AkProfilecard
          isLoading={this.state.isLoading}
          {... this.data}
        />
      </div>
    );
  }
}

storiesOf(`${name}`, module)
  .add('loading state', () => (
    <div style={canvasStyle}>
      <AkProfilecard isLoading />
    </div>
  ))
  .add('error state', () => (
    <div style={canvasStyle}>
      <AkProfilecard
        hasError
        clientFetchProfile={handleActionClick('Retry')}
      />
    </div>
  ))
  .add('error state without reload option', () => (
    <div style={canvasStyle}>
      <AkProfilecard hasError />
    </div>
  ))
  .add('worst case card', () => {
    const data = fakeData({
      avatarUrl: null,
      presence: null,
    });

    return (
      <div style={canvasStyle}>
        <AkProfilecard
          actions={data.actions}
          fullName={data.fullName}
        />
      </div>
    );
  })
  .add('best case card', () => {
    const data = fakeData({});

    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('w/ avatar img error', () => {
    const data = fakeData({ avatarUrl: 'http://localhost:404/no-avatar' });
    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('alternate actions', () => {
    const actions = [
      {
        label: 'Foobar',
        id: 'action-foo',
        callback: handleActionClick('Foobar'),
      },
      {
        label: 'Barfoo',
        id: 'action-barfoo',
        callback: handleActionClick('Barfoo'),
      },
      {
        label: 'Foobar2',
        id: 'action-footwo',
        callback: handleActionClick('Foobar2'),
      },
    ];
    const data = fakeData({ actions });
    return (
      <div style={canvasStyle}>
        <AkProfilecard {...data} />
      </div>
    );
  })
  .add('height transition', () => {
    const data = fakeData({});

    return (
      <div style={canvasStyle}>
        <AkProfilecardHeightTransition {...data} />
      </div>
    );
  })
  .add('interactive playground', () => (
    <div style={canvasStyle}>
      <InteractiveCard />
    </div>
  ));
