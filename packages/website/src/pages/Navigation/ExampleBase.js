/* eslint-disable react/prop-types, no-confusing-arrow */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { Grid, GridColumn } from '@atlaskit/page';
import Button from '@atlaskit/button';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

import { DESKTOP_QUERY, MOBILE_QUERY } from '../../../constants';

import { Heading, Section } from '../../components/Type';
import Container from '../../components/Container';
import { LinksToExamples } from './utils';

const NavigationExplanation = () => (
  <div>
    <Section>
      The easiest way to demonstrate nav is to show it. Select any of the examples
      on the side, and the navigation bar will change. The code to render it will
      be displayed for you, so you can understand how it is being rendered.
    </Section>
    <ul>
      {LinksToExamples()}
    </ul>
  </div>
);

const Mobile = () => (
  <MobileIntro>
    <Heading style={{ marginLeft: akGridSizeUnitless * 2 }}>Navigation Examples</Heading>
    <Row>
      <Col width="60%">
        <Button component={Link} to="/components" appearance="primary">
          View Components
        </Button>
      </Col>
    </Row>
    <Container>
      <NavigationExplanation />
    </Container>
  </MobileIntro>
);

const DesktopContent = () => (
  <div>
    <Heading>Navigation Examples</Heading>
    <NavigationExplanation />
  </div>
);
const Desktop = () => (
  <Media query={DESKTOP_QUERY}>
    {matches => matches ? (
      <Grid spacing="comfortable">
        <GridColumn medium={8}>
          <DesktopContent />
        </GridColumn>
      </Grid>
    ) : (
      <Container>
        <DesktopContent />
      </Container>
    )
  }
  </Media>
);

export default class NavigationExample extends PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <meta name="description" content="A set of React components that implements Atlassian Design Guidelines" />
        </Helmet>
        <Media query={MOBILE_QUERY}>
          {matches => matches ? <Mobile /> : <Desktop />}
        </Media>
      </div>
    );
  }
}

const MobileIntro = styled.div`
`;
const Row = styled.div`
  display: flex;
  padding-left: ${akGridSizeUnitless * 2}px;
  padding-top: 40px;
  overflow: hidden;
`;
const Col = styled.div`
  width: ${props => props.width ? props.width : '50%'};
`;
