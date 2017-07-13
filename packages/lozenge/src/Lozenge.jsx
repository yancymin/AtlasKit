import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Container from './styled/Container';
import Content from './styled/Content';

export const APPEARANCE_ENUM = {
  values: ['default', 'success', 'removed', 'inprogress', 'new', 'moved'],
  defaultValue: 'default',
};

export default class Lozenge extends PureComponent {
  static propTypes = {
    /** Determines whether to apply the bold style or not. */
    isBold: PropTypes.bool,
    /** The appearance type. */
    appearance: PropTypes.oneOf(APPEARANCE_ENUM.values),
    /** Elements to be rendered inside the lozenge. This should ideally be just
    a word or two. */
    children: PropTypes.node,
  };

  static defaultProps = {
    isBold: false,
    appearance: APPEARANCE_ENUM.defaultValue,
  };

  // returns the assigned appearance if valid, falling back to the default otherwise
  validAppearance() {
    const { appearance } = this.props;
    const { values, defaultValue } = APPEARANCE_ENUM;
    return values.indexOf(appearance) !== -1 ? appearance : defaultValue;
  }

  render() {
    const { isBold, children } = this.props;

    return (
      <Container appearance={this.validAppearance()} isBold={isBold}>
        <Content>
          {children}
        </Content>
      </Container>
    );
  }
}
