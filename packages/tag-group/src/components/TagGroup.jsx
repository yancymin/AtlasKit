import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Container from '../styled/Container';

const ALIGNMENT = {
  values: ['start', 'end'],
  defaultValue: 'start',
};

export default class TagGroup extends PureComponent {
  static propTypes = {
    /** Whether the tags should be left-aligned or right-aligned. */
    alignment: PropTypes.oneOf(ALIGNMENT.values),
    /** Tags to render within the tag group. */
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    alignment: ALIGNMENT.defaultValue,
  }

  render() {
    const { alignment, children } = this.props;

    return (
      <Container justify={alignment}>
        {children}
      </Container>
    );
  }
}
