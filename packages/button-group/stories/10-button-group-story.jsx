import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';
import Dropdown from '@atlaskit/dropdown-menu';
import CharlieIcon from '@atlaskit/icon/glyph/atlassian';
import React from 'react';

import ButtonGroup from '../src';
import { name } from '../package.json';

const items = [
  {
    heading: 'dropdown heading',
    items: [
      {
        content: 'foo',
      },
      {
        content: 'bar',
      },
    ],
  },
];

const imports = [
  ['React', 'react'],
  ['ButtonGroup', '@atlaskit/button-group'],
  ['Button', '@atlaskit/button'],
];

storiesOf(name, module)
  .addCodeExampleStory('plain group', () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ), { imports })
  .addCodeExampleStory('with one Button disabled', () => (
    <ButtonGroup>
      <Button selected>One</Button>
      <Button>Two</Button>
      <Button disabled>Three</Button>
    </ButtonGroup>
  ), { imports })
  .addCodeExampleStory('with one button selected and all disabled', () => (
    <ButtonGroup>
      <Button disabled selected>One</Button>
      <Button disabled>Two</Button>
      <Button disabled>Three</Button>
    </ButtonGroup>
  ), { imports })
  .addCodeExampleStory('with an input before for focus testing', () => (
    <div>
      <input type="text" placeholder="focus here first" />
      <ButtonGroup>
        <Button>One</Button>
        <Button disabled>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  ), { imports })
  .addCodeExampleStory('with an unexpected paragraph inside', () => (
    <ButtonGroup>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <p>Paragraph</p>
    </ButtonGroup>
  ), { imports })
  .addCodeExampleStory('overflows the parent div', () => (
    <div style={{ border: '1px solid #AAA', width: 75 }}>
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  ), { imports })
  .addCodeExampleStory('with CSS display: block', () => (
    <ButtonGroup style={{ border: '1px solid #AAA', display: 'block' }}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ), { imports })
  .addCodeExampleStory('with button > icon', () => (
    <div style={{ border: '1px solid #AAA', display: 'block' }}>
      <ButtonGroup>
        <Button>Edit</Button>
        <Button iconBefore={<CharlieIcon label="button with icon" />} />
      </ButtonGroup>
    </div>
  ), { imports: [...imports, ['CharlieIcon', 'icon/glyph/atlassian']] })
  .addCodeExampleStory('with dropdown > button (split button)', () => (
    <div style={{ display: 'block' }}>
      <ButtonGroup>
        <Button appearance="subtle" iconBefore={<CharlieIcon />} />
        <Button appearance="subtle" iconBefore={<CharlieIcon />} />
        <Dropdown items={items}>
          <Button appearance="subtle" iconBefore={<CharlieIcon />} />
        </Dropdown>
      </ButtonGroup>
    </div>
  ), {
    imports: [...imports, ['Dropdown', '@atlaskit/dropdown']],
  });
