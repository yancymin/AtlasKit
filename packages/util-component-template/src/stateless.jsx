import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Container } from './styled';

export default class Toggle extends PureComponent {
  static propTypes = {
    /** the label for the toggle */
    label: PropTypes.string,
    /** callback to run when toggled */
    onToggle: PropTypes.func,
    /** control boolean to pass in toggle state */
    isActive: PropTypes.bool,
  }

  static defaultProps = {
    onToggle: () => { },
    isActive: false,
  }

  render() {
    const { isActive, label, onToggle } = this.props;

    return (
      <Container
        isActive={isActive}
      >
        <Button
          onClick={onToggle}
        >
          {/* not great i18n: just illustrative */}
          {label ? `${label}: ` : ''}{isActive ? 'active' : 'not active'}
        </Button>
      </Container>
    );
  }
}
