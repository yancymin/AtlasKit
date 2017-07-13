import React from 'react';
import Button from '@atlaskit/button';

import Spinner from '../src';

export default class SpinnerButton extends React.PureComponent {
  state = {
    isLoading: false,
    showSpinner: false,
  }

  fetchStuff = () => {
    this.setState({ isLoading: true, showSpinner: true });
    window.setTimeout(() => this.setState({ showSpinner: false }), 2000);
  }

  completeLoad = () => {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, showSpinner } = this.state;
    return (
      <Button
        appearance="primary"
        iconAfter={(
          <Spinner
            invertColor
            isCompleting={!showSpinner}
            onComplete={this.completeLoad}
          />
        )}
        isDisabled={isLoading}
        onClick={this.fetchStuff}
      >
        Load something
      </Button>
    );
  }
}
