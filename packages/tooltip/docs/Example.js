import React, { PureComponent } from 'react';
import StatefulToolTip from '@atlaskit/tooltip';
import Button from '@atlaskit/button';

const positions = ['bottom', 'left', 'top', 'right'];

export default class FourWayTooltip extends PureComponent {
  state = {
    position: 0,
  }

  changeDirection = () => {
    this.setState({
      position: (this.state.position + 1) % positions.length,
    });
  }

  render() {
    const position = positions[this.state.position];

    return (
      <StatefulToolTip
        description={position}
        position={position}
      >
        <Button onClick={this.changeDirection}>Click to toggle position</Button>
      </StatefulToolTip>
    );
  }
}
