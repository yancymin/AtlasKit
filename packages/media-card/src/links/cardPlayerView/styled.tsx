/* tslint:disable:variable-name */
import styled from 'styled-components';
import {absolute, size, centerSelf, easeInOutCubic, spin} from '../../styles';

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 3px;
  overflow: hidden;

  &.is-played {
    height: 300px;

    iframe {
      pointer-events: all;
      opacity: 1;
    }

    .link-info {
      opacity: 0;
    }
  }

  &.is-loading, &.is-played {
    height: 300px;

    .circle {
      width: 300px;
      height: 184px;
      border-radius: 0;
    }
    .stroke-dotted {
      stroke-width: 4px;
      opacity: 1;
    }
    .stroke-solid {
      opacity: 0;
      stroke-dashoffset: 300;
    }
    .icon {
      transform: scale(1.05);
    }
  }

  iframe {
    ${absolute()}
    ${size()}
    transition: opacity 1s;
    border: 0;
    z-index: 10;
    pointer-events: none;
    opacity: 0;
  }

  .link-info {
    transition: opacity 1s;
    opacity: 1;
  }

  // PLAY BUTTON

  .stroke-dotted {
    opacity: 0;
    stroke-dasharray: 4,5;
    stroke-width: 1px;
    transform-origin: 50% 50%;
    animation: ${spin} 4s infinite linear;
    transition: opacity 1s ease, stroke-width 1s ease;
  }
  .stroke-solid {
    stroke-dashoffset: 0;
    stroke-dasharray: 300;
    stroke-width: 4px;
    transition: stroke-dashoffset 1s ease, opacity 1s ease;
  }

  .icon {
    transform-origin: 50% 50%;
    transition: transform 200ms ease-out;
  }

  #play {
    ${centerSelf}
  }
`;

export const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100% - 116px);
  color: white;
  width: 100%;
  cursor: pointer;

  &:hover {
    .circle {
      width: 300px;
      height: 184px;
      border-radius: 0;
    }
  }
`;

export const Circle = styled.div`
  ${size(40)}
  ${centerSelf}
  background: rgba(23, 43, 77, 0.75);
  border-radius: 100%;
  transition: all .3s ${easeInOutCubic};
`;

export const AnimatedButton = styled.div`
  ${centerSelf}

  svg {
    height: 40px;
  }
`;
