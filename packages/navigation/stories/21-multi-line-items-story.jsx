import { storiesOf } from '@kadira/storybook';
import React from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import EmojiTravelIcon from '@atlaskit/icon/glyph/emoji/travel';
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';
import RandomBadge from './components/RandomBadge';

storiesOf(name, module)
  .add('with multi line items', () => (
    <HtmlPage>
      <BasicNavigation
        createDrawerContent={(
          <div>
            <AkNavigationItem
              href="#1"
              icon={<EmojiTravelIcon label="Travel" />}
              subText="With a second line of text"
              text="Create item 1"
            />
            <AkNavigationItem
              href="#2"
              icon={<DashboardIcon label="Dashboard" />}
              subText="Also with more text"
              text="Create item 2"
            />
          </div>
        )}
      >
        <AkNavigationItem
          href="#1"
          icon={<EmojiTravelIcon label="Travel" />}
          subText="With a second line"
          text="Item 1"
        />
        <AkNavigationItem
          href="#2"
          icon={<DashboardIcon label="Dashboard" />}
          subText="With a very long second line of text"
          text="Item 2"
        />
        <AkNavigationItemGroup title="With things at the end">
          <AkNavigationItem
            action={<CrossIcon label="close" size="small" />}
            icon={<DashboardIcon label="Dashboard" />}
            subText="And two lines"
            text="With an action"
            textAfter={<RandomBadge />}
          />
          <AkNavigationItem
            action={<CrossIcon label="close" size="small" />}
            icon={<EmojiNatureIcon label="Nature" />}
            subText="And a very long second line of text"
            text="A very long first line of text"
            textAfter={<RandomBadge />}
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="With compact items">
          <AkNavigationItem
            action={<CrossIcon label="close" size="small" />}
            isCompact
            subText="Text with y, q, etc."
            text="Should have even smaller subText"
            textAfter={<RandomBadge />}
          />
          <AkNavigationItem
            isCompact
            subText="There's nothing quite like Parkay's squeeze™"
            text="Should have even smaller subText"
            textAfter={<RandomBadge />}
          />
        </AkNavigationItemGroup>
      </BasicNavigation>
    </HtmlPage>
  ));
