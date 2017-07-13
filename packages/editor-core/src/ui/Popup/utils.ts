export interface Position {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface CalculatePositionParams {
  placement: [string, string];
  target?: HTMLElement;
  popup?: HTMLElement;
  offset: number[];
}

export function isBody(elem: HTMLElement | Element): boolean {
  return elem === document.body;
}

/**
 * Decides if given fitHeight fits below or above the target taking boundaries into account.
 */
export function getVerticalPlacement(target: HTMLElement, boundariesElement: HTMLElement, fitHeight?: number, alignY?: string): string {
  if (alignY) {
    return alignY;
  }
  if (!fitHeight) {
    return 'bottom';
  }

  const boundariesClientRect = boundariesElement.getBoundingClientRect();
  const { height: boundriesHeight } = boundariesClientRect;
  const boundriesTop = isBody(boundariesElement) ? 0 : boundariesClientRect.top;

  const { top: targetTop, height: targetHeight } = target.getBoundingClientRect();
  const spaceAbove = targetTop - (boundriesTop - boundariesElement.scrollTop);
  const spaceBelow = (boundriesTop + boundriesHeight) - (targetTop + targetHeight);

  if (spaceBelow >= fitHeight || spaceBelow >= spaceAbove) {
    return 'bottom';
  }

  return 'top';
}

/**
 * Decides if given fitWidth fits to the left or to the right of the target taking boundaries into account.
 */
export function getHorizontalPlacement(target: HTMLElement, boundariesElement: HTMLElement, fitWidth?: number, alignX?: string): string {
  if (alignX) {
    return alignX;
  }
  if (!fitWidth) {
    return 'left';
  }

  const { left: targetLeft, width: targetWidth } = target.getBoundingClientRect();
  const { left: boundriesLeft, width: boundriesWidth } = boundariesElement.getBoundingClientRect();
  const spaceLeft = targetLeft - boundriesLeft + targetWidth;
  const spaceRight = (boundriesLeft + boundriesWidth) - targetLeft;

  if (spaceRight >= fitWidth || spaceRight >= spaceLeft) {
    return 'left';
  }

  return 'right';
}

export function calculatePlacement(target: HTMLElement, boundariesElement: HTMLElement, fitWidth?: number, fitHeight?: number, alignX?: string, alignY?: string): [string, string] {
  return [
    getVerticalPlacement(target, boundariesElement, fitHeight, alignY),
    getHorizontalPlacement(target, boundariesElement, fitWidth, alignX),
  ];
}

/**
 * Calculates relative coordinates for placing popup along with the target.
 * Uses placement from calculatePlacement.
 */
export function calculatePosition({ placement, target, popup, offset }: CalculatePositionParams): Position {
  const position: Position = {};

  if (!target || !popup || !popup.offsetParent) {
    return position;
  }

  const popupOffsetParent = popup.offsetParent as HTMLElement;
  const offsetParentStyle = popupOffsetParent.style;
  let borderBottomWidth = 0;
  if (offsetParentStyle && offsetParentStyle.borderBottomWidth) {
    borderBottomWidth = parseInt(offsetParentStyle.borderBottomWidth, 10);
  }
  const [verticalPlacement, horizontalPlacement] = placement;

  const {
    top: popupOffsetParentTop,
    left: popupOffsetParentLeft,
    right: popupOffsetParentRight,
    height: popupOffsetParentHeight
  } = popupOffsetParent.getBoundingClientRect();

  const {
    top: targetTop,
    left: targetLeft,
    right: targetRight,
    height: targetHeight,
  } = target.getBoundingClientRect();

  if (verticalPlacement === 'top') {
    position.bottom = Math.ceil(popupOffsetParentHeight
      - (targetTop - popupOffsetParentTop)
      - (isBody(popupOffsetParent) ? 0 : popupOffsetParent.scrollTop)
      - borderBottomWidth
      + offset[1]);
  } else {
    position.top = Math.ceil((targetTop - popupOffsetParentTop)
      + targetHeight
      + (isBody(popupOffsetParent) ? 0 : popupOffsetParent.scrollTop)
      - borderBottomWidth
      + offset[1]);
  }

  if (horizontalPlacement === 'left') {
    position.left = Math.ceil(targetLeft - popupOffsetParentLeft
      + (isBody(popupOffsetParent) ? 0 : popupOffsetParent.scrollLeft)
      + offset[0]);
  } else {
    position.right = Math.ceil(popupOffsetParentRight - targetRight
      - (isBody(popupOffsetParent) ? 0 : popupOffsetParent.scrollLeft)
      + offset[0]);
  }

  return position;
}

/**
 * Traverse DOM Tree upwards looking for popup parents with "overflow: scroll".
 */
export function findOverflowScrollParent(popup: HTMLElement | null): HTMLElement | false {
  let parent: HTMLElement | null = popup;

  if (!parent) {
    return false;
  }

  while (parent = parent.parentElement) {
    // IE11 on Window 8 doesn't show styles from CSS when accessing through element.style property.
    const style = window.getComputedStyle(parent);
    if (style.overflow === 'scroll' || style.overflowX === 'scroll' || style.overflowY === 'scroll') {
      return parent;
    }
  }

  return false;
}
