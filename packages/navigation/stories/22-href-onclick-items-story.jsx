import { action, storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import { name } from '../package.json';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import { AkNavigationItem } from '../src/index';

storiesOf(name, module)
  .add('with hrefs and onClick handlers', () => (
    <HtmlPage>
      <BasicNavigation>
        <AkNavigationItem
          href="//atlassian.com"
          icon={<DashboardIcon label="Dashboard" />}
          text="Just a href"
        />
        <AkNavigationItem
          onClick={action('onClick')}
          icon={<DashboardIcon label="Dashboard" />}
          text="Just an onClick"
        />
        <AkNavigationItem
          onClick={action('onClick')}
          href="//atlassian.com"
          icon={<DashboardIcon label="Dashboard" />}
          text="href and an onClick"
        />
        <AkNavigationItem
          icon={<DashboardIcon label="Dashboard" />}
          text="No href and no onClick"
        />
      </BasicNavigation>
      <div>
        <Lorem count="30" />
      </div>
    </HtmlPage>
  ));
