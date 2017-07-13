import React, { PureComponent } from 'react';
import Blanket from '@atlaskit/blanket';
import Button from '@atlaskit/button';

export default class ExampleBlanket extends PureComponent {
  state = {
    isOpen: false,
  }

  toggleBlanket = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        {this.state.isOpen ? (
          <Blanket
            isTinted
            onBlanketClicked={this.toggleBlanket}
          />
        ) : null}
        <Button onClick={this.toggleBlanket} >
          {this.state.isOpen
            ? 'Click anywhere on the Blanket to Close'
            : 'Click to open the blanket'
          }
        </Button>
      </div>
    );
  }
}
