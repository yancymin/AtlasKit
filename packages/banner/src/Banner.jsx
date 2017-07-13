import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Container, Content, Icon, Text } from './styled';

export default class Banner extends PureComponent {
  static propTypes = {
    /** Visual style to be used for the banner */
    appearance: PropTypes.oneOf(['warning', 'error']),
    /** Content to be shown next to the icon. Typically text content but can contain links. */
    children: PropTypes.node,
    /** Icon to be shown left of the main content. Typically an AtlasKit icon (ak-icon) */
    icon: PropTypes.element,
    /** Defines whether the banner is shown. An animation is used when the value is changed. */
    isOpen: PropTypes.bool,
  };

  static defaultProps = {
    appearance: 'warning',
    isOpen: false,
  };

  render() {
    const { appearance, children, icon, isOpen } = this.props;

    return (
      <Container aria-hidden={!isOpen} isOpen={isOpen} role="alert">
        <Content appearance={appearance}>
          <Icon>{icon}</Icon>
          <Text>{children}</Text>
        </Content>
      </Container>
    );
  }
}
