import React from 'react';
import Flag from '@atlaskit/flag';
import WarningIcon from '@atlaskit/icon/glyph/warning';

const Icon = <WarningIcon label="Info icon" />;

const actions = [
  {
    content: 'Understood',
    onClick: () => console.log('understood'),
  },
  {
    content: 'No Way!',
    onClick: () => console.log('nope'),
  },
];

const FlagExample = () => (
  <Flag
    icon={Icon}
    actions={actions}
    id="flag-1"
    key="flag-1"
    title="The Internet seems to be full"
    description="Somebody forgot to upgrade the storage."
  />
);

export default FlagExample;
