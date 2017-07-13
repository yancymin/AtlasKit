import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const Dummy = styled.div`
  background: #fea;
`;

storiesOf(name, module)
  .add('grid spacing="cosy" (default)', () => (
    <Page>
      <Grid>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid layout="fluid">
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <p>This story is used to verify the spacing values for cosy (the default) grids.</p>
    </Page>
  ))
  .add('grid spacing="compact"', () => (
    <Page>
      <Grid spacing="compact">
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <Grid spacing="compact">
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid layout="fluid" spacing="compact">
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <p>This story is used to verify the spacing values for compact grids.</p>
    </Page>
  ))
  .add('grid spacing="comfortable"', () => (
    <Page>
      <Grid spacing="comfortable">
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid spacing="comfortable">
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
      </Grid>
      <Grid spacing="comfortable">
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <Grid spacing="comfortable">
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid layout="fluid" spacing="comfortable">
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <p>This story is used to verify the spacing values for comfortable grids.</p>
    </Page>
  ));
