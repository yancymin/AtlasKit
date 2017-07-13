import React from 'react';

export const description = (
  <div>
    <p>
      This is the default export of the navigation package, and is the default
      way to use this pattern. The navigation component consumes a large number
      of props and takes care of rendering both the global navigation and the
      container navigation for you from the props provided.
    </p>
    <p>
      Navigation uses a mix of patterns on how internal components should be provided.
      The children are rendered in to the container navigation and should generally
      be a collection of AkNavigationItems. Other components that are provided
      are provided through a named prop for the purpose.
    </p>
    <p>
      The navigation component should be rendered next to your page component, which
      should hold all other content you wish to show. Navigation takes care of
      its own positioning and internal layout, without you needing to think about
      how to offset other components.
    </p>
  </div>
);

export const examples = [];

export const byline = 'Default export and main usage method.';
