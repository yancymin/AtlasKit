// @flow
import getScrollPosition from './get-scroll-position';
import type { Position, HTMLElement } from '../types';

export default (el: HTMLElement): Position => {
  const { top, right, bottom, left } = el.getBoundingClientRect();
  const scroll: Position = getScrollPosition();
  const centerX = ((left + scroll.x) + (right + scroll.x)) / 2;
  const centerY = ((top + scroll.y) + (bottom + scroll.y)) / 2;

  return {
    x: centerX,
    y: centerY,
  };
};
