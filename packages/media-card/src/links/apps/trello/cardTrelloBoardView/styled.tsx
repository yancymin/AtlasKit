/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN300 } from '@atlaskit/util-shared-styles';
import { size, ellipsis } from '../../../../styles';

export const Title = styled.div`
  user-select: text;

  .ellipsed-text {
    font-size: 14px;
  }
`;

export const Description = styled.div`
  user-select: text;

  .ellipsed-text {
    font-size: 12px;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 10px);

  img {
    ${size(16)}
    margin-right: 5px;
  }

  a {
    user-select: text;
    display: block;
    font-size: 12px;
    color: ${akColorN300};

    ${ellipsis()}
  }
`;

export const Menu = styled.div`
  position: relative;
`;

export const Header = styled.div`
`;

export const Lists = styled.div`
  ul {
    display: inline-block;
    list-style: none;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  li {
    display: inline-block;
    margin: 0 5px;
    text-transform: capitalize;
  }
`;
