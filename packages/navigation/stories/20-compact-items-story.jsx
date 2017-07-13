import { storiesOf } from '@kadira/storybook';
import PropTypes from 'prop-types';
import React from 'react';
import EmojiCustomIcon from '@atlaskit/icon/glyph/emoji';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import AkAvatar from '@atlaskit/avatar';
import AkButton from '@atlaskit/button';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';
import RandomBadge from './components/RandomBadge';

const RandomAvatar = props => <AkAvatar
  {...props}
  size="small"
  src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.round(Math.random() * 50)}.jpg`}
/>;

const CompactItem = ({ children }) => (
  <AkNavigationItem
    action={<CrossIcon label="close" secondaryColor="inherit" size="small" />}
    icon={<RandomAvatar />}
    text={children}
    textAfter={<RandomBadge />}
    subText={Math.random() > 0.5 && 'This is some really long sub text'}
  />
);

CompactItem.propTypes = {
  children: PropTypes.node,
};

storiesOf(name, module)
  .add('with compact items', () => (
    <HtmlPage>
      <BasicNavigation containerHeaderComponent={null}>
        <AkNavigationItemGroup isCompact>
          <AkNavigationItem
            icon={<RandomAvatar presence="online" />}
            text="Available"
          />
          <AkNavigationItem
            icon={<DashboardIcon label="Lobby" secondaryColor="inherit" />}
            text="Lobby"
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup
          action={
            <AkButton
              appearance="subtle"
              iconBefore={<EmojiCustomIcon label="add" size="small" secondaryColor="inherit" />}
              spacing="none"
            />
          }
          isCompact
          title="Rooms"
        >
          <CompactItem href="#1">Front deskers</CompactItem>
          <CompactItem href="#2">Parents anonymous</CompactItem>
          <CompactItem href="#3">Gone fishing</CompactItem>
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="Rooms" isCompact>
          <CompactItem>Front deskers</CompactItem>
          <CompactItem>Parents anonymous</CompactItem>
          <CompactItem>Gone fishing</CompactItem>
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="People" isCompact>
          <CompactItem>John Lennon</CompactItem>
          <CompactItem>George Harrison</CompactItem>
        </AkNavigationItemGroup>
        <AkNavigationItemGroup hasSeparator isCompact>
          <CompactItem isSelected >Mick Jagger </CompactItem>
          <CompactItem>Ronnie Wood</CompactItem>
        </AkNavigationItemGroup>
      </BasicNavigation>
    </HtmlPage>
  ));
