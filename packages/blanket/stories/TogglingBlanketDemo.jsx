import React, { PureComponent } from 'react';
import Blanket from '../src';

export default class BlanketDemo extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      isBlanketVisible: false,
    };
  }

  render() {
    return (
      <div>
        Click the button to open the blanket. Click the blanket to dismiss it.
        <button onClick={() => this.setState({ isBlanketVisible: true })}>Show blanket</button>
        <Blanket
          onBlanketClicked={() => this.setState({ isBlanketVisible: false })}
          isTinted={this.state.isBlanketVisible}
          canClickThrough={!this.state.isBlanketVisible}
        />
      </div>
    );
  }
}
