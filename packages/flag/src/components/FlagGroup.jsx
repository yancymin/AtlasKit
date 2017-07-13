import PropTypes from 'prop-types';
import React, { Children, cloneElement, PureComponent } from 'react';
import FlagAnimationWrapper from './FlagAnimationWrapper';
import Group, { SROnly, Inner } from '../styled/Group';

export default class FlagGroup extends PureComponent {
  static propTypes = {
    /** Flag elements to be displayed. */
    children: PropTypes.node,
    /** Handler which will be called when a Flag's dismiss button is clicked.
      * Receives the id of the dismissed Flag as a parameter.
      */
    onDismissed: PropTypes.func,
  };

  renderChildren = () => Children.map(this.props.children, (childFlag, flagIndex) => (
    <FlagAnimationWrapper key={childFlag.props.id || childFlag.props.key}>
      {cloneElement(childFlag, {
        onDismissed: this.props.onDismissed,
        isDismissAllowed: flagIndex === 0,
      })}
    </FlagAnimationWrapper>
  ))

  render() {
    return (
      <Group>
        <SROnly>Flag notifications</SROnly>
        <Inner component="div">
          {this.renderChildren()}
        </Inner>
      </Group>
    );
  }
}
