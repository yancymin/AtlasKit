import React, { PureComponent } from 'react';
import Button from '@atlaskit/button';

export default class ButtonOptions extends PureComponent {
  state = {
    isSelected: false,
  }

  render() {
    return (
      <div>
        <Button
          isSelected={this.state.isSelected}
          onClick={() => this.setState({ isSelected: !this.state.isSelected })}
        >
          Toggle Selected
        </Button>
      </div>
    );
  }
}
