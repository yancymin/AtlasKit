import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Grid, GridColumn } from '@atlaskit/page';

import { Heading, Intro, Section } from '../components/Type';
import landingHero from '../images/landing-hero.svg';

export default class Examples extends PureComponent {
  render() {
    const title = 'Examples';
    const description = 'A guide on how to compose sophisticated interfaces with AtlasKit, Atlassian\'s UI Library';

    return (
      <div>
        <Helmet title={title}>
          <meta name="description" content={description} />
        </Helmet>
        <Grid spacing="comfortable">
          <GridColumn small={12} medium={6}>
            <Heading>{title}</Heading>
            <Intro>{description}</Intro>
            <Section>
              <h3>First Intro Heading</h3>
              <p>
                Macaroon cupcake powder dragée liquorice fruitcake cookie sesame snaps cake.
                Cheesecake gingerbread cupcake soufflé. Powder sweet roll caramels cake toffee
                toffee toffee donut fruitcake.
              </p>
            </Section>
            <Section>
              <h3>Second Intro Heading</h3>
              <p>
                Soufflé muffin jelly beans sugar plum chocolate bar cake jelly. Gummi bears
                sesame snaps tart cotton candy chupa chups tootsie roll wafer biscuit. Sugar
                plum caramels lollipop sesame snaps cookie icing pie biscuit candy.
              </p>
            </Section>
          </GridColumn>
          <GridColumn small={12} medium={6}>
            <p>
              <img
                alt="Landing page hero"
                src={landingHero}
                style={{
                  height: 'auto',
                  marginTop: 48,
                  maxWidth: '100%',
                }}
              />
            </p>
          </GridColumn>
        </Grid>
      </div>
    );
  }
}
