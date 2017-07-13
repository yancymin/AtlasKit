import React from 'react';
import styled from 'styled-components';
import { akBorderRadius, akColorN20, akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

/* eslint-disable import/no-duplicates, import/first */
import AvatarExample from './AvatarExample';
import avatarExampleSrc from '!raw-loader!./AvatarExample';
import PresenceExample from './PresenceExample';
import presenceExampleSrc from '!raw-loader!./PresenceExample';
/* eslint-enable import/no-duplicates, import/first */

const Pre = styled.pre`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  font-family: Monaco, Menlo, monospace;
  font-size: 0.9em;
  margin: ${akGridSizeUnitless * 2}px 0;
  overflow-x: auto;
  padding: ${akGridSize};
`;

export const description = (
  <div>
    <h3>Usage</h3>
    <p>
      This package exports an <code>Avatar</code> component and
      a <code>Presence</code> component:
    </p>
    <Pre>
      {"import Avatar, { Presence } from '@atlaskit/avatar';"}
    </Pre>
    <p>
      Use the <code>Avatar</code> component to represent users with their
      profile picture. Optionally, a presence to indicate online status can also
      be displayed.
    </p>
    <p>
      You can use the <code>Presence</code> component independently for contexts
      where the profile picture is not required (e.g. next to a username)
    </p>
  </div>
);

export const examples = [
  {
    title: 'Avatar',
    Component: AvatarExample,
    src: avatarExampleSrc,
  },
  {
    title: 'Presence',
    Component: PresenceExample,
    src: presenceExampleSrc,
  },
];
