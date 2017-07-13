import React, { Component } from 'react';
import { getDisplayName } from '../utils';
import type { ComponentType, ElementType, FunctionType } from '../types';

export default function mapProps(mapping: {}) {
  return (DecoratedComponent: ComponentType) =>
    class MapProps extends Component {
      static displayName: string = getDisplayName('mapProps', DecoratedComponent);
      static DecoratedComponent: ComponentType = DecoratedComponent;

      component: { blur?: FunctionType, focus?: FunctionType };

      // expose blur/focus to consumers via ref
      blur = (e: FocusEvent) => {
        if (this.component.blur) this.component.blur(e);
      }
      focus = (e: FocusEvent) => {
        if (this.component.focus) this.component.focus(e);
      }

      render() {
        const mapped: {} = {
          ...this.props,
          ...Object.keys(mapping).reduce((acc, key) => ({
            ...acc,
            [key]: mapping[key](this.props),
          }), {}),
        };

        return (
          <DecoratedComponent
            ref={(r: ElementType) => (this.component = r)}
            {...mapped}
          />
        );
      }
    };
}
