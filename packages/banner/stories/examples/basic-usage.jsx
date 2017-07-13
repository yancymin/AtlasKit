import React from 'react';
import Banner from '@atlaskit/banner';
import WarningIcon from 'ak-icon/glyph/warning';

export default (
  <Banner
    icon={<WarningIcon label="Warning icon" />}
    isOpen
  >
    Your license is about to expire. Please renew your license within the next week.
  </Banner>
);
