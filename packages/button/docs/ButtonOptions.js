import React from 'react';
import Button from '@atlaskit/button';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

const Icon = <AtlassianIcon label="Test icon" />;
const ButtonOptions = () => (
  <div>
    <Button iconBefore={Icon} >
      Icon Before
    </Button>
    <Button iconAfter={Icon} >
      Icon After
    </Button>
    <Button isDisabled >
      Disabled
    </Button>
    <Button spacing="compact">
      Compact
    </Button>
    <Button spacing="none">
      No Spacing
    </Button>
    <Button shouldFitContainer>
      Full Container Width
    </Button>
  </div>
);

export default ButtonOptions;
