import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Blanket from '@atlaskit/blanket';

import ModalWrapper from '../styled/ModalWrapper';
import ModalPositioner from '../styled/ModalPositioner';
import ModalContainer from '../styled/ModalContainer';
import HeaderFooterWrapper from '../styled/HeaderFooterWrapper';
import ContentContainer from '../styled/ContentContainer';
import KeylineMask from '../styled/KeylineMask';

import { WIDTH_ENUM } from '../shared-variables';

export default class ModalDialog extends PureComponent {
  static propTypes = {
    /** Determines whether the modal should be shown or not. */
    isOpen: PropTypes.bool,
    /** Elements to render in the header of the modal. */
    header: PropTypes.node,
    /** Elements to render in the main body of the modal. */
    children: PropTypes.node,
    /** Elements to render in the footer of the moda.l */
    footer: PropTypes.node,
    /** Width of the modal. This can be provided in three different ways.
    If a number is provided, the width is set to that number in pixels.
    A string including pixels, or a percentage, will be directly applied as a style.
    Several size options are also recognised. */
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.oneOf(WIDTH_ENUM.values),
    ]),
    /** Function to be called when esc key is pressed, or a click occurs outside
    the modal. */
    onDialogDismissed: PropTypes.func,
  };

  static defaultProps = {
    isOpen: false,
    onDialogDismissed: () => {},
    width: WIDTH_ENUM.defaultValue,
  };

  state = {
    isAnimating: false,
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  // when the isOpen prop is changed, ModalPositioner will detect the change and trigger an
  // animation immediately, so we set isAnimating in state here.
  componentWillReceiveProps = (nextProps) => {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isAnimating: true });
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // If a custom width (number of percentage) is supplied, set inline style
  getCustomWidth = () => (
    WIDTH_ENUM.values.indexOf(this.props.width) === -1 ? (
      { style: { width: this.props.width } }
    ) : {}
  )

  // Helper function to guard the onDialogDismissed prop function. Saved doing the same isOpen
  // check in multiple places.
  dismissModal = (e) => {
    if (this.props.isOpen) {
      this.props.onDialogDismissed(e);
    }
  }

  // Once the ModalPositioner animation finishes, set isAnimating back to false.
  handleAnimationEnd = () => {
    this.setState({ isAnimating: false });
  }

  handleKeyDown = (e) => {
    const escapeKeyCode = 27;
    if (e.keyCode === escapeKeyCode) {
      this.dismissModal(e);
    }
  }

  // Detects click directly on the full-height modal container, to make sure that clicks in that
  // blanket region trigger onDialogDismissed as expected.
  handlePositionerDirectClick = (e) => {
    const { target } = e;
    if (target && target === this.modalPositionerRef) {
      this.dismissModal(e);
    }
  }

  render() {
    const { header, isOpen, children, footer, width } = this.props;

    const hasHeader = !!header;
    const hasFooter = !!footer;

    const optionalHeader = hasHeader ? (
      <HeaderFooterWrapper headerOrFooter="header">{header}</HeaderFooterWrapper>
    ) : null;

    const optionalFooter = hasFooter ? (
      <HeaderFooterWrapper headerOrFooter="footer">{footer}</HeaderFooterWrapper>
    ) : null;

    const headerKeylineMask = hasHeader ? (
      <KeylineMask headerOrFooter="header" />
    ) : null;

    const footerKeylineMask = hasFooter ? (
      <KeylineMask headerOrFooter="footer" />
    ) : null;

    return (
      <ModalWrapper isOpen={isOpen}>
        <Blanket canClickThrough={!isOpen} isTinted={isOpen} onBlanketClicked={this.dismissModal} />
        {
          this.state.isAnimating || isOpen ? (
            <ModalPositioner
              innerRef={(ref) => { this.modalPositionerRef = ref; }}
              isOpen={isOpen}
              width={width}
              {...this.getCustomWidth()}
              onAnimationEnd={this.handleAnimationEnd}
              onClick={this.handlePositionerDirectClick}
            >
              <ModalContainer>
                {optionalHeader}
                <ContentContainer hasHeader={hasHeader} hasFooter={hasFooter}>
                  {headerKeylineMask}
                  {children}
                  {footerKeylineMask}
                </ContentContainer>
                {optionalFooter}
              </ModalContainer>
            </ModalPositioner>
          ) : null
        }
      </ModalWrapper>
    );
  }
}
