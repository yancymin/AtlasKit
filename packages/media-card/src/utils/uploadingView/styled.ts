/* tslint:disable:variable-name */
import styled from 'styled-components';
import {akColorN0, akColorN900} from '@atlaskit/util-shared-styles';
import {absolute, size} from '../../styles';
import {colorWithAlpha} from '../../utils/colorWithAlpha';

const bodyHeight = 26;

export const Wrapper = styled.div`
  position: relative;
  height: inherit;
  border-radius: inherit;
`;

export const Overlay = styled.div`
  ${absolute()}
  ${size()}
  border-radius: inherit;
  background-color: ${colorWithAlpha(akColorN900, 0.5)};
`;

export const Title = styled.div`
  ${absolute()}
  width: 100%;
  padding: 8px;
  color: ${akColorN0};
  font-size: 12px;
  line-height: 18px;
  word-wrap: break-word;
`;

export const Body = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px;
  color: ${akColorN0};
`;

export const ProgressWrapper = styled.div`
  flex-grow: 1;

  /*
    force the height to always be 20px (the height of the cancel icon),
    so that the height of the progress bar doesn't jump when cards with
    and without a cancel icon are rendered side-by-side.
  */
  height: ${bodyHeight}px;

  /*
    vertically center the progress bar within the 20px, keeping the progress bar full width
  */
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

export const CancelButtonWrapper = styled.div`
  margin-left: 4px;
  /*
    button must appear above overlay
   */
  z-index: 2;
`;
