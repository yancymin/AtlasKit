import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import { Link } from 'react-router-dom';
import { ExampleSource } from '../../components/ComponentExample';
import NoMatch from '../NoMatch';
import { matchNavExample, LinksToExamples } from './utils';
import Container from '../../components/Container';
import { Heading, Intro, Section } from '../../components/Type';

export default class extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };
  render() {
    const { router } = this.context;

    const example = matchNavExample(router.route.match.params.exampleName);
    if (example) {
      return (
        <Container>
          <Heading>{example.title}</Heading>
          <Intro>
            An example of the navigation component. The navigation bar on the
            left is rendered by the code below.
          </Intro>
          <p>Back to the website:</p>
          <ButtonGroup>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/patterns/navigation">Navigation</Button>
          </ButtonGroup>
          <p>All Navigation Examples:</p>
          <ul>
            {LinksToExamples()}
          </ul>
          <Section>
            <ExampleSource src={example.src} />
          </Section>
        </Container>
      );
    }
    return <NoMatch />;
  }
}
