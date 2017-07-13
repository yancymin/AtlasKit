import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Code, Chrome, Description, Props } from '@atlaskit/util-readme';
import { name } from '../package.json';
import Pagination, { PaginationStateless } from '../src/';

/* eslint-disable import/no-duplicates, import/first */
import StatelessOverviewExample from './examples/stateless-overview';
import StatelessOverviewExampleRaw from '!raw!./examples/stateless-overview';
import StatefulOverviewExample from './examples/stateful-overview';
import StatefulOverviewExampleRaw from '!raw!./examples/stateful-overview';
import CustomLabelsExample from './examples/custom-labels';
import CustomLabelsExampleRaw from '!raw!./examples/custom-labels';
/* eslint-enable import/no-duplicates, import/first */

const description = '1-indexed pagination component.';

const commonPropDescriptions = {
  total: 'Total number of pages.',
  onSetPage: 'Callback, that is fired upon navigation to a different page.',
  i18n: 'Prev and Next items labels.',
};

const statelessPropDescriptions = {
  current: 'Currently active page.',
  ...commonPropDescriptions,
};

const statefulPropDescriptions = {
  defaultCurrent: 'Initial currently active page.',
  ...commonPropDescriptions,
};

const commonPropTypes = {
  total: 'integer',
  onSetPage: 'func',
  i18n: 'shape',
};

const statelessPropTypes = {
  current: 'integer',
  ...commonPropTypes,
};

const statefulPropTypes = {
  defaultCurrent: 'integer',
  ...commonPropTypes,
};

storiesOf(name, module)
  .add('Pagination (stateless): overview', () => (
    <Chrome title="Pagination (stateless): overview">
      <Description>
        <p>{description}</p>
      </Description>
      <StatelessOverviewExample />
      <Code>
        {StatelessOverviewExampleRaw}
      </Code>
      <Props
        component={PaginationStateless}
        descriptions={statelessPropDescriptions}
        types={statelessPropTypes}
      />
    </Chrome>
  ))
  .add('Pagination (stateless): with lots of pages', () => (
    <Chrome title="Pagination: with lots of pages">
      <Description>
        <p>Shows ellipsis at the end when the current page is close to the first page</p>
      </Description>
      <PaginationStateless
        current={4}
        total={100}
        onSetPage={page => console.log(page)}
      />
      <Description>
        <p>Shows ellipsis on either side when the current page is in the middle</p>
      </Description>
      <PaginationStateless
        current={50}
        total={100}
        onSetPage={page => console.log(page)}
      />
      <Description>
        <p>Shows ellipsis at the start when the current page is close to the last page</p>
      </Description>
      <PaginationStateless
        current={97}
        total={100}
        onSetPage={page => console.log(page)}
      />
    </Chrome>
  ))
  .add('Pagination (stateful): overview', () => (
    <Chrome title="Pagination (stateful): overview">
      <Description>
        <p>{description}</p>
      </Description>
      <StatefulOverviewExample />
      <Code>
        {StatefulOverviewExampleRaw}
      </Code>
      <Props
        component={Pagination}
        descriptions={statefulPropDescriptions}
        types={statefulPropTypes}
      />
    </Chrome>
  ))
  .add('Pagination (stateful): with lots of pages', () => (
    <Chrome title="Pagination (stateful): with lots of pages">
      <Pagination defaultCurrent={1} total={100} onSetPage={page => console.log(page)} />
    </Chrome>
  ))
  .add('Pagination: custom labels', () => (
    <Chrome title="Pagination: custom labels">
      <CustomLabelsExample />
      <Code>
        {CustomLabelsExampleRaw}
      </Code>
    </Chrome>
  ));
