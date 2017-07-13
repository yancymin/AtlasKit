import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TabPaneDiv from '../styled/TabPane';

export default class TabPane extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
  }

  static defaultProps = {
    isSelected: false,
  }

  render() {
    return (
      <TabPaneDiv
        selected={this.props.isSelected}
        aria-hidden={this.props.isSelected ? 'false' : 'true'}
        role="tabpanel"
      >
        {this.props.children}
      </TabPaneDiv>
    );
  }
}
