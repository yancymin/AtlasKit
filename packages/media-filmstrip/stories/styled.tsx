/* tslint:disable:variable-name */
import styled from 'styled-components';
import {
  akColorN30,
  akColorB50
} from '@atlaskit/util-shared-styles';

export const OverflowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 150px;
  margin: 40px;
  padding: 10px;

  position: relative;
  overflow: auto;
  border: solid 2px ${akColorN30};
  border-radius: 3px;
`;

export const Spacer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 200px;
  margin: 20px 0;

  background-color: ${akColorB50};
  border-radius: 3px;
`;

export const LazyWrapper = styled.div`
  width: 1000px;
  overflow: hidden;
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
