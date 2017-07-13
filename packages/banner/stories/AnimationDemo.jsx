import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';
import PaddedDiv from './components/PaddedDiv';
import Banner from '../src';

// eslint-disable-next-line react/prefer-stateless-function
export default class AnimationDemo extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node,
  };

  state = {
    isOpen: true,
  };

  toggleBanner = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Banner
          icon={this.props.icon}
          isOpen={this.state.isOpen}
        >
          {this.props.children}
        </Banner>
        <PaddedDiv>
          <Button
            appearance="primary"
            onClick={this.toggleBanner}
          >Toggle banner</Button>
        </PaddedDiv>
      </div>
    );
  }
}
