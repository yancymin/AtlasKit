// @flow
import { Component } from 'react';
import invariant from 'invariant';
import getScrollPosition from '../get-scroll-position';
import getDimension from '../../state/get-dimension';
// eslint-disable-next-line no-duplicate-imports
import type { Margin } from '../../state/get-dimension';
import type { Dimension } from '../../types';
import type { Props } from './dimension-publisher-types';

export default class DimensionPublisher extends Component {
  /* eslint-disable react/sort-comp */
  props: Props
  /* eslint-enable */
  getDimension = (): Dimension => {
    const { itemId, targetRef } = this.props;
    invariant(targetRef, 'DimensionPublisher cannot calculate a dimension when not attached to the DOM');

    const style = window.getComputedStyle(targetRef);

    const margin: Margin = {
      top: parseInt(style.marginTop, 10),
      right: parseInt(style.marginRight, 10),
      bottom: parseInt(style.marginBottom, 10),
      left: parseInt(style.marginLeft, 10),
    };

    return getDimension(
      itemId,
      targetRef.getBoundingClientRect(),
      margin,
      getScrollPosition(),
    );
  }

  // TODO: componentDidUpdate?
  componentWillReceiveProps(nextProps: Props) {
    // Because the dimension publisher wraps children - it might render even when its props do
    // not change. We need to ensure that it does not publish when it should not.

    if (!this.props.shouldPublish && nextProps.shouldPublish) {
      this.props.publish(this.getDimension());
    }
  }

  render() {
    return this.props.children;
  }
}
