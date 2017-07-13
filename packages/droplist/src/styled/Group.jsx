import styled from 'styled-components';
import { groupHeadingColor, spacing } from './constants';

export default styled.div`
  box-sizing: border-box;
  display: block;
  margin-top: ${spacing}px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Heading = styled.div`
  align-items: baseline;
  color: ${groupHeadingColor};
  display: flex;
  flex: 1 1 auto;
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: ${spacing}px ${spacing * 1.5}px;
`;
export const HeadingAfter = styled.div`
  flex: 0 0 auto;
`;
export const HeadingText = styled.div`
  flex: 1 1 auto;
  font-size: 12px;
  text-transform: uppercase;
`;
