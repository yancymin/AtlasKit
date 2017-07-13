// @flow
import React, { PureComponent } from 'react';
import GlobalItemInner from '../styled/GlobalItemInner';
import DefaultLinkComponent from './DefaultLinkComponent';
import type { ReactElement } from '../../types';

type Props = {|
  /** Element to be rendered inside the item. Should be an atlaskit icon. */
  children: ReactElement,
  /** href to pass to linkComponent.  */
  href: string,
  /** Set the size of the item's content.  */
  size?: 'small' | 'medium' | 'large',
  /** Component to be used to create the link in the global item. A default
  component is used if none is provided. */
  linkComponent?: () => ReactElement,
|}

export default class GlobalItem extends PureComponent {
  static defaultProps = {
    size: 'small',
    linkComponent: DefaultLinkComponent,
  };

  props: Props

  render() {
    const {
      href,
      linkComponent: Link,
      size,
    } = this.props;
    return (
      <Link href={href}>
        <GlobalItemInner size={size}>
          {this.props.children}
        </GlobalItemInner>
      </Link>
    );
  }
}
