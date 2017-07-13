import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import invariant from 'invariant';

const maxSecondaryItems = 4;

const checkIfTooManySecondaryActions = (actions = []) =>
  invariant(actions.length <= maxSecondaryItems,
    `cannot have more than ${maxSecondaryItems} secondary actions`);

export default class GlobalSecondaryActions extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.node).isRequired,
  }

  constructor(props, context) {
    super(props, context);
    checkIfTooManySecondaryActions(props.actions);
  }

  componentWillReceiveProps(nextProps) {
    checkIfTooManySecondaryActions(nextProps.actions);
  }

  render() {
    return (
      <div>
        {this.props.actions.map((action, index) => (
          <div key={index}>{action}</div>
        ))}
      </div>
    );
  }
}
