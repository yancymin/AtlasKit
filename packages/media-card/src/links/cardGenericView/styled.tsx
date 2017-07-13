/* tslint:disable:variable-name */
import styled from 'styled-components';
import { akColorN20, akColorN800, akColorB400, akColorN70, akColorN300 } from '@atlaskit/util-shared-styles';
import { size, ellipsis, antialiased } from '../../styles';
import { Href, HrefProps } from '../../utils/href';

export const Title = styled.div`
  ${ellipsis('100%')}
  font-weight: 500;
  color: ${akColorN800};
  user-select: text;
  font-size: 14px;
`;

export const Description = styled.div`
  user-select: text;
  overflow: hidden;
  color: ${akColorN800};
  .ellipsed-text {
    font-size: 12px;
    white-space: initial;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Link = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);

  img {
    ${size(16)}
    margin-right: 5px;
  }

  span {
    user-select: text;
    display: block;
    font-size: 12px;
    color: ${akColorN300};
    text-decoration: none;

    ${ellipsis(230)}
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${size()}

  padding: 16px;
  background: ${akColorN20};
`;

export const ErrorHeader = styled.div`
  color: ${akColorN70};
  ${antialiased}

  font-weight: bold;
  font-size: 12px;
  line-height: 15px;

  ${ellipsis('calc(100% - 24px)')}
`;

export const A = styled(Href)`
  color: initial;
  // We need to do this to make TS happy
  ${(props: HrefProps) => ''}
  &:hover {
    .card-title {
      color: ${akColorB400};
    }

    .details {
      background-color: #e7e9ed;
    }
  }
`;
