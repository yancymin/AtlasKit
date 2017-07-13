import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Avatar from '@atlaskit/avatar';
import Question from '@atlaskit/icon/glyph/question';

import DropdownMenu from '../src';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates */
import DropdownLoadItemsExample from './DropdownLoadItemsExample';
import DropdownLoadItemsExampleRaw from '!raw!./DropdownLoadItemsExample';
import DropdownWithTriggerOptions from './DropdownWithTriggerOptions';
import DropdownWithTriggerOptionsRaw from '!raw!./DropdownWithTriggerOptions';
import StatusDropdown from './examples/StatusDropdown';
import StatusDropdownRaw from '!raw!./examples/StatusDropdown';
import LongItemsDropdown from './examples/LongItemsDropdown';
import LongItemsDropdownRaw from '!raw!./examples/LongItemsDropdown';
import WideDropdown from './examples/WideDropdown';
import WideDropdownRaw from '!raw!./examples/WideDropdown';
/* eslint-enable import/first, import/no-duplicates */

import {
  simpleDropdownItems,
  simpleDropdownItemsWithAvatars,
  lotsOfItems,
  dropdownItemsWithGroups,
  simpleDropdownItemsWithCheckboxes,
  simpleDropdownItemsWithRadio,
  itemsWithTooltips,
} from './DropdownsData';

const itemsOverride = `const simpleDropdownItems = ${JSON.stringify(simpleDropdownItems, null, 2)}`;
const dropdownItemsWithGroupsOverride =
  `const dropdownItemsWithGroups = ${JSON.stringify(dropdownItemsWithGroups, null, 2)}`;

const imports = [
  ['React', 'react'],
  ['DropdownMenu', '@atlaskit/dropdown-menu'],
];

const DropdownWrapper = props => (<div style={{ padding: '20px 0' }} {...props} />);
const StoryContainer = props => (<div style={{ padding: 40 }} {...props} />);

storiesOf(name, module)
  .addCodeExampleStory('Basic Dropdown menu with a button', () => (
    <StoryContainer>
      <p>This is an example of a basic dropdown menu with the build-in trigger which looks like a
        button with the `expand` icon.</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" items={simpleDropdownItems}>
          Test
        </DropdownMenu>
      </DropdownWrapper>
      <p>Empty button is also possible</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" items={simpleDropdownItems} />
      </DropdownWrapper>
    </StoryContainer>
  ), {
    imports,
    overrides: {
      items: 'simpleDropdownItems',
    },
    scripts: [
      itemsOverride,
    ],
  })
  .addCodeExampleStory('Basic Dropdown menu avatars/icons', () => (
    <StoryContainer>
      <p>This is an example of a basic dropdown menu with the build-in trigger which looks like a
        button with the `expand` icon.</p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          items={simpleDropdownItemsWithAvatars}
        >
          Drop menu
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ), { imports })
  .addCodeExampleStory('Basic Dropdown menu with checkbox items', () => (
    <StoryContainer>
      <p>This is an example of a basic dropdown menu with checkbox items.
        Use it when you want to present options the user can select or enable.</p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          items={simpleDropdownItemsWithCheckboxes}
          onItemActivated={item => (console.log(item))}
        >
          Drop menu
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ), { imports, overrides: { style: '...' } })
  .addCodeExampleStory('Basic Dropdown menu with radio items', () => (
    <StoryContainer>
      <p>This is an example of a basic dropdown menu with radio items.
        Use it when you want to present options the user can select or enable.</p>
      <DropdownWrapper>
        <DropdownMenu
          defaultOpen
          triggerType="button"
          items={simpleDropdownItemsWithRadio}
          onItemActivated={item => (console.log(item))}
        >
          Drop menu
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ), { imports, overrides: { style: '...' } })
  .addCodeExampleStory('Basic Dropdown menu with anything as a trigger', () => (
    <StoryContainer >
      <p>Anything can be a trigger for the dropdown menu.</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 200,
          padding: '20px 0',
        }}
      >
        <DropdownMenu items={simpleDropdownItems}>
          <span tabIndex="0">click me</span>
        </DropdownMenu>
        <DropdownMenu items={simpleDropdownItems}>
          <span tabIndex="0"><Avatar /></span>
        </DropdownMenu>
        <DropdownMenu items={simpleDropdownItems}>
          <span tabIndex="0"><Question label="dropdown`s trigger" /></span>
        </DropdownMenu>
      </div>
    </StoryContainer>
  ), {
    imports: [...imports, ['t', '@atlaskit/icon/glyph/question']],
    overrides: {
      items: 'simpleDropdownItems',
    },
    scripts: [
      itemsOverride,
    ],
  })
  .addCodeExampleStory('Different appearances of the dropdown menu: default, tall', () => (
    <StoryContainer>
      <p>This is an example of a default dropdown with lots of items. If there are
      more items than it can handle then the scroll appears.</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" items={lotsOfItems}>
          Drop it!
        </DropdownMenu>
      </DropdownWrapper>
      <p>This is an example of a tall dropdown with lots of items. It will never have scroll, so
      use it with caution.</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" items={lotsOfItems} appearance="tall">
          Drop it!
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ), {
    imports,
    overrides: {
      items: 'lotsOfItems',
    },
  })
  .addCodeExampleStory('Dropdown menu with a few groups', () => (
    <StoryContainer>
      <p>If the dropdown menu has more than one group, then all the groups should have headings.</p>
      <DropdownWrapper>
        <DropdownMenu triggerType="button" items={dropdownItemsWithGroups}>
          Test
        </DropdownMenu>
      </DropdownWrapper>
    </StoryContainer>
  ), {
    imports,
    overrides: {
      items: 'dropdownItemsWithGroups',
    },
    scripts: [dropdownItemsWithGroupsOverride],
  })
  .addCodeExampleStory('Load more items', () => (
    <DropdownLoadItemsExample />
  ), {
    scripts: [
      DropdownLoadItemsExampleRaw,
    ],
  })
  .addCodeExampleStory('Loading dropdown', () => (
    <StoryContainer>
      <p>This is an example of a dropdown that is loading.</p>
      <p>
        <DropdownMenu
          defaultOpen
          isLoading
          triggerType="button"
        />
      </p>
    </StoryContainer>
  ))
  .addCodeExampleStory('Basic Dropdown menu with customized trigger button', () => (
    <DropdownWithTriggerOptions />
  ),
  {
    scripts: [
      DropdownWithTriggerOptionsRaw,
    ],
  })
  .addCodeExampleStory(
    'Status Dropdown (special for JIRA)',
    () => (StatusDropdown),
    { scripts: [StatusDropdownRaw] }
  )
  .addCodeExampleStory(
    'Dropdown with long items and titles',
    () => (LongItemsDropdown),
    { scripts: [LongItemsDropdownRaw] }
  )
  .addCodeExampleStory(
    'Dropdown that fits container width',
    () => (WideDropdown),
    { scripts: [WideDropdownRaw] },
  )
  .addCodeExampleStory('Dropdown menu with tooltips', () => (
    <StoryContainer>
      <p>Try hovering over items in the dropdown</p>
      <div style={{ padding: '20px 0', width: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <DropdownMenu triggerType="button" items={itemsWithTooltips}>
          Open me
        </DropdownMenu>
      </div>
    </StoryContainer>
  ))
;
