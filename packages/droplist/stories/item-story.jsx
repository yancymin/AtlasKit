import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Question from '@atlaskit/icon/glyph/question';
import Arrow from '@atlaskit/icon/glyph/arrow-right-long';
import Avatar from '@atlaskit/avatar';
import Lozenge from '@atlaskit/lozenge';
import { Code, Description, Chrome } from '@atlaskit/util-readme';
import styles from './story-styles.less';

import { Item, SecondaryText } from '../src';
import { name } from '../package.json';

/* eslint-disable react/prop-types */
const Icon = () => <Question label="test question" />;
/* eslint-enable react/prop-types */

/* eslint-disable import/first, import/no-duplicates */
import ItemWithDescriptions from './examples/item/ItemWithDescriptions';
import ItemWithDescriptionsRaw from '!raw!./examples/item/ItemWithDescriptions';
import ItemWithPrimaryAppearance from './examples/item/ItemWithPrimaryAppearance';
import ItemWithPrimaryAppearanceRaw from '!raw!./examples/item/ItemWithPrimaryAppearance';
/* eslint-enable import/first, import/no-duplicates */

const imports = [['React', 'react'], ['Item', '@atlaskit/droplist-item']];
storiesOf(`${name} - item`, module)
  .addCodeExampleStory('simple item', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of simple droplist items with or without links</p>
      <div className={styles.itemsContainer}>
        <Item href="//atlassian.com">This link will reload this window</Item>
        <Item isActive>This is just a highlighted item</Item>
        <Item href="//atlassian.com" target="_blank">This link will open in another tab</Item>
        <Item>This item has <SecondaryText>(secondary text)</SecondaryText></Item>
        <Item isFocused>Focused item</Item>
      </div>
    </div>
  ), { imports })
  .add('Item with descriptions', () => (
    <Chrome title="Item with descriptions">
      <Description>
        <p>Droplist that fits container width.</p>
        {ItemWithDescriptions}
      </Description>
      <Code>
        {ItemWithDescriptionsRaw}
      </Code>
    </Chrome>
  ))
  .add('Item with primary appearance', () => (
    <Chrome title="Item with primary appearance">
      <Description>
        <p>That shows items Items with Primary appearance.</p>
        <p>This is to be used for Footer actions (see multi-select Footers for an example)</p>
        {ItemWithPrimaryAppearance}
      </Description>
      <Code>
        {ItemWithPrimaryAppearanceRaw}
      </Code>
    </Chrome>
  ))
  .addCodeExampleStory('simple checkbox item', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with checkboxes</p>
      <div className={styles.itemsContainer}>
        <Item type="checkbox" isFocused>Focused item</Item>
        <Item type="checkbox" isChecked>checked item</Item>
        <Item type="checkbox">third item</Item>
        <Item type="checkbox">This item has <SecondaryText>(secondary text)</SecondaryText></Item>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('simple radio item', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of radio droplist items</p>
      <div className={styles.itemsContainer}>
        <Item type="radio" isFocused>focused Item</Item>
        <Item type="radio" isChecked>checked item</Item>
        <Item type="radio">third item</Item>
        <Item type="radio">This item has <SecondaryText>(secondary text)</SecondaryText></Item>
      </div>
    </div>
  ), { imports })
  .addCodeExampleStory('simple item with icons', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with icons</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Icon />}>first item</Item>
        <Item elemBefore={<Icon />}>second item</Item>
        <Item elemBefore={<Icon />}>third item</Item>
        <Item elemBefore={<Icon />}>Item with<SecondaryText>(secondary text)</SecondaryText></Item>
      </div>
    </div>
  ), { imports: [...imports, ['Icon', '@atlaskit/icon/glyph/question']] })
  .addCodeExampleStory('simple item with avatars', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with avatars</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Avatar size="small" />}>first item</Item>
        <Item elemBefore={<Avatar size="small" />}>second item</Item>
        <Item elemBefore={<Avatar size="small" />}>third item</Item>
      </div>
    </div>
  ), { imports: [...imports, ['Avatar', '@atlaskit/avatar']] })
  .addCodeExampleStory('simple item with additional space', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with additional space to the right</p>
      <div className={styles.itemsContainer}>
        <Item
          elemAfter={
            <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
              <Arrow label="" /><Lozenge appearance="success">done</Lozenge>
            </div>
          }
        >first item</Item>
        <Item
          elemAfter={
            <div style={{ display: 'flex', alignItems: 'center', width: '105px' }}>
              <Arrow label="" /><Lozenge appearance="inprogress">in progress</Lozenge>
            </div>
          }
          title="title for this long item"
        >second item with very long text that is going to be cut off</Item>
      </div>
    </div>
  ), { imports: [...imports, ['Lozenge', '@atlaskit/lozenge'], ['t', '@atlaskit/icon/glyph/arrow-right-long']] })
  .addCodeExampleStory('item with avatars and checkboxes', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of droplist items with avatars and checkboxes</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Avatar size="small" />} type="checkbox" isFocused>first item</Item>
        <Item elemBefore={<Avatar size="small" />} type="checkbox" isChecked>second item</Item>
        <Item elemBefore={<Avatar size="small" />} type="checkbox">third item</Item>
      </div>
    </div>
  ), { imports: [...imports, ['Avatar', '@atlaskit/avatar']] })
  .addCodeExampleStory('disabled items', () => (
    <div className={styles.storiesContainer}>
      <p>This is an example of disabled droplist items</p>
      <div className={styles.itemsContainer}>
        <Item elemBefore={<Icon />} isDisabled>first item</Item>
        <Item type="radio" isDisabled>second item</Item>
        <Item href="//atlassian.com" target="_blank" isDisabled>This link will open in another tab</Item>
      </div>
    </div>
  ), { imports: [...imports, ['Icon', '@atlaskit/icon/glyph/question']] })
  .addCodeExampleStory('items in different contexts (accessibility test)', () => (
    <div className={styles.storiesContainer}>
      <div className={styles.itemsContainer}>
        <p>Should announce checkbox (menu)</p>
        <div role="group">
          <Item type="checkbox">Choose me</Item>
          <Item type="checkbox" isChecked>Or me</Item>
        </div>
        <p>Should announce radio (menu)</p>
        <div role="group">
          <Item type="radio">Choose me</Item>
          <Item type="radio" isChecked>Or me</Item>
        </div>
        <p>Should announce menu item (menu)</p>
        <div role="group">
          <Item>I`m an item</Item>
          <Item isActive>Me too</Item>
        </div>
        <p>Should announce option (select/multiselect)</p>
        <div role="listbox">
          <Item type="option">I`m an option</Item>
          <Item type="option" isSelected>Me too</Item>
        </div>
      </div>
    </div>
  ))
  .addCodeExampleStory('with a tooltip', () => (
    <div className={styles.storiesContainer}>
      <p>Hover over each item to reveal tooltips:</p>
      <div className={styles.itemsNarrowContainer}>
        <Item tooltipDescription="I'm a tooltip">Tooltip on the right (default)</Item>
        <Item tooltipDescription="I'm a tooltip" tooltipPosition="left">Tooltip on the left</Item>
        <Item tooltipDescription="I'm a tooltip" tooltipPosition="top">Tooltip on top</Item>
        <Item tooltipDescription="I'm a tooltip" tooltipPosition="bottom">Tooltip at the bottom</Item>
      </div>
    </div>
  ), { imports })

;

