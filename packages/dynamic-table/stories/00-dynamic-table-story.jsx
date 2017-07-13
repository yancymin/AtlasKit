import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';
import { name } from '../package.json';
import DynamicTable, { DynamicTableStateless } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import Readme from './examples/readme';
import SampleDataRaw from '!raw!./examples/sample-data';
import OverviewStatelessExample from './examples/overview-stateless';
import OverviewStatelessExampleRaw from '!raw!./examples/overview-stateless';
import OverviewStatefulExample from './examples/overview-stateful';
import OverviewStatefulExampleRaw from '!raw!./examples/overview-stateful';
import LotsOfPagesExample from './examples/with-lots-of-pages';
import LotsOfPagesExampleRaw from '!raw!./examples/with-lots-of-pages';
import HeadlessExample from './examples/headless';
import HeadlessExampleRaw from '!raw!./examples/headless';
import FixedSizeExample from './examples/fixed-size';
import FixedSizeExampleRaw from '!raw!./examples/fixed-size';
import EmptyViewWithBodyExample from './examples/empty-view-with-body';
import EmptyViewWithBodyExampleRaw from '!raw!./examples/empty-view-with-body';
import EmptyViewWithoutBodyExample from './examples/empty-view-without-body';
import EmptyViewWithoutBodyExampleRaw from '!raw!./examples/empty-view-without-body';
import EmptyViewWithBodyNoHeaderExample from './examples/empty-view-with-body-and-no-header';
import EmptyViewWithBodyNoHeaderExampleRaw from '!raw!./examples/empty-view-with-body-and-no-header';
/* eslint-enable import/no-duplicates, import/first */

const propDescriptionsCommon = {
  caption: 'Table\'s caption',
  head: 'Table\'s <thead> content',
  rows: 'Table\'s <tbody> content',
  emptyView: 'React node to be displayed when table contains no data',
  isFixedSize: 'Adds `table-layout: fixed` css rule to the table. Affects whether the columns can be truncated',
  rowsPerPage: 'Max number of rows to be displayed per page',
  onSetPage: 'Callback invoked on pagination navigation',
  onSort: 'Callback invoked on sorting',
};
const propTypesCommon = {
  caption: 'node',
  head: 'shape',
  rows: 'array',
  emptyView: 'node',
  isFixedSize: 'bool',
  rowsPerPage: 'int',
  onSetPage: 'func',
  onSort: 'func',
};

const propDescriptionsStateless = {
  ...propDescriptionsCommon,
  sortKey: 'Key to sort rows by',
  sortOrder: 'Sort order',
  page: 'Page displayed',
};
const propTypesStateless = {
  ...propTypesCommon,
  sortKey: 'string',
  sortOrder: 'string ("ASC" or "DESC")',
  page: 'int',
};
const propDescriptionsStateful = {
  ...propDescriptionsCommon,
  defaultSortKey: 'Default key to sort rows by',
  defaultSortOrder: 'Default sorting order',
  defaultPage: 'Page to display by default',
};
const propTypesStateful = {
  ...propTypesCommon,
  defaultSortKey: 'string',
  defaultSortOrder: 'string',
  defaultPage: 'int',
};

storiesOf(name, module)
  .add('📖 DynamicTable readme', () => (
    <Chrome title="📖 DynamicTable readme">
      {Readme}
    </Chrome>
  ))
  .add('DynamicTable (stateful): overview', () => (
    <Chrome title="DynamicTable (stateful): overview">
      <Description>
        <p>Table component with pagination and sorting functionality.</p>
      </Description>
      <OverviewStatefulExample />
      <Code>
        {OverviewStatefulExampleRaw}
      </Code>
      <Code>
        {SampleDataRaw}
      </Code>
      <Props
        component={DynamicTable}
        descriptions={propDescriptionsStateful}
        types={propTypesStateful}
      />
    </Chrome>
  ))
  .add('DynamicTable (stateless): overview', () => (
    <Chrome title="DynamicTable (stateless): overview">
      <Description>
        <p>Table component with pagination and sorting functionality.</p>
      </Description>
      <OverviewStatelessExample />
      <Code>
        {OverviewStatelessExampleRaw}
      </Code>
      <Props
        component={DynamicTableStateless}
        descriptions={propDescriptionsStateless}
        types={propTypesStateless}
      />
    </Chrome>
  ))
  .add('With a lot of pages', () => (
    <Chrome title="DynamicTable with a lot of pages">
      <LotsOfPagesExample />
      <Code>
        {LotsOfPagesExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Fixed size table with truncated cells', () => (
    <Chrome title="Fixed size table with truncated cells">
      <Description>
        {
          `Setting "isFixedSize={true}" will force all cells in the columns
           with "shouldTruncate={true}" to truncate and display ellipsis in overflowing text.`
      }
      </Description>
      <FixedSizeExample />
      <Code>
        {FixedSizeExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('"Headless" table', () => (
    <Chrome title={'"Headless" table'}>
      <Description>
        <p>Table component without `head` prop</p>
      </Description>
      <HeadlessExample />
      <Code>
        {HeadlessExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Empty view without body, but with header', () => (
    <Chrome title="Empty view without body, but with header">
      <Description>
        <p>Table component without `emptyView` prop passed in</p>
      </Description>
      <EmptyViewWithoutBodyExample />
      <Code>
        {EmptyViewWithoutBodyExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Empty view with body and header', () => (
    <Chrome title="Empty view with body and header">
      <Description>
        <p>Table component with `emptyView` prop passed in</p>
      </Description>
      <EmptyViewWithBodyExample />
      <Code>
        {EmptyViewWithBodyExampleRaw}
      </Code>
    </Chrome>
  ))
  .add('Empty view with body, but without header', () => (
    <Chrome title="Empty view with body, but without header">
      <Description>
        <p>Table component with `emptyView` prop passed in, but no `head` prop</p>
      </Description>
      <EmptyViewWithBodyNoHeaderExample />
      <Code>
        {EmptyViewWithBodyNoHeaderExampleRaw}
      </Code>
    </Chrome>
  ));
