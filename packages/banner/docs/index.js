import React from 'react';

/* eslint-disable import/no-duplicates, import/first */
import WarningBanner from './WarningBanner';
import warningBannerSrc from '!raw-loader!./WarningBanner';
import ErrorBanner from './ErrorBanner';
import errorBannerSrc from '!raw-loader!./ErrorBanner';
import AnimationExample from './AnimationExample';
import animationExampleSrc from '!raw-loader!./AnimationExample';
/* eslint-enable import/no-duplicates, import/first */

export const description = (
  <div>
    <p>
      This banner component is designed to display a prominent message at the
      top of the page. It animates its opening and closing.
    </p>
  </div>
);

export const examples = [
  {
    title: 'Warning Usage',
    Component: WarningBanner,
    src: warningBannerSrc,
  },
  {
    title: 'Error Usage',
    Component: ErrorBanner,
    src: errorBannerSrc,
  },
  {
    title: 'Toggle Banner',
    Component: AnimationExample,
    src: animationExampleSrc,
  },
];
