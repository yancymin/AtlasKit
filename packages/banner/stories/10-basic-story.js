import { storiesOf } from '@kadira/storybook';
import React from 'react';
import WarningIcon from 'ak-icon/glyph/warning';

import Banner from '../src';
import AnimationDemo from './AnimationDemo';
import PaddedDiv from './components/PaddedDiv';
import { name } from '../package.json';

storiesOf(name, module)
  .addCodeExampleStory('a warning banner', () => (
    <Banner
      icon={<WarningIcon label="Warning icon" />}
      isOpen
    >
      JIRA Service Desk pricing has been updated. Please migrate within 3 months.
    </Banner>
  ))
  .addCodeExampleStory('an error banner', () => (
    <Banner
      appearance="error"
      icon={<WarningIcon label="Warning icon" />}
      isOpen
    >
      Your JIRA OnDemand license is about to expire. There are two days left to renew your license
    </Banner>
  ))
  .addCodeExampleStory('with icon and text overflow', () => (
    <div style={{ width: 400 }}>
      <Banner
        icon={<WarningIcon label="Warning icon" />}
        isOpen
      >
        JIRA Service Desk pricing has been updated. Please migrate within 3 months.
      </Banner>
      <PaddedDiv>
        There should only be 1 line of text, with elipsis (…) shown when text overflows.
      </PaddedDiv>
    </div>
  ))
  .add('animation demo', () => (
    <AnimationDemo
      icon={<WarningIcon label="Warning icon" />}
    >
      JIRA Service Desk pricing has been updated. Please migrate within 3 months.
    </AnimationDemo>
  ));
