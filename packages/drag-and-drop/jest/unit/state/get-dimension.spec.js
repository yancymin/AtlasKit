// @flow
import { expect } from 'chai';
import getDimension from '../../../src/state/get-dimension';
// eslint-disable-next-line no-duplicate-imports
import type { Margin, ClientRect } from '../../../src/state/get-dimension';
import type { Id, Position, Dimension, DimensionFragment } from '../../../src/types';

const id: Id = 'item-id';
const clientRect: ClientRect = {
  top: 0,
  right: 100,
  bottom: 80,
  left: 20,
  width: 80,
  height: 80,
};
const noScroll: Position = {
  x: 0,
  y: 0,
};
const noMargin: Margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

describe('Get dimension', () => {
  it('should return a dimension without margins', () => {
    const withoutMargin: DimensionFragment = {
      top: clientRect.top,
      right: clientRect.right,
      bottom: clientRect.bottom,
      left: clientRect.left,
      width: clientRect.width,
      height: clientRect.height,
    };

    const dimension: Dimension = getDimension(
      id, clientRect, noMargin, noScroll,
    );

    expect(dimension.withoutMargin).to.deep.equal(dimension.withMargin);
    expect(dimension.withoutMargin).to.deep.equal(withoutMargin);
  });

  it('should consider margins when producing the withMargin fragment', () => {
    const margin: Margin = {
      top: 10,
      right: 20,
      bottom: 30,
      left: 40,
    };
    const withMarginFragment: DimensionFragment = {
      top: clientRect.top + margin.top,
      right: clientRect.right + margin.right,
      bottom: clientRect.bottom + margin.bottom,
      left: clientRect.left + margin.left,
      width: clientRect.width + margin.left + margin.right,
      height: clientRect.height + margin.bottom + margin.top,
    };

    const dimension: Dimension = getDimension(
      id, clientRect, margin, noScroll,
    );

    expect(dimension.withMargin).to.deep.equal(withMarginFragment);
  });

  it('should consider the scroll position in both withMargin and withoutMargin fragments', () => {
    const scroll: Position = {
      x: 100,
      y: 200,
    };
    const margin: Margin = {
      top: 10,
      right: 20,
      bottom: 30,
      left: 40,
    };
    const withoutMargin: DimensionFragment = {
      top: clientRect.top + scroll.y,
      right: clientRect.right + scroll.x,
      bottom: clientRect.bottom + scroll.y,
      left: clientRect.left + scroll.x,
      width: clientRect.width,
      height: clientRect.height,
    };
    const withMargin: DimensionFragment = {
      top: withoutMargin.top + margin.top,
      right: withoutMargin.right + margin.right,
      bottom: withoutMargin.bottom + margin.bottom,
      left: withoutMargin.left + margin.left,
      width: withoutMargin.width + margin.left + margin.right,
      height: withoutMargin.height + margin.top + margin.bottom,
    };

    const dimension: Dimension = getDimension(
      id, clientRect, margin, scroll,
    );

    expect(dimension.withMargin).to.deep.equal(withMargin);
    expect(dimension.withoutMargin).to.deep.equal(withoutMargin);
  });

  it('should not consider margins when calculating the center positions', () => {
    const scroll: Position = {
      x: 100,
      y: 200,
    };
    const margin: Margin = {
      top: 10,
      right: 20,
      bottom: 30,
      left: 40,
    };
    const withoutMargin: DimensionFragment = {
      top: clientRect.top + scroll.y,
      right: clientRect.right + scroll.x,
      bottom: clientRect.bottom + scroll.y,
      left: clientRect.left + scroll.x,
      width: clientRect.width,
      height: clientRect.height,
    };

    const dimension: Dimension = getDimension(
      id, clientRect, margin, scroll,
    );

    expect(dimension.center).to.deep.equal({
      x: (withoutMargin.left + withoutMargin.right) / 2,
      y: (withoutMargin.top + withoutMargin.bottom) / 2,
    });
  });
});
