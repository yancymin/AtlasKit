import React from 'react';
import HelpIcon from '@atlaskit/icon/glyph/help';
import Banner from '@atlaskit/banner';

const Icon = <HelpIcon label="Info icon" />;
const WarningBanner = () => (
  <Banner
    icon={Icon}
    isOpen
  >
    This is a warning banner
  </Banner>

);

export default WarningBanner;
