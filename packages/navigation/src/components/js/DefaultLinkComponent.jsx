// @flow
import React, { PureComponent } from 'react';
import type { ReactElement } from '../../types';

type Props = {|
  children: ReactElement,
  className?: string,
  href: string,
  onClick?: () => mixed,
  onMouseDown?: () => mixed,
|}

export default class DefaultLinkComponent extends PureComponent {
  props: Props

  render() {
    const {
      children,
      className,
      href,
      onClick,
      onMouseDown,
    } = this.props;
    return (href ? (
      <a
        className={className}
        href={href}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >{children}</a>
    ) : children);
  }
}
