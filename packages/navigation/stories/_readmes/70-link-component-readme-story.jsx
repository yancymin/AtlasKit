import React from 'react';
import Readme, { Description, Props, Code } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';

import ReactRouterLinkComponentRaw from '!raw!../components/react-router/RouterLinkComponent';
import ReactRouterLinkItemRaw from '!raw!../components/react-router/RouterLinkItem';
import DefaultLinkComponent from '../../src/components/js/DefaultLinkComponent';

import { name, description } from '../../package.json';

const defaultLinkComponentPropDescriptions = {
  href: 'The href of the link',
  children: 'The contents of the link',
  onMouseDown: 'The mousedown handler of the link - used to preventDefault on the click, so that the focus ring can be removed for mouse activation of the link',
  onClick: 'The onclick handler of the link - passed in through ',
  className: 'The classnames that are to be applied to the link',
};

storiesOf(name, module)
  .add('📖 linkComponent readme', () => (
    <Readme
      component={name}
      description={description}
    >
      <Description>
        linkComponent is a prop that is present on many components in Navigation
        - the DefaultLinkComponent is documented here to demonstrate how this
        might be used in practice. The default prop renders an {'<a />'} with
        the href on it, but if you wish to use something like react-router to
        render your links, you are able to pass in a custom linkComponent to
        render the links how you would like.
      </Description>
      <Props component={DefaultLinkComponent} descriptions={defaultLinkComponentPropDescriptions} />
      <Description>
        As an example, you could provide a custom linkComponent prop to
        NavigationItem to make the links react-router compatible.
      </Description>
      <Code>{ReactRouterLinkComponentRaw}</Code>
      <Code>{ReactRouterLinkItemRaw}</Code>
    </Readme>
  ));
