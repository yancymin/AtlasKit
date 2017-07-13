import React, { PureComponent } from 'react';

// import the smart tooltip component
import AKTooltip from '../src/';

const positions = ['bottom', 'left', 'top', 'right'];

const buttonStyles = {
  backgroundColor: 'orange',
  padding: '5px',
};

/* eslint-disable react/no-unused-prop-types */
export default class FourWayTooltip extends PureComponent {
  constructor(props) {
    super(props);

    // we'll store the direction as an index and pull it from the list above, just to simplify the
    // `changeDirection` logic
    this.state = {
      position: 0,
    };
  }

  changeDirection = () => {
    this.setState({
      position: (this.state.position + 1) % positions.length,
    });
  }

  render() {
    const state = this.state;
    const position = positions[state.position];

    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    return (<div onClick={this.changeDirection}>
      <AKTooltip
        description={position}
        position={position}
      >
        <div style={buttonStyles}>Click Me!</div>
      </AKTooltip>
    </div>);
  }
}
/* eslint-enable react/no-unused-prop-types */

