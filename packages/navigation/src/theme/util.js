// @flow
import React, { PureComponent } from 'react';
import { css, ThemeProvider } from 'styled-components';
import hasOwnProperty from '../utils/has-own-property';
import type { Provided, RootTheme, GroupTheme } from '../theme/types';
import { container } from './presets';

export const prefix = (key: string): string => `@atlaskit-private-theme-do-not-use/navigation:${key}`;
const rootKey = prefix('root');
const groupKey = prefix('group');

export const getProvided = (map?: Object): Provided => {
  if (map !== undefined && hasOwnProperty(map, rootKey)) {
    return map[rootKey].provided;
  }
  return container;
};
export const isCollapsed = (map: Object): bool => map[rootKey].isCollapsed;

export const isInCompactGroup = (map: Object): bool => {
  if (!hasOwnProperty(map, groupKey)) {
    return false;
  }
  return map[groupKey].isCompact;
};

export const whenCollapsed = (...args: Array<mixed>) => css`
  ${({ theme }) => (isCollapsed(theme) ? css(...args) : '')}
`;

export class WithRootTheme extends PureComponent {
  static defaultProps = {
    isCollapsed: false,
  }

  props: {
    provided: Provided,
    isCollapsed?: boolean,
    children?: any
  }

  withOuterTheme = (outerTheme: ?Object = {}) => {
    const theme: RootTheme = {
      provided: this.props.provided,
      isCollapsed: (this.props.isCollapsed || false),
    };

    return {
      ...outerTheme,
      [rootKey]: theme,
    };
  }

  render() {
    return (
      <ThemeProvider
        theme={outerTheme => this.withOuterTheme(outerTheme)}
      >
        {this.props.children}
      </ThemeProvider>
    );
  }
}

// This could be moved to a location closer to NavigationGroup.
// However, it is simplest to keep it here for now so that we
// can see all of the theme related utils in one place.
// Also, it could be good in the future to have a base WithTheme
// that WithRootTheme and WithGroupTheme use. It is done this way
// for now to ensure the strongest possible flow typing
// eslint-disable-next-line react/no-multi-comp
export class WithGroupTheme extends PureComponent {
  props: {
    isCompact: boolean,
    children?: any
  }

  withOuterTheme = (outerTheme?: Object = {}): Object => {
    const theme: GroupTheme = {
      isCompact: this.props.isCompact,
    };

    return {
      ...outerTheme,
      [groupKey]: theme,
    };
  }

  render() {
    return (
      <ThemeProvider
        theme={outerTheme => this.withOuterTheme(outerTheme)}
      >
        {this.props.children}
      </ThemeProvider>
    );
  }
}
