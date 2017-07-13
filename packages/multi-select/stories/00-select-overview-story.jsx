import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme from '@atlaskit/util-readme';
import { name, description } from '../package.json';
import { AkCodeBlock as Code } from '@atlaskit/code';
import styled from 'styled-components';

import { ItemsExample, GroupsExample } from './examples/ItemsAndGroupsExamples';
import { itemPropDescriptions, itemPropTypes, itemPropDefault, footerPropDescriptions, footerPropTypes } from './props';

/* eslint-disable import/first, import/no-duplicates */
import MultiSelect from '../src/components/Stateful';
import multiSelectSrc from '!raw!../src/components/Stateful';
import MultiSelectStateless from '../src/components/Stateless';
import multiSelectSrcStatelessSrc from '!raw!../src/components/Stateless';
import MultiSelectOverview from './examples/MultiSelectOverview';
import multiSelectOverviewSrc from '!raw!./examples/MultiSelectOverview';
import MultiSelectStatelessOverview from './examples/MultiSelectStatelessOverview';
import multiSelectStatelessOverviewSrc from '!raw!./examples/MultiSelectStatelessOverview';
import SmartSelectDefaultSelectedItems from './examples/SmartSelectDefaultSelectedItems';
import SmartSelectDefaultSelectedItemsRaw from '!raw!./examples/SmartSelectDefaultSelectedItems';
import SmartSelectElemBefore from './examples/SmartSelectElemBefore';
import SmartSelectElemBeforeRaw from '!raw!./examples/SmartSelectElemBefore';
import SelectInForm from './examples/SelectInForm';
import SelectInFormRaw from '!raw!./examples/SelectInForm';
import SmartSelectNoMatchesFound from './examples/SmartSelectNoMatchesFound';
import SmartSelectNoMatchesFoundRaw from '!raw!./examples/SmartSelectNoMatchesFound';
import SmartSelectRequired from './examples/SmartSelectRequired';
import SmartSelectRequiredRaw from '!raw!./examples/SmartSelectRequired';
import SmartSelectDisabled from './examples/SmartSelectDisabled';
import SmartSelectDisabledRaw from '!raw!./examples/SmartSelectDisabled';
import SmartSelectInvalid from './examples/SmartSelectInvalid';
import SmartSelectInvalidRaw from '!raw!./examples/SmartSelectInvalid';
import SmartSelectFocus from './examples/SmartSelectFocus';
import SmartSelectFocusRaw from '!raw!./examples/SmartSelectFocus';
import SmartSelectAppearances from './examples/SmartSelectAppearances';
import SmartSelectAppearancesRaw from '!raw!./examples/SmartSelectAppearances';
import SmartSelectWithDescriptions from './examples/SmartSelectWithDescriptions';
import SmartSelectWithDescriptionsRaw from '!raw!./examples/SmartSelectWithDescriptions';
import SmartSelectWithCreateNewItem from './examples/SmartSelectWithCreateNewItem';
import SmartSelectWithCreateNewItemRaw from '!raw!./examples/SmartSelectWithCreateNewItem';
import SmartSelectWithFooter from './examples/SmartSelectWithFooter';
import SmartSelectWithFooterRaw from '!raw!./examples/SmartSelectWithFooter';
/* eslint-enable import/first, import/no-duplicates */

const Spaced = styled.div`
  padding: 20px;
`;

const CodeWrapper = styled.div`
  margin-top: 12px;
`;

const PropDef = ({ propName, definition, type, defaultVal }) => (
  <tr>
    <td>{propName}</td>
    <td>{type || '--'}</td>
    <td>{defaultVal || '--'}</td>
    <td>{definition}</td>
  </tr>
);

