// @flow
import React, { PureComponent } from 'react';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupInner from '../styled/NavigationItemGroupInner';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';
import { WithGroupTheme } from '../../theme/util';
import type { ReactElement } from '../../types';

type Props = {|
  /** React element to be displayed to the right of the group header. */
  action?: ReactElement,
  /** React Elements to be displayed within the group. This should generally be
  a collection of NavigationItems. */
  children: ReactElement,
  /** Set whether the text should be compacted. */
  isCompact?: boolean,
  /** Set whether a separator should appear above the group. */
  hasSeparator?: boolean,
  /** Text to appear as heading above group. Will be auto-capitalised. */
  title?: string,
|};

export default class NavigationItemGroup extends PureComponent {
  static defaultProps = {
    isCompact: false,
    hasSeparator: false,
  }

  props: Props

  render() {
    const {
      title,
      action,
      isCompact,
      hasSeparator,
      children,
    } = this.props;

    const wrappedTitle = title ?
      <NavigationItemGroupTitle>{title}</NavigationItemGroupTitle>
      : null;

    const wrappedAction = action ?
      (<NavigationItemGroupAction>
        {action}
      </NavigationItemGroupAction>)
      : null;

    const separator = hasSeparator ? (
      <NavigationItemGroupSeparator />
    ) : null;

    const header = title || action ? (
      <NavigationItemGroupHeader>
        {wrappedTitle}
        {wrappedAction}
      </NavigationItemGroupHeader>
    ) : null;

    return (
      <WithGroupTheme
        isCompact={isCompact}
      >
        <div>
          <NavigationItemGroupInner hasHeaderContent={(separator || header)}>
            {separator}
            {header}
            {children}
          </NavigationItemGroupInner>
        </div>
      </WithGroupTheme>
    );
  }
}
