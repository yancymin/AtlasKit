import React from 'react';
import Button from '@atlaskit/button';

const ButtonAppearance = () => (
  <div>
    <Button>
      Default
    </Button>
    <Button appearance="primary">
      Primary
    </Button>
    <Button appearance="link">
      Link
    </Button>
    <Button appearance="subtle" >
      Subtle
    </Button>
    <Button appearance="subtle-link" >
      Subtle link
    </Button>
  </div>
);

export default ButtonAppearance;