storiesOf(name, module)
  .add('📖 Multi select (default) - readme', () => (
    <Readme
      name={name}
      component={MultiSelect}
      componentSource={multiSelectSrc}
      example={MultiSelectOverview}
      exampleSource={multiSelectOverviewSrc}
      description={
        <div>
          <p>{description}</p>
          <p>
            The &ldquo;smart&rdquo; multi-select component will handle it&apos;s own state for you
            (you won&apos;t need to/be able to update the list of <code>selected</code> items). If
            you require this functionality, use the <code>stateless</code> version instead.
          </p>
        </div>
      }
    />
  ))
  .add('📖 Multi select (stateless) - readme', () => (
    <Readme
      name="MultiSelectStateless"
      component={MultiSelectStateless}
      componentSource={multiSelectSrcStatelessSrc}
      example={MultiSelectStatelessOverview}
      exampleSource={multiSelectStatelessOverviewSrc}
      description={
        <div>
          <p>
            The &ldquo;stateless&rdquo; multi-select component gives you complete control of how the
            component should display and react to user interaction.
          </p>
          <p>This also means it is up to the Application to keep the props up to date (filter text,
            isOpen, selectedItems, etc)</p>
          <p>The following is an example of how you could build your own multiselect using the
            stateless component
          </p>
        </div>
      }
    />
  ))
  .add('📖 Multi select Items - readme', () => (
    <Spaced>
      <h2>Items</h2>
      <p>
        An item is defined as an object with <code>content</code> and <code>value</code>.
      </p>
      <p>
        For MultiSelect, items are always provided as an array, even when only one item is
        present. Both <code>items</code> and <code>selectedItems</code> take an array of items.
      </p>
      <p>
        If you want headings for the sections within a multi-select, you can pass groups of
        items to items instead of just items.
      </p>
      <p>Example items array:</p>
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={ItemsExample} />
      </CodeWrapper>
      <p>
        There are other options that can be included in an item, but are not required:
      </p>
      <table>
        <thead>
          <th>Name (* is required)</th>
          <th>Type</th>
          <th>Default value</th>
          <th>Description</th>
        </thead>
        <tbody>
          {Object.keys(itemPropDescriptions).map(propName => PropDef({
            propName,
            definition: itemPropDescriptions[propName],
            type: itemPropTypes[propName],
            defaultVal: itemPropDefault[propName],
          }))}
        </tbody>
      </table>
      <h2>Groups</h2>
      <p>The items prop also accepts groups of items, which have headings within them. If
      you are using groups, you should ensure each group has a heading. Groups have
      the following shape:</p>
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={GroupsExample} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('📖 Multi select Footer - readme', () => (
    <Spaced>
      <h2>Footer</h2>
      <p>
        Footer&#39;s allow you to place a &#34;sticky&#34; item at the bottom a mutliselect that a
        user can click or select via keyboard. This could be used for something like opening a page
        in a new tab for example.
      </p>
      <p>
        If <code>footer</code> and <code>shouldAllowCreateItem</code> are set,
        <code>shouldAllowCreateItem</code> will take precedence (the footer will not be displayed).
      </p>
      <p>
        Below is the shape of the <code>footer</code> prop
      </p>
      <table>
        <thead>
          <th>Name (* is required)</th>
          <th>Type</th>
          <th>Default value</th>
          <th>Description</th>
        </thead>
        <tbody>
          {Object.keys(footerPropDescriptions).map(propName => PropDef({
            propName,
            definition: footerPropDescriptions[propName],
            type: footerPropTypes[propName],
          }))}
        </tbody>
      </table>
    </Spaced>
  ))
  .add('Multi select is submittable', () => (
    <Spaced>
      {SelectInForm}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SelectInFormRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select with elemBefore (Avatars)', () => (
    <Spaced>
      <p>You can pass content to be displayed in front of the dropdown items and also the tags by
        using the <code>elemBefore</code> and <code>tag.elemBefore</code> props
        respectively.
      </p>
      <p>The most common use case for this would be for things like <code>@atlaskit/icon</code>
        &apos;s and <code>@atlaskit/avatar</code>&apos;s
      </p>
      {SmartSelectElemBefore}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectElemBeforeRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select with default selected items', () => (
    <Spaced>
      {SmartSelectDefaultSelectedItems}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectDefaultSelectedItemsRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select - no matches found', () => (
    <Spaced>
      {SmartSelectNoMatchesFound}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectNoMatchesFoundRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select - required', () => (
    <Spaced>
      {SmartSelectRequired}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectRequiredRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select - disabled', () => (
    <Spaced>
      {SmartSelectDisabled}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectDisabledRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select - invalid', () => (
    <Spaced>
      {SmartSelectInvalid}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectInvalidRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select - focus behavior', () => (
    <Spaced>
      <SmartSelectFocus />
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectFocusRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select - appearance variations', () => (
    <Spaced>
      {SmartSelectAppearances}
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectAppearancesRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select with descriptions', () => (
    <Spaced>
      <div style={{ width: '300px' }}>
        {SmartSelectWithDescriptions}
      </div>
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectWithDescriptionsRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select with "create new item" functionality', () => (
    <Spaced>
      <div style={{ width: '300px' }}>
        {SmartSelectWithCreateNewItem}
      </div>
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectWithCreateNewItemRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  .add('Multi select with footer', () => (
    <Spaced title="Multi select with footer">
      <div style={{ width: '300px' }}>
        {SmartSelectWithFooter}
      </div>
      <CodeWrapper>
        <Code language="js" showLineNumbers={false} text={SmartSelectWithFooterRaw} />
      </CodeWrapper>
    </Spaced>
  ))
  ;
