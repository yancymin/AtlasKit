import styled, { css, keyframes } from 'styled-components';
import {
  akAnimationMixins,

  akColorB500,
  akColorP500,
  akColorR500,
} from '@atlaskit/util-shared-styles';

// map keyframes
const { createBold, createCombined, createOptimistic, interpolate } = akAnimationMixins;
const slideUp = {
  property: 'transform',
  value: interpolate`translateY(${t => t}px)`,
  deltas: [{ from: 0, to: -200 }],
};
const combinedAnimation = keyframes`${createCombined([{ ...slideUp,
  value: interpolate`translateY(${t => t}px) rotate(45deg)`,
}])}`;

const ANIMATION_STYLE = {
  bold: `animation: ${keyframes`${createBold([slideUp])}`} 1s 1;`,
  optimistic: `animation: ${keyframes`${createOptimistic([slideUp])}`} 1s 1;`,
  combined: `animation: ${combinedAnimation} 1s 1;`,
};

// map box style
const BOX_STYLE = {
  bold: css`
    background-color: ${akColorB500};
    border-radius: 10px;
  `,
  optimistic: css`
    background-color: ${akColorR500};
    border-radius: 100%;
  `,
  combined: css`
    background-color: ${akColorP500};
    border-radius: 35px;
    transform: rotate(45deg);

    span {
      display: block;
      transform: rotate(-45deg);
    }
  `,
};

export const Box = styled.div`
  ${({ appearance }) => BOX_STYLE[appearance]}
  ${({ appearance, isAnimating }) => (isAnimating ? ANIMATION_STYLE[appearance] : null)}
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  height: 100px;
  line-height: 100px;
  margin: 30px;
  text-align: center;
  width: 100px;
`;

export const Container = styled.div`
  margin: auto;
  padding: 40px 20px;
  width: 540px;
`;
