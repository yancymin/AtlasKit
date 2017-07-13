import styled from 'styled-components';
import { containerClosedWidth } from '../../shared-variables';

const getTransform = ({ horizontalOffset }) => {
  if (!horizontalOffset || horizontalOffset === 0) {
    return '';
  }
  return `transform: translateX(${horizontalOffset}px);`;
};

export default styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  /* allowing the container to collapse down to its min width */
  min-width: ${containerClosedWidth}px;
  ${getTransform}

   /* make full height */
  display: flex;
`;

