// @flow
import styled from 'styled-components';
import { item as itemStyles } from '../../shared-variables';
import { focusOutline } from '../../utils/mixins';
import { isInCompactGroup, getProvided } from '../../theme/util';

const itemBorderRadius = itemStyles.borderRadius;

const getItemOrDropdown = ({ theme, isDropdown }) =>
    getProvided(theme)[isDropdown ? 'dropdown' : 'item'];

const NavigationItemOuter = styled.div`
  border-radius: ${itemBorderRadius}px;
  box-sizing: border-box;
  height: ${({ theme }) => (isInCompactGroup(theme) ? itemStyles.width.compact : itemStyles.width.standard)}px;
  position: relative;

  /* AK-2548: rather than targeting like this - the styles should be applied on the InteractionWrapper */
  button, a {
    background-color: ${(props) => {
      const item = getItemOrDropdown(props);
      if (props.isSelected) {
        return item.selected.background;
      }
      return item.default.background;
    }};
    border-radius: ${itemBorderRadius}px;
    color: ${(props) => {
      const item = getItemOrDropdown(props);

      // selected.text is optional
      if (props.isSelected && item.selected.text) {
        return item.selected.text;
      }
      return getProvided(props.theme).text;
    }};
    display: block;
    height: 100%;
    /* In theory this wouldn't be required, but Chrome does not place focus styles correctly without it */
    position: relative;
    text-decoration: none;

    &:focus {
      ${({ theme }) => focusOutline(getProvided(theme).item.focus.outline)}
    }

    &:hover {
      background-color: ${props => props.isHoverStylesEnabled && getItemOrDropdown(props).hover.background};
    }

    &:active {
      background-color: ${props => getItemOrDropdown(props).active.background};
    }
  }
`;

NavigationItemOuter.displayName = 'NavigationItemOuter';
export default NavigationItemOuter;
