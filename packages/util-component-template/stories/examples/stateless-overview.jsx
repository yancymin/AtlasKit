import React, { PureComponent } from 'react';
import { Toggle } from '@atlaskit/util-component-template';

class StatelessToggleWrapper extends PureComponent {
  state = { active: false }

  render() {
    return (
      <Toggle
        label="Power Station"
        onToggle={() => this.setState({ active: !this.state.active })}
        isActive={this.state.active}
      />
    );
  }
}

export default (<StatelessToggleWrapper />);
