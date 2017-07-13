import React, { PureComponent } from 'react';
import { Tooltip } from '@atlaskit/tooltip';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';

export default class FourWayTooltip extends PureComponent {
  state = {
    showTooltip: false,
  }

  toggleTooltip = () => this.setState({ showTooltip: !this.state.showTooltip })

  render() {
    return (
      <ButtonGroup>
        <Tooltip
          description="Toggling Tooltip on click"
          position="right"
          onMouseOver={() => console.log('Mouse entered button')}
          onMouseOut={() => console.log('Mouse left button')}
        >
          <Button>I have mouseover handlers</Button>
        </Tooltip>
        <Tooltip
          description="Toggling Tooltip on click"
          position="right"
          visible={this.state.showTooltip}
        >
          <Button onClick={this.toggleTooltip}>Click to toggle tooltip</Button>
        </Tooltip>
      </ButtonGroup>
    );
  }
}
