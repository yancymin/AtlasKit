import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Navigation from '@atlaskit/navigation';
import Banner from '@atlaskit/banner';
import AkToggle from '@atlaskit/toggle';

import Page, { Grid, GridColumn } from '../src';
import { name } from '../package.json';

class ToggleBannerPage extends React.PureComponent {
  state = {
    isBannerOpen: false,
  }

  render() {
    return (
      <Page
        isBannerOpen={this.state.isBannerOpen}
        banner={
          <Banner
            appearance="error"
            isOpen={this.state.isBannerOpen}
          >
            Your JIRA OnDemand license is about to expire.
            There are two days left to renew your license
          </Banner>
        }
        navigation={
          <Navigation
            width={this.state.navigationWidth}
            isOpen={this.state.isNavigationOpen}
            onResize={({ width, isOpen }) => {
              this.setState({
                navigationWidth: width,
                isNavigationOpen: isOpen,
              });
            }}
          >
            Hello world
          </Navigation>
        }
      >
        <Grid>
          <GridColumn>
            <p>Toggle banner</p>
            <AkToggle
              size="large"
              onChange={() => {
                this.setState({
                  isBannerOpen: !this.state.isBannerOpen,
                });
              }}
            >Toggle banner</AkToggle>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

storiesOf(name, module)
  .add('navigation', () => (
    <ToggleBannerPage />
  ));
