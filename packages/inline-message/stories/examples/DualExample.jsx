import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import InlineMessage from '@atlaskit/inline-message';
import { types } from '../../src/components/types';

const exampleContent = (
  <div>
    <span style={{ display: 'block', fontWeight: 'bold', paddingBottom: 8 }}>Authenticate heading</span>
    <span>Authenticate <a href="">here</a> to see more information</span>
  </div>
);

export default class DualExample extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(types),
    title: PropTypes.string,
    secondaryText: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div style={{ paddingBottom: 32 }}>
        <h3>type = {this.props.type}</h3>
        <p>
          <InlineMessage
            type={this.props.type}
            title={this.props.title}
            secondaryText={this.props.secondaryText}
          >
            {exampleContent}
          </InlineMessage>
        </p>
        <p>
          <InlineMessage
            type={this.props.type}
            secondaryText={this.props.secondaryText}
          >
            {exampleContent}
          </InlineMessage>
        </p>
      </div>
    );
  }
}
