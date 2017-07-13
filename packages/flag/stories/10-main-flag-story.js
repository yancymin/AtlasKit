import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Modal from '@atlaskit/modal-dialog';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import InfoIcon from '@atlaskit/icon/glyph/info';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';

import AnimationDemo from './components/AnimationDemo';
import { name } from '../package.json';
import Flag, { FlagGroup } from '../src';
import GreenSuccessIcon from './components/GreenSuccessIcon';
import ProgrammaticFlagDismissExample from './examples/ProgrammaticFlagDismissExample';

const StoryPadding = styled.div`
  padding: ${akGridSizeUnitless * 3}px;
`;

storiesOf(name, module)
  .add('Interactive flag example', () => (
    <AnimationDemo />
  ))
  .addCodeExampleStory('Flag dumb component without FlagGroup', () => (
    <StoryPadding>
      <p>
        This is the Flag component. It is a dumb component as it does not maintain any state, and
        all animations are managed by the parent FlagGroup component.
      </p>
      <div>
        <Flag
          actions={[
            { content: 'Show me', onClick: action('Show me clicked') },
            { content: 'No thanks', onClick: action('No thanks clicked') },
          ]}
          description="We got fun an games. We got everything you want honey, we know the names."
          icon={<GreenSuccessIcon />}
          id="1"
          key="1"
          title="Welcome to the jungle"
        />
      </div>
    </StoryPadding>
  ))
  .add('Bold flag - success', () => (
    <StoryPadding>
      <FlagGroup>
        <Flag
          appearance="success"
          icon={<SuccessIcon label="Success" />}
          id="success"
          key="success"
          title="Connected"
          description="All wires now hooked up."
          actions={[
            { content: 'Alrighty then', onClick: action('Alrighty then clicked') },
          ]}
        />
      </FlagGroup>
    </StoryPadding>
  ))
  .add('Bold flag - warning', () => (
    <StoryPadding>
      <FlagGroup>
        <Flag
          appearance="warning"
          icon={<WarningIcon label="Warning" />}
          id="warning"
          key="warning"
          title="Presence isn't working"
          description="We'll do our best to get it up and running again soon."
          actions={[
            { content: 'Try again', onClick: action('Try again clicked') },
            { content: 'Check StatusPage', onClick: action('Check StatusPage clicked') },
          ]}
        />
      </FlagGroup>
    </StoryPadding>
  ))
  .add('Bold flag - error', () => (
    <StoryPadding>
      <FlagGroup>
        <Flag
          appearance="error"
          icon={<ErrorIcon label="Error" />}
          id="error"
          key="error"
          title="We couldn't connect"
          description="Sorry about that. Try checking your internet connection or check the status on our end."
          actions={[
            { content: 'Check StatusPage', onClick: action('Check StatusPage clicked') },
          ]}
        />
      </FlagGroup>
    </StoryPadding>
  ))
  .add('Bold flag - info', () => (
    <StoryPadding>
      <FlagGroup>
        <Flag
          appearance="info"
          icon={<InfoIcon label="Info" />}
          id="info"
          key="info"
          title="Connecting"
          description="We are talking to the interwebs, please hold."
          actions={[
            { content: 'Good luck', onClick: action('Good luck clicked') },
          ]}
        />
      </FlagGroup>
    </StoryPadding>
  ))
  .add('Flag on top of Modal', () => (
    <StoryPadding>
      <Modal header="Modal" isOpen>
        <div style={{ minHeight: 240 }}>
          I am a modal, flag should be visible above me
        </div>
      </Modal>
      <FlagGroup>
        <Flag
          description="I should be above the modal dialog"
          icon={<GreenSuccessIcon />}
          id="1"
          key="1"
          title="I am a Flag"
        />
      </FlagGroup>
    </StoryPadding>
  ))
  .add('with a description containing a link', () => (
    <FlagGroup>
      <Flag
        description={
          <span>
            My favourite issue is <a href="https://ecosystem.atlassian.net/browse/AK-90210">AK-90210</a>
          </span>
        }
        icon={<GreenSuccessIcon />}
        id="1"
        key="1"
        title="I am a Flag"
      />
    </FlagGroup>
  ))
  .add('programatically dismissing a Flag', () => (
    <ProgrammaticFlagDismissExample />
  ));
