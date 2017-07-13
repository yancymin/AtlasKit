import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';

import Badge from '@atlaskit/badge';

export default class OnValueUpdatedDemo extends PureComponent {
  constructor() {
    super();
    this.state = { value: 1 };
  }

  render() {
    return (
      <div>
        <Badge
          onValueUpdated={(detail) => {
            action(`onValueUpdated called with oldValue ${detail.oldValue}, newValue ${detail.newValue}`)();
            console.log('onValueUpdated called with:', detail);
          }}
          value={this.state.value}
        />
        <button
          onClick={() => this.setState({ value: this.state.value + 1 })}
        >Increment</button>
      </div>
    );
  }
}
