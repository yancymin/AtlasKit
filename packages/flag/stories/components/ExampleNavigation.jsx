import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
import Page, { Grid, GridColumn } from '@atlaskit/page';

export default class Flag extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <Page
        navigation={
          <Navigation isResizeable={false}>
            <AkNavigationItem text="Test page" />
            <AkNavigationItem text="Another page" />
          </Navigation>
        }
      >
        <Grid>
          <GridColumn>{this.props.children}</GridColumn>
        </Grid>
      </Page>
    );
  }
}
