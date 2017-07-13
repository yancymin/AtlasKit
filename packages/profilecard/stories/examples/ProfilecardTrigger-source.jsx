import React from 'react';
import {
  AkProfilecardTrigger,
  AkProfilecardClient,
} from '@atlaskit/profilecard';

const profileClient = new AkProfilecardClient({
  url: 'https://profile-service/graphql',
});

export default (
  <AkProfilecardTrigger
    cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
    userId="638454:c8dddbde-3f65-4078-946e-8f9834a3c908"
    resourceClient={profileClient}
    actions={[
      {
        label: 'View profile',
        callback: () => {},
      },
    ]}
  >
    <strong>Hover Over Me</strong>
  </AkProfilecardTrigger>
);
