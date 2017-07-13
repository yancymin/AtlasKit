import styled from 'styled-components';
import { TRANSITION_DURATION } from './constants';

export const getMaxHeight = ({ isOpen }) => (isOpen ? '52px' : 0);

export default styled.div`
  max-height: ${getMaxHeight};
  overflow: hidden;
  transition: max-height ${TRANSITION_DURATION};
`;
