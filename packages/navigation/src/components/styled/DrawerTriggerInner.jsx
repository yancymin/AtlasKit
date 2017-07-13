// @flow
import styled from 'styled-components';
import { focusOutline } from '../../utils/mixins';
import { getProvided } from '../../theme/util';
import { gridSize } from '../../shared-variables';
import type { Provided } from '../../theme/types';

const getOutline = (props) => {
  const provided: Provided = getProvided(props.theme);

  return focusOutline(provided.item.focus.outline);
};

const DrawerTriggerInner = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: none;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: ${gridSize * 5}px;
  height: ${gridSize * 5}px;
  outline: none;

  /* other color states handled by GlobalItem */

  &:focus {
    ${getOutline}
  }
`;

DrawerTriggerInner.displayName = 'DrawerTriggerInner';
export default DrawerTriggerInner;
