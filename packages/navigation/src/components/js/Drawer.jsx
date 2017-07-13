// @flow

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Blanket from '@atlaskit/blanket';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';
import ContainerHeader from './ContainerHeader';
import DrawerSide from '../styled/DrawerSide';
import DrawerInner from '../styled/DrawerInner';
import DrawerPrimaryIcon from '../styled/DrawerPrimaryIcon';
import DrawerMain from '../styled/DrawerMain';
import DrawerContent, { ContentArea } from '../styled/DrawerContent';
import DrawerBackIconWrapper from '../styled/DrawerBackIconWrapper';
import { WithRootTheme } from '../../theme/util';
import { container } from '../../theme/presets';

export default class Drawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    children: PropTypes.node,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    iconOffset: PropTypes.number,
    isFullWidth: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
    width: PropTypes.oneOf(['narrow', 'wide', 'full']),
  }
  static defaultProps = {
    iconOffset: 0,
    onBackButton: () => { },
    primaryIcon: null,
    width: 'narrow',
    isOpen: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation(); // Don't propagate lest one esc keystroke causes many views to close
      this.props.onBackButton(event);
    }
  }

  render() {
    const {
      backIcon,
      header,
      isOpen,
      onBackButton,
      primaryIcon,
      width,
      iconOffset,
      isFullWidth,
    } = this.props;

    const backIconWrapperStyle = {
      top: `${iconOffset}px`,
    };

    const sidebar = isOpen ? (
      <DrawerSide>
        <DrawerPrimaryIcon>
          {primaryIcon}
        </DrawerPrimaryIcon>
        <DrawerBackIconWrapper style={backIconWrapperStyle}>
          <DrawerTrigger onActivate={onBackButton}>
            <DrawerBackIcon isVisible={isOpen}>
              {backIcon}
            </DrawerBackIcon>
          </DrawerTrigger>
        </DrawerBackIconWrapper>
      </DrawerSide>
    ) : null;

    const content = isOpen ? (
      <DrawerMain>
        {(width !== 'full' && header) ?
          <ContainerHeader>{header}</ContainerHeader>
        : null}
        <DrawerContent>
          <ContentArea iconOffset={iconOffset} isFullWidth={isFullWidth} >
            {this.props.children}
          </ContentArea>
        </DrawerContent>
      </DrawerMain>
    ) : null;

    // Note: even though we are using WithRootTheme here, the Drawer appearance is not able
    // to be customised via a preset or custom theme.
    return (
      <WithRootTheme provided={container}>
        <div>
          <Blanket
            isTinted={isOpen}
            canClickThrough={!isOpen}
            onBlanketClicked={onBackButton}
          />
          <DrawerInner isOpen={isOpen} width={width}>
            {sidebar}
            {content}
          </DrawerInner>
        </div>
      </WithRootTheme>
    );
  }
}
