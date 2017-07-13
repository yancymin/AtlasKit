/* tslint:disable:variable-name */
import styled from 'styled-components';
import {
  akColorB400,
  akColorN20,
  akColorN40,
  akColorB50
} from '@atlaskit/util-shared-styles';

export const FilmStripViewWrapper = styled.div`
  position: relative;
  padding: 3px 0;
  border-radius: 3px;

  &:hover .arrow {
    opacity: 1;
  }

  .ellipsed-text {
    white-space: initial;
  }
`;

export const FilmStripListWrapper = styled.div`
  width: inherit;
  overflow: hidden;
  line-height: 0;
  padding: 2px 0;
`;

export const FilmStripList = styled.ul`
  margin: 0;
  padding: 0;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  white-space: nowrap;
  display: inline-block;
`;

export const FilmStripListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0 4px;
  display: inline-block;
  vertical-align: middle;

  &:first-child {
    padding-left: 10px;
  }

  &:last-child {
    padding-right: 10px;
  }
`;

export const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${akColorN20};
  border-radius: 100%;
  display: flex;
  cursor: pointer;
  transition: opacity .3s;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.6);
  color: black;
  width: 30px;
  height: 30px;
  justify-content: center;
  opacity: 0;

  &:hover{
    color: black;
    background-color: ${akColorN40};
  }

  &:active{
    color: ${akColorB400};
    background-color: ${akColorB50};
  }
`;

export const ArrowLeftWrapper = styled(ArrowWrapper)`
  left: -14px;

  svg {
    padding-right: 2px;
  }
`;

export const ArrowRightWrapper = styled(ArrowWrapper)`
  right: -14px;

  svg {
    padding-left: 1px;
  }
`;

export const Shadow = styled.div`
  position: absolute;
  z-index: 10;
  height: 100%;
  top: 0;
  width: 2px;
  background-color: rgba(0,0,0,0.2);
`;

export const ShadowLeft = styled(Shadow)`
  left: 0;
`;

export const ShadowRight = styled(Shadow)`
  right: 0;
`;
