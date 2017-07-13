import { storiesOf } from '@kadira/storybook';
import React from 'react';
import HtmlPage from './components/HtmlPage';
import CustomDrawerNavigation from './components/CustomDrawerNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with custom drawers', () => (
    <HtmlPage>
      <CustomDrawerNavigation />
    </HtmlPage>
  ));
