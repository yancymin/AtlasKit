import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';

import DrawerWidthNavigation from './components/DrawerWidthNavigation';
import { name } from '../package.json';

storiesOf(name, module)
  .add('with custom drawer widths', () => (
    <Page navigation={<DrawerWidthNavigation />}>
      <Grid layout="fixed">
        <GridColumn medium={12}>
          <h1>testing this</h1>
        </GridColumn>
      </Grid>
    </Page>
  ));
