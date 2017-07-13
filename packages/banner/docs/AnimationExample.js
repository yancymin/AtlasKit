import React, { PureComponent } from 'react';
import HelpIcon from '@atlaskit/icon/glyph/help';
import Banner from '@atlaskit/banner';
import Button from '@atlaskit/button';

const Icon = <HelpIcon label="Info icon" />;
export default class ToggleBanner extends PureComponent {
  state = {
    isOpen: true,
  };

  toggleBanner = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div>
        <Banner
          icon={Icon}
          isOpen={this.state.isOpen}
        >
          The opening and closing of the banner is animated
        </Banner>
        <div
          style={{
            'padding-top': '5px',
            'text-align': 'center',
          }}
        >
          <Button
            appearance="primary"
            onClick={this.toggleBanner}
          >
            Toggle banner
          </Button>
        </div>
      </div>
    );
  }
}
