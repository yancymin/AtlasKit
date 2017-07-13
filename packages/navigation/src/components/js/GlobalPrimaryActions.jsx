import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import GlobalItem from './GlobalItem';
import DrawerTrigger from './DrawerTrigger';
import DefaultLinkComponent from './DefaultLinkComponent';
import GlobalPrimaryActionsInner from '../styled/GlobalPrimaryActionsInner';
import GlobalPrimaryActionsPrimaryItem from '../styled/GlobalPrimaryActionsPrimaryItem';
import GlobalPrimaryActionsItemsWrapper from '../styled/GlobalPrimaryActionsItemsWrapper';

export default class GlobalPrimaryActions extends PureComponent {
  static propTypes = {
    createIcon: PropTypes.node,
    linkComponent: PropTypes.func,
    onCreateActivate: PropTypes.func,
    onSearchActivate: PropTypes.func,
    primaryIcon: PropTypes.node,
    primaryItemHref: PropTypes.string,
    searchIcon: PropTypes.node,
  };

  static defaultProps = {
    linkComponent: DefaultLinkComponent,
  }

  render() {
    const {
      createIcon,
      linkComponent,
      onCreateActivate,
      onSearchActivate,
      primaryIcon,
      primaryItemHref,
      searchIcon,
    } = this.props;
    return (
      <GlobalPrimaryActionsInner>
        {primaryIcon ?
          <GlobalPrimaryActionsPrimaryItem>
            <GlobalItem
              href={primaryItemHref}
              linkComponent={linkComponent}
              size="medium"
            >
              {primaryIcon}
            </GlobalItem>
          </GlobalPrimaryActionsPrimaryItem>
        : null}
        <GlobalPrimaryActionsItemsWrapper>
          {searchIcon ?
            <DrawerTrigger onActivate={onSearchActivate}>
              <GlobalItem size="medium">
                {searchIcon}
              </GlobalItem>
            </DrawerTrigger>
          : null}
          {createIcon ?
            <DrawerTrigger onActivate={onCreateActivate}>
              <GlobalItem size="medium">
                {createIcon}
              </GlobalItem>
            </DrawerTrigger>
          : null}
        </GlobalPrimaryActionsItemsWrapper>
      </GlobalPrimaryActionsInner>
    );
  }
}
