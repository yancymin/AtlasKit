import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import styled from 'styled-components';

import { Grid, GridColumn } from '../src';

const CommentHeader = styled.div`
  padding: 20px 0;
`;
const RightButtons = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  width: 100%;
`;

export default class Dummy extends PureComponent {
  render() {
    return (
      <Grid spacing="comfortable">
        <GridColumn>
          <CommentHeader>
            <h1>Commit</h1>
          </CommentHeader>
        </GridColumn>
        <GridColumn>
          <RightButtons>
            <ButtonGroup>
              <Button>Approve</Button>
              <Button>Decline</Button>
              <Button>Edit</Button>
            </ButtonGroup>
          </RightButtons>
        </GridColumn>
      </Grid>
    );
  }
}
