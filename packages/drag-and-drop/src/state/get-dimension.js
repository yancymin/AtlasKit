// @flow
import type { Id, Dimension, DimensionFragment, Position } from '../types';

export type ClientRect = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
|}

export type Margin = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
|}

export default (
  id: Id,
  clientRect: ClientRect,
  margin: Margin,
  scroll: Position,
): Dimension => {
  const { top, right, bottom, left, width, height } = clientRect;

  // getBoundingClientRect returns values relative to the current viewport
  // It does not consider the distance from the top of the document
  // https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
  // https://stackoverflow.com/a/27129257/1374236
  const withScroll = {
    top: top + scroll.y,
    right: right + scroll.x,
    left: left + scroll.x,
    bottom: bottom + scroll.y,
  };

  const withoutMargin: DimensionFragment = {
    top: withScroll.top,
    right: withScroll.right,
    left: withScroll.left,
    bottom: withScroll.bottom,
    width,
    height,
  };

  const withMargin: DimensionFragment = {
    top: (withScroll.top + margin.top),
    right: (withScroll.right + margin.right),
    left: (withScroll.left + margin.left),
    bottom: (withScroll.bottom + margin.bottom),
    width: width + margin.left + margin.right,
    height: height + margin.bottom + margin.top,
  };

  const dimension: Dimension = {
    id,
    withoutMargin,
    withMargin,
    // Not considering margins when calculating the center position
    center: {
      x: (withScroll.left + withScroll.right) / 2,
      y: (withScroll.top + withScroll.bottom) / 2,
    },
  };

  return dimension;
};
