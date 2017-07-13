import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AkAvatar from '@atlaskit/avatar';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import ListIcon from '@atlaskit/icon/glyph/list';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import Tooltip from '@atlaskit/tooltip';
import { name } from '../package.json';
import { AkGlobalItem, presetThemes } from '../src/';
import HtmlPage from './components/HtmlPage';
import BasicNavigation from './components/BasicNavigation';
import emmaAvatar from './emma.png';

storiesOf(name, module)
  .add('with no secondary actions', () => (
    <HtmlPage>
      <BasicNavigation
        globalSecondaryActions={[]}
      />
    </HtmlPage>
  ))
  .add('with four secondary actions', () => (
    <HtmlPage>
      <BasicNavigation
        globalSecondaryActions={[
          <AkGlobalItem>
            <SettingsIcon label="Settings" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <ListIcon label="Some super cool list" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <QuestionCircleIcon label="Help icon" secondaryColor="inherit" />
          </AkGlobalItem>,
          <AkGlobalItem>
            <AkAvatar size="small" src={emmaAvatar} />
          </AkGlobalItem>,
        ]}
      />
    </HtmlPage>
  ))
  .add('with log in button', () => (
    <HtmlPage>
      <BasicNavigation
        containerTheme={presetThemes.global}
        globalSecondaryActions={[
          <Tooltip position="right" description="Sign in">
            <AkGlobalItem>
              <SignInIcon label="Sign in" size="medium" />
            </AkGlobalItem>
          </Tooltip>,
        ]}
      />
    </HtmlPage>
  ));
