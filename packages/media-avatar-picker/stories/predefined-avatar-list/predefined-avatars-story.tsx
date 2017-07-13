/* tslint:disable:variable-name */
import {storiesOf} from '@kadira/storybook';
import * as React from 'react';
import styled from 'styled-components';

import {AvatarList, Avatar, PredefinedAvatarList, PredefinedAvatarView} from '../../src';
import {generateAvatars} from '../utils';

const avatars: Array<Avatar> = generateAvatars(5);
const Wrapper = styled.div`margin: 10px`;

storiesOf('Predefined Avatars', {})
  .add('Avatar List', () => (
    <Wrapper>
      <AvatarList avatars={avatars.map(a => ({avatar: a, selected: false}))}/>
    </Wrapper>
  ))
  .add('Predefined Avatars (none preselected)', () => (
    <Wrapper>
      <PredefinedAvatarList avatars={avatars} />
    </Wrapper>
  ))
  .add('Predefined Avatars (preselected)', () => (
    <Wrapper>
      <PredefinedAvatarList
        avatars={avatars}
        selectedAvatar={avatars[2]}
      />
    </Wrapper>
  ))
  .add('Predefined Avatar View', () => (
    <Wrapper>
      <PredefinedAvatarView
        avatars={generateAvatars(25)}
      />
    </Wrapper>
  ));
