import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import Component from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('simple akutil-component-template', () => (
    <Component />
  ))
  .add('with a prop set', () => (
    <Component audienceName="MyComponent" />
  ))
  .add('with a handler prop', () => (
    <Component onTextClicked={action('Clicked!')} />
  ));
