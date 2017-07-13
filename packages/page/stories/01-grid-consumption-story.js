import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import Page, { Grid, GridColumn } from '../src';

import DummyBreadcrumbs from './dummy-breadcrumbs';
import DummyHeader from './dummy-header';
import DummyComment from './dummy-comment';
import DummyCode from './dummy-code';

storiesOf(name, module)
  .add('using grid within components', () => (
    <Page>
      <Grid>
        <GridColumn medium={12}>
          <DummyBreadcrumbs />
        </GridColumn>
        <GridColumn>
          <DummyHeader />
        </GridColumn>
        <GridColumn medium="12">
          <DummyComment />
        </GridColumn>
      </Grid>
      <Grid layout="fluid">
        <GridColumn>
          <DummyCode />
        </GridColumn>
      </Grid>
    </Page>
  ));
