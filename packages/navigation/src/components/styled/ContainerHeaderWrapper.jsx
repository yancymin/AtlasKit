import styled from 'styled-components';
import { layout, resizeAnimationTime, gridSize } from '../../shared-variables';
import { getProvided, whenCollapsed } from '../../theme/util';

const keylineHeight = 2;
const paddingOpen = (() => {
  const paddingLeft = layout.padding.side + (gridSize * 1.75);
  const paddingRight = layout.padding.side + (gridSize * 1.5);
  const paddingBottom = (gridSize * 1.5) - keylineHeight;

  return `${layout.padding.top}px ${paddingLeft}px ${paddingBottom}px ${paddingRight}px`;
})();
const supportsStickyCondition = '@supports(position: sticky) or (position: -webkit-sticky)';

const ContainerHeaderWrapper = styled.div`
  /* the keyline will be drawn over the margin */
  margin-bottom: ${keylineHeight}px;
  padding: ${paddingOpen};

  ${supportsStickyCondition} {
    /* use the background color of the parent */
    background-color: inherit;
    position: sticky;
    top: 0px;
    z-index: 2;

    /* keyline */
    &::after {
      background-color: ${({ isContentScrolled, theme }) => (isContentScrolled ? getProvided(theme).keyline : 'none')};
      bottom: -${keylineHeight}px;
      border-radius: 1px;
      content: "";
      height: ${keylineHeight}px;
      left: ${gridSize}px;
      position: absolute;
      right: ${gridSize}px;
      transition: background-color ${resizeAnimationTime};
    }
  }

  ${whenCollapsed`
    padding: 0;
    /* centering the icon */
    display: flex;
    justify-content: center;

    /* undoing position: sticky */
    ${supportsStickyCondition} {
      background-color: transparent;
      position: static;

      &::after {
        display: none;
      }
    }
  `}
`;

ContainerHeaderWrapper.displayName = 'ContainerHeaderWrapper';

export default ContainerHeaderWrapper;
