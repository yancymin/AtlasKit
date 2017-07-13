import React from 'react';
import AkProfilecardResourced, { AkProfilecardClient } from '@atlaskit/profilecard';

const profileClient = new AkProfilecardClient({
  url: 'https://profile-service/graphql', // graphql service endpoint
  cacheSize: 10,
  cacheMaxeAge: 5000, // ms
});

export default (
  <AkProfilecardResourced
    cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
    userId="638454:c8dddbde-3f65-4078-946e-8f9834a3c908"
    resourceClient={profileClient}
    actions={[
      {
        label: 'View profile',
        id: 'view-profile',
        callback: () => {},
      },
    ]}
  />
);
