// @flow
import React, { PureComponent } from 'react';
import { TransitionGroup } from 'react-transition-group';

import SpinnerGlyph from './SpinnerGlyph';
import type { SpinnerProps } from './types';

export default class Spinner extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  props: SpinnerProps

  static defaultProps = {
    delay: 100,
    isCompleting: false,
    invertColor: false,
    onComplete: () => {},
    size: 'small',
  }

  render() {
    const { isCompleting, ...glyphProps } = this.props;
    return (
      <TransitionGroup
        component="div"
        style={{ display: 'inline-block' }}
      >
        {!isCompleting ? (
          <SpinnerGlyph key={Date.now()} {...glyphProps} />
        ) : null}
      </TransitionGroup>
    );
  }
}
