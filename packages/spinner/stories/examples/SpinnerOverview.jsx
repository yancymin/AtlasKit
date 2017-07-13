import React from 'react';
import Spinner from '@atlaskit/spinner';

export default (
  <Spinner
    size="large"
    isCompleting={false}
    onComplete={console.log('Fade out animation complete')}
  />
);
