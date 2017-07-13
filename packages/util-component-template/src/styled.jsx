import styled from 'styled-components';
import {
  akColorB200,
  akColorG300,
  akColorP300,
  akColorR400,
  akColorPrimary3,
  akColorG75,
  akGridSize,
  akBorderRadius,
} from '@atlaskit/util-shared-styles';

export const Button = styled.button`
  color: ${akColorPrimary3};
  background-color: ${akColorB200};
  border: 3px solid ${akColorP300};
  border-radius: ${akBorderRadius};
  font-size: 18px;
  padding: ${akGridSize};
  transition: background-color 0.1s ease;

  &:hover {
    cursor: pointer;
    background-color: ${akColorG300};
  }
`;

export const getContainerBackgroundColor = props => (props.isActive ? akColorG75 : akColorR400);

export const Container = styled.div`
  background-color: ${getContainerBackgroundColor};
  display: flex;
  padding: ${akGridSize};
  justify-content: center;
  transition: background-color 0.3s ease;
  width: 400px;
`;
