import React from 'react';
import styled, { keyframes } from 'styled-components';
import { akColorT500, akAnimationMixins } from '@atlaskit/util-shared-styles';

const { createBold, interpolate } = akAnimationMixins;

const slideAndGrow = {
  property: 'transform',
  value: interpolate`translateY(${t => t}px) scale(${s => s})`,
  deltas: [{ from: 0, to: -100 }, { from: 1, to: 1.2 }],
};
const fadeOutALittle = {
  property: 'opacity',
  deltas: [{ from: 1, to: 0.75 }],
};

const AnimatedElement = styled.div`
  background-color: ${akColorT500};
  border-radius: 3px;
  color: white;
  cursor: zoom-in;
  font-size: 1.6em;
  font-weight: 500;
  min-width: 240px;
  padding: 0.6em 1em;
  text-align: center;

  &:focus {
    animation: ${keyframes`${createBold([slideAndGrow, fadeOutALittle])}`} 1s 1;
  }
`;

export default (
  <AnimatedElement tabIndex="0">
    Focus me!
  </AnimatedElement>
);
