import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const Dummy = styled.div`
  background: #fea;
`;

storiesOf(name, module)
  .add('grid layout="fixed" (default)', () => (
    <Page>
      <Grid>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn><Dummy>Unspecified</Dummy></GridColumn>
      </Grid>
      <p>The above grid should have a max width of around 12 x 80px.</p>
    </Page>
  ))
  .add('grid layout="fluid"', () => (
    <Page>
      <Grid layout="fluid">
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn><Dummy>Unspecified</Dummy></GridColumn>
      </Grid>
      <p>The above grid should have no max width.</p>
    </Page>
  ));
