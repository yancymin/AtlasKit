import * as React from 'react';
import { PureComponent } from 'react';
import { akTypographyMixins } from '@atlaskit/util-shared-styles';
import styled from 'styled-components';

const H1 = styled.h1`${akTypographyMixins.h800}`;
const H2 = styled.h2`${akTypographyMixins.h700}`;
const H3 = styled.h3`${akTypographyMixins.h600}`;
const H4 = styled.h4`${akTypographyMixins.h500}`;
const H5 = styled.h5`${akTypographyMixins.h400}`;
const H6 = styled.h6`${akTypographyMixins.h300}`;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Props {
  level: HeadingLevel;
}

export default class Heading extends PureComponent<Props, {}> {
  render() {
    const { level, children } = this.props;
    switch (level) {
      case 1:
        return <H1>{children}</H1>;
      case 2:
        return <H2>{children}</H2>;
      case 3:
        return <H3>{children}</H3>;
      case 4:
        return <H4>{children}</H4>;
      case 5:
        return <H5>{children}</H5>;
      case 6:
        return <H6>{children}</H6>;
    }
  }
}
