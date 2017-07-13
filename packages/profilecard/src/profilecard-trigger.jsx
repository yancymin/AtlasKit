import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import AkLayer from '@atlaskit/layer';

import { getAnimationClass } from './internal/helpers';
import PositionWrapper from './components/PositionWrapper';
import AkProfilecardResourced from './profilecard-resourced';

const allowedPositions = [
  'top left',
  'top right',
  'right top',
  'right bottom',
  'bottom right',
  'bottom left',
  'left bottom',
  'left top',
];

export default class ProfilecardTrigger extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    position: PropTypes.oneOf(allowedPositions),
    userId: PropTypes.string.isRequired,
    cloudId: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.func,
      label: PropTypes.string,
    })),
    resourceClient: PropTypes.shape({
      getProfile: PropTypes.func,
      getCachedProfile: PropTypes.func,
      makeRequest: PropTypes.func,
    }).isRequired,
    analytics: PropTypes.func,
  }

  static defaultProps = {
    position: 'top left',
    actions: [],
  }

  constructor(props) {
    super(props);

    this.showDelay = 500;
    this.hideDelay = 250;

    this.state = {
      visible: false,
      isFlipped: false,
    };
  }

  handleLayerFlipChange = ({ flipped }) => {
    this.setState({ isFlipped: flipped });
  }

  hideProfilecard = () => {
    clearTimeout(this.showTimer);

    this.hideTimer = setTimeout(() => {
      this.setState({ visible: false });
    }, this.hideDelay);
  }

  showProfilecard = () => {
    clearTimeout(this.hideTimer);

    this.showTimer = setTimeout(() => {
      this.setState({ visible: true });
    }, this.showDelay);
  }

  renderProfilecard() {
    const animationClass = getAnimationClass(
      this.props.position,
      this.state.isFlipped
    );

    return (
      <PositionWrapper
        position={this.props.position}
        isFlipped={this.state.isFlipped}
      >
        <div className={animationClass}>
          <AkProfilecardResourced
            userId={this.props.userId}
            cloudId={this.props.cloudId}
            resourceClient={this.props.resourceClient}
            actions={this.props.actions}
            analytics={this.props.analytics}
          />
        </div>
      </PositionWrapper>
    );
  }

  render() {
    return (
      <div
        style={{ display: 'inline-block' }}
        onMouseEnter={this.showProfilecard}
        onMouseLeave={this.hideProfilecard}
      >
        {
          this.state.visible ? <AkLayer
            autoFlip
            content={this.renderProfilecard()}
            offset="0 4"
            onFlippedChange={this.handleLayerFlipChange}
            position={this.props.position}
          >
            {this.props.children}
          </AkLayer> : this.props.children
        }
      </div>
    );
  }
}
