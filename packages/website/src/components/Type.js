import React from 'react';
import styled from 'styled-components';
import { akGridSizeUnitless, akColorN100 } from '@atlaskit/util-shared-styles';

export const Heading = props => <StyledHeading {...props} />;
export const Intro = props => <StyledIntro {...props} />;
export const Section = props => <StyledSection {...props} />;

const StyledHeading = styled.h1`
  font-size: ${akGridSizeUnitless * 4}px;
  font-weight: 500;

  /* override css reset */
  &, &:first-child {
    margin-top: 1em;
  }
  @media (min-width: 600px) {
    &, &:first-child {
      margin-top: ${akGridSizeUnitless * 6}px;
    }
  }
`;
const StyledIntro = styled.p`
  color: ${akColorN100};
  font-size: ${akGridSizeUnitless * 2}px;
  font-weight: 300;
  line-height: 1.4em;
`;

const StyledSection = styled.section`
  margin-top: 3em;

  p {
    line-height: 1.4em;
  }
`;
