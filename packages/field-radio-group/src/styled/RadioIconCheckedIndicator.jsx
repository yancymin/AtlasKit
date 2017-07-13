import styled from 'styled-components';
import {
  fullWidth,
  fullHeight,
  height,
  innerHeight,
  innerWidth,
  selectedColor,
  width,
} from './constants';

const getLeft = props => ((props.isFocus ? fullWidth : width) - innerWidth) / 2;
const getTop = props => ((props.isFocus ? fullHeight : height) - innerHeight) / 2;

const RadioIconCheckedIndicator = styled.div`
  background-color: ${selectedColor};
  border-radius: 50%;
  display: block;
  height: ${innerHeight}px;
  left: ${getLeft}px;
  position: absolute;
  top: ${getTop}px;
  width: ${innerWidth}px;
`;

RadioIconCheckedIndicator.displayName = 'RadioIconCheckedIndicator';

export default RadioIconCheckedIndicator;
