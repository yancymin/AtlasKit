import { storiesOf } from '@kadira/storybook';
import React from 'react';
import styled from 'styled-components';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

const Dummy = styled.div`
  background: #fea;
`;

storiesOf(name, module)
  .add('column sizes', () => (
    <Page>
      <Grid><GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={6}><Dummy>6 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={7}><Dummy>7 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={8}><Dummy>8 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={9}><Dummy>9 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={10}><Dummy>10 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={11}><Dummy>11 col</Dummy></GridColumn></Grid>
      <Grid><GridColumn medium={12}><Dummy>12 col</Dummy></GridColumn></Grid>
      <p>This story is used to verify the widths and margins of the 12 different columns</p>
    </Page>
  ))
  .add('column sizes combined', () => (
    <Page>
      <Grid>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
      </Grid>
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
      <Grid>
        <GridColumn medium={6}><Dummy>6 col</Dummy></GridColumn>
        <GridColumn medium={6}><Dummy>6 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={7}><Dummy>7 col</Dummy></GridColumn>
        <GridColumn medium={5}><Dummy>5 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={8}><Dummy>8 col</Dummy></GridColumn>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={9}><Dummy>9 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={10}><Dummy>10 col</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={11}><Dummy>11 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={12}><Dummy>12 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn><Dummy>unspecified col</Dummy></GridColumn>
      </Grid>
      <p>
        This story is used to verify that rows full of columns that add up to 12 all sit on the
        same line without wrappping.
      </p>
    </Page>
  ))
  .add('column "elasticity"', () => (
    <Page>
      <Grid>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
        <GridColumn><Dummy>unspecified</Dummy></GridColumn>
        <GridColumn medium={2}><Dummy>2 col</Dummy></GridColumn>
      </Grid>
      <p>
        This story is used to verify that columns without specified columns stretch to fill
        available space on a row.
      </p>
    </Page>
  ))
  .add('column wrapping', () => (
    <Page>
      <Grid>
        <GridColumn medium={6}><Dummy>6 col</Dummy></GridColumn>
        <GridColumn medium={8}><Dummy>8 col</Dummy></GridColumn>
        <GridColumn><Dummy>unspecified</Dummy></GridColumn>
      </Grid>
      <p>
        This story is used to verify that 2 columns adding up to greater than 12 do not
        overflow the grid.
      </p>
    </Page>
  ))
  .add('multiple unspecified columns', () => (
    <Page>
      <Grid>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn><Dummy>unspecified</Dummy></GridColumn>
        <GridColumn><Dummy>unspecified</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
      </Grid>
      <Grid>
        <GridColumn medium={4}><Dummy>4 col</Dummy></GridColumn>
        <GridColumn medium={3}><Dummy>3 col</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
        <GridColumn medium={1}><Dummy>1 col</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
        <GridColumn><Dummy>1</Dummy></GridColumn>
      </Grid>
      <p>
        This story is used to verify that columns without a specified column prop (eg medium=4)
        behave like normal flexbox items.
      </p>
    </Page>
  ));
