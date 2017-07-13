import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Chrome } from '@atlaskit/util-readme';
import Button from '@atlaskit/button';

import AppSwitcher from '../src';
import { name } from '../package.json';

import data from './data.json';

data.analytics = (key, props) => console.log(key, props);
data.suggestedApplication.onDontShowAgainClick = () => {};
data.trigger = isSelected => (<Button isSelected={isSelected}>...</Button>);

storiesOf(name, module)
  .add('with all components', () => (
    <Chrome>
      <AppSwitcher {...data} />
    </Chrome>
  ))

  .add('with no recent containers', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with no suggested application', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
        }}
      />
    </Chrome>
  ))

  .add('with only applications', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          recentContainers: [],
        }}
      />
    </Chrome>
  ))

  .add('with JIRA as suggested application', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          suggestedApplication: {
            show: true,
            application: 'jira',
            url: 'http://www.atlassian.com/jira',
          },
        }}
      />
    </Chrome>
  ))

  .add('with anonymous mode', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          recentContainers: [],
          isAnonymousUser: true,
        }}
      />
    </Chrome>
  ))

  .add('with Home link disabled', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          isHomeLinkEnabled: false,
        }}
      />
    </Chrome>
  ))

  .add('with Site Admin link', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          isSiteAdminLinkEnabled: true,
        }}
      />
    </Chrome>
  ))

  .add('with applinks error', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          suggestedApplication: {
            show: false,
          },
          linkedApplications: {
            configureLink: 'https://www.atlassian.com',
            apps: [],
            error: true,
          },
        }}
      />
    </Chrome>
  ))
  .add('with loading state', () => (
    <Chrome>
      <AppSwitcher
        {...{
          ...data,
          isLoading: true,
        }}
      />
    </Chrome>
  ));
