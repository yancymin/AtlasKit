import styled from 'styled-components';
import { akColorN20A, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import { verticalPadding } from '../styled/constants';

const AvatarSectionDiv = styled.div`
  /* -ms- properties are necessary until MS supports the latest version of the grid spec */
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  grid-area: avatar-area;
  /* Unfortunately it's still easier to use a margin here until MS supports grid-gap */
  margin-right: ${akGridSizeUnitless * 2}px;

  [dir="rtl"] & {
    margin-left: ${akGridSizeUnitless * 2}px;
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  grid-template: 
    'avatar-area comment-area'
    '. nested-comments-area'
    / auto 1fr;
  padding-top: ${verticalPadding}px;
  position: relative;

  /* We need both selectors as there is not a common wrapper component around
  comments. We also provide isFirst as an escape hatch. */
  &:first-child,
  &:first-of-type {
    padding-top: 0;
  }
`;

const ContentSectionDiv = styled.div`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: comment-area;
  margin-top: ${akGridSizeUnitless * 0.25}px;
  /* Required for word-wrap: break-word to work in a grid */
  min-width: 0;
  word-wrap: break-word;
`;

const Highlight = styled.div`
  background: ${akColorN20A};
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 2;
  grid-area: 1 / 1 / 2 / 3;
  height: 100%;
  padding: ${akGridSizeUnitless}px ${akGridSizeUnitless}px ${akGridSizeUnitless / 2}px;
  transform: translate(-${akGridSizeUnitless}px, -${akGridSizeUnitless}px);
  width: 100%;

  [dir="rtl"] & {
    transform: translate(${akGridSizeUnitless}px, -${akGridSizeUnitless}px);    
  }
`;

const NestedCommentsDiv = styled.div`
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  grid-area: nested-comments-area;
  margin-top: ${verticalPadding}px;
`;

export {
  AvatarSectionDiv,
  Container,
  ContentSectionDiv,
  Highlight,
  NestedCommentsDiv,
};
