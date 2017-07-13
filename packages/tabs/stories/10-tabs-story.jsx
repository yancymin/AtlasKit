import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';
import Spinner from '@atlaskit/spinner';
import { akColorN100 } from '@atlaskit/util-shared-styles';

import Tabs from '@atlaskit/tabs';
import { name } from '../package.json';
import HipChatExample from './examples/HipChatExample';
import OverflowExamples from './examples/OverflowExamples';

function handleTabSelect(selectedTabIndex) {
  action(`Switched to tab at index ${selectedTabIndex}`)();
}

storiesOf(name, module)
  .add('standard tabs', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        {
          content: <Lorem count="1" />,
          defaultSelected: true,
          label: 'Details',
        },
        {
          content: <Lorem count="1" seed="1" />,
          label: 'Diff',
        },
        {
          content: <Lorem count="1" seed="2" />,
          label: 'Commits',
        },
        {
          content: <Lorem count="1" seed="3" />,
          label: 'Pipeline',
        },
      ]}
    />
  ))
  .add('with no default selection', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        {
          content: <Lorem count="1" />,
          label: 'Details',
        },
        {
          content: <Lorem count="1" seed="1" />,
          label: 'Diff',
        },
        {
          content: <Lorem count="1" seed="2" />,
          label: 'Commits',
        },
        {
          content: <Lorem count="1" seed="3" />,
          label: 'Pipeline',
        },
      ]}
    />
  ))
  .add('with many tabs', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        { label: 'Tab 1', content: 'Tab 1 content', defaultSelected: true },
        { label: 'Tab 2', content: 'Tab 2 content' },
        { label: 'Tab 3', content: 'Tab 3 content' },
        { label: 'Tab 4', content: 'Tab 4 content' },
        { label: 'Tab 5', content: 'Tab 5 content' },
        { label: 'Tab 6', content: 'Tab 6 content' },
        { label: 'Tab 7', content: 'Tab 7 content' },
        { label: 'Tab 8', content: 'Tab 8 content' },
        { label: 'Tab 9', content: 'Tab 9 content' },
        { label: 'Tab 10', content: 'Tab 10 content' },
      ]}
    />
  ))
  .add('with no child tabs', () => (
    <Tabs />
  ))
  .add('with multiple selected tabs', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        {
          content: <div>
            <p>Tab 1 should be selected.</p>
            <p>
              If multiple tabs have <em>defaultSelected: true</em>,
              then the first of these tabs should be selected.
            </p>
          </div>,
          defaultSelected: true,
          label: 'Tab 1 should be selected',
        },
        {
          content: 'Tab 2 should not be selected.',
          defaultSelected: true,
          label: 'Tab 2',
        },
        {
          content: 'Tab 3 should not be selected.',
          defaultSelected: true,
          label: 'Tab 3',
        },
      ]}
    />
  ))
  .add('with content overflow and flex box', () => (
    <OverflowExamples />
  ))
  .add('with flex content that needs to fill', () => (
    <div
      style={{
        width: 400,
        height: 200,
        margin: '16px auto',
        border: `1px dashed ${akColorN100}`,
        display: 'flex',
      }}
    >
      <Tabs
        tabs={[
          {
            label: 'Spinner should be centered',
            defaultSelected: true,
            content: (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flex: '1 0 auto',
                  justifyContent: 'center',
                }}
              >
                <Spinner size="medium" />
              </div>
            ),
          },
        ]}
      />
    </div>
  ))
  .add('with example HipChat lobby usage', () => (
    <HipChatExample />
  ));
