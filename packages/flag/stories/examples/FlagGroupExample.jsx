import React, { PureComponent } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';

class FlagGroupWrapper extends PureComponent {
  constructor() {
    super();
    this.state = {
      showFlag: true,
    };
  }

  flagDismissed = () => {
    this.setState({ showFlag: false });
  }

  render() {
    const flag = (
      <Flag
        id="1"
        title="FlagGroup Example: Test Flag"
        description="Dismiss me with the x. Reload the page to show me again"
      />
    );

    return (
      <FlagGroup onDismissed={this.flagDismissed}>
        {this.state.showFlag ? flag : null}
      </FlagGroup>
    );
  }
}

export default (
  <FlagGroupWrapper />
);
