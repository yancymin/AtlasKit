import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const Dummy = styled.div`
  background: #fea;
`;
const DummyNested = styled.div`
  background: #afe;
`;

storiesOf(name, module)
  .add('nested grids', () => (
    <Page>
      <Grid spacing={'cosy'}>
        <GridColumn medium={8}>
          <Dummy>
            This content sits inside a column of width 8. The text is before the nested grid.
            <Grid>
              <GridColumn medium={4}>
                <DummyNested>4 col</DummyNested>
              </GridColumn>
              <GridColumn medium={4}>
                <DummyNested>4 col</DummyNested>
              </GridColumn>
            </Grid>
            This content sits after the nested grid. Notice how the grid pulls itself out into
            the margins of the column its in.
          </Dummy>
        </GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <p>
        This story is used to verify that nested grids apply negative margins and line up correctly.
      </p>
    </Page>
  ))
  .add('nested grids with oversized column', () => (
    <Page>
      <Grid>
        <GridColumn medium={8}>
          <Dummy>
            This content sits inside a column of width 8. The text is before the nested grid.
            <Grid>
              <GridColumn medium={10}>
                <DummyNested>10 col</DummyNested>
              </GridColumn>
              <GridColumn medium={10}>
                <DummyNested>10 col</DummyNested>
              </GridColumn>
            </Grid>
            This content sits after the nested grid. Notice how the grid pulls itself out into
            the margins of the column its in.
          </Dummy>
        </GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <p>
        This story is used to verify nested grids which contain columns wider than what they have
        available to them do not overflow the parent column. In this case there is an 8 column
        grid which contains a nested grid that has two columns that should span 10 columns each.
        Because there are only 8 columns available they sit at the max width instead of overflowing
        the parent.
      </p>
    </Page>
  ));
