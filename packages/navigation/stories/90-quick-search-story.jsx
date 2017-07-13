import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';

import PersonResult from '../src/components/js/results/PersonResult';
import RoomResult from '../src/components/js/results/RoomResult';
import BasicNavigation from './components/BasicNavigation';
import BasicQuickSearch from './components/BasicQuickSearch';
import { AkNavigationItemGroup, AkSearchResults } from '../src';
import { WithRootTheme } from '../src/theme/util';
import * as presets from '../src/theme/presets';

const withRootTheme = children => (
  <WithRootTheme provided={presets.container}>
    {children}
  </WithRootTheme>
);

const getPersonAvatarUrl = identity => `http://api.adorable.io/avatar/32/${identity}`;
const getRoomAvatarUrl = idx => `http://lorempixel.com/32/32/nature/${idx}`;

storiesOf(`${name}/QuickSearch`, module)
  .add('Quick search', () => withRootTheme(
    <BasicNavigation
      openDrawer="search"
      searchDrawerContent={<BasicQuickSearch />}
    />
  ))
  .add('Quick search w/ keyboard controls', () => withRootTheme(
    <BasicNavigation
      openDrawer="search"
      searchDrawerContent={<BasicQuickSearch withKeyboardControls />}
    />
  ))
  .add('Quick search w/ 500ms latency', () => withRootTheme(
    <BasicNavigation
      openDrawer="search"
      searchDrawerContent={<BasicQuickSearch fakeNetworkLatency={500} />}
    />
  ))
  .add('Person Result', () => withRootTheme(
    <div>
      <PersonResult
        key="1"
        avatarUrl={getPersonAvatarUrl('owkenobi')}
        mentionName="BenKen"
        name="Obi Wan Kenobi"
      />
      <PersonResult
        key="2"
        avatarUrl={getPersonAvatarUrl('qgjinn')}
        mentionName="MasterQ"
        name="Qui-Gon Jinn"
        presenceMessage="On-call"
        presenceState="offline"
      />
      <PersonResult
        key="3"
        avatarUrl={getPersonAvatarUrl('sidious')}
        mentionName="TheEmperor"
        mentionPrefix="#"
        name="Palpatine"
        presenceMessage="Custom mention prefix"
        presenceState="busy"
      />
      <PersonResult key="4" name="Minimum detail person" />
    </div>
  ))
  .add('Room Result', () => withRootTheme(
    <div>
      <AkNavigationItemGroup title="Room Examples" key="Room Examples">
        <RoomResult
          key="3"
          avatarUrl={getRoomAvatarUrl(3)}
          name="No Homers"
          topic="We're allowed one"
        />
        <RoomResult
          key="4"
          avatarUrl={getRoomAvatarUrl(4)}
          name="Public Room"
          privacy="public"
          topic="Custom room topic w/ privacy"
        />
        <RoomResult key="7" name="Minimum detail room" />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="Privacy (should show privacy icon)" key="Privacy">
        <RoomResult
          key="1"
          privacy="private"
          name="Private Room"
        />
        <RoomResult
          key="2"
          privacy="public"
          name="Public Room"
        />
      </AkNavigationItemGroup>
      <AkNavigationItemGroup title="Invalid avatar sources (avatar should be present and square)" key="Invalid avatar sources">
        <RoomResult key="5" avatarUrl="#" name="Room w/ broken avatarUrl" />
        <RoomResult key="6" name="Room w/ null avatarUrl" />
      </AkNavigationItemGroup>
    </div>
  ))
  .add('Search Results', () => withRootTheme(
    <AkSearchResults
      results={[
        {
          title: 'Obi Wan\'s Conversations',
          items: [
            {
              resultId: '1',
              type: 'person',
              avatarUrl: getPersonAvatarUrl('qgjinn'),
              mentionName: 'MasterQ',
              name: 'Qui-Gon Jinn',
              presenceMessage: 'On-call',
              presenceState: 'offline',
            },
            {
              resultId: '2',
              type: 'person',
              avatarUrl: getPersonAvatarUrl('lskywalker'),
              mentionName: 'lskywalker',
              name: 'Luke Skywalker',
              presenceState: 'online',
            },
            {
              resultId: '3',
              type: 'room',
              avatarUrl: getRoomAvatarUrl(5),
              name: 'Jedi Council [archived]',
              privacy: 'private',
            },
            {
              resultId: '4',
              type: 'room',
              avatarUrl: getRoomAvatarUrl(6),
              name: 'Jawa Movie Night',
              privacy: 'public',
              topic: 'Centaxdays at 8pm',
            },
          ],
        },
      ]}
    />
  ))
;
