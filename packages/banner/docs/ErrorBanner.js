import React from 'react';
import HelpIcon from '@atlaskit/icon/glyph/warning';
import Banner from '@atlaskit/banner';

const Icon = <HelpIcon label="Info icon" />;
const ErrorBanner = () => (
  <Banner
    icon={Icon}
    isOpen
    appearance="error"
  >
    This is an error banner
  </Banner>
);

export default ErrorBanner;
