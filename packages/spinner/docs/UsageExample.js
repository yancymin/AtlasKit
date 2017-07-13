import React, { PureComponent } from 'react';
import Spinner from '@atlaskit/spinner';
import Button from '@atlaskit/button';

class StatefulSpinnerExample extends PureComponent {
  state = {
    isCompleting: false,
  }

  completeSpinner = () => this.setState({ isCompleting: !this.state.isCompleting })

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.completeSpinner}>Toggle Spinners</Button>
        </div>
        <Spinner
          size="xlarge"
          delay={3000}
          isCompleting={this.state.isCompleting}
        />
        <Spinner
          size="xlarge"
          isCompleting={this.state.isCompleting}
        />
      </div>
    );
  }
}

export default StatefulSpinnerExample;
