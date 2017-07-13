import React, { PureComponent } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Button from '@atlaskit/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';

const Icon = <WarningIcon label="Info icon" />;

const SingleFlag = props => (
  <Flag
    {...props}
    icon={Icon}
    id="flag-1"
    key="flag-1"
    title="The Internet seems to be full"
    description="Somebody forgot to upgrade the storage on the information superhighway."
  />
);

export default class FlagGroupExample extends PureComponent {
  state = {
    showFlag: false,
  }

  toggleFlag = () => {
    this.setState({ showFlag: !this.state.showFlag });
  }

  render() {
    return (
      <div>
        <FlagGroup onDismissed={this.toggleFlag}>
          {this.state.showFlag ? <SingleFlag /> : null}
        </FlagGroup>
        <Button onClick={this.toggleFlag}>Toggle Flag</Button>
      </div>
    );
  }
}
