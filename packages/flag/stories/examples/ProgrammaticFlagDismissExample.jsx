import React, { PureComponent } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import Button from '@atlaskit/button';

export default class ProgrammaticFlagDismissExample extends PureComponent {
  state = {
    flags: [
      <Flag
        id="flag1"
        title="Can I leave yet?"
        description="Dismiss me by clicking the button on the page"
      />,
    ],
  };

  dismissFlag = () => {
    this.setState({ flags: [] });
  }

  render() {
    return (
      <div>
        <p style={{ padding: `${akGridSizeUnitless * 2}px` }}>
          <Button
            appearance="primary"
            onClick={this.dismissFlag}
          >Dismiss the Flag</Button>
        </p>
        <FlagGroup>
          {this.state.flags}
        </FlagGroup>
      </div>
    );
  }
}
