import React, { PureComponent } from 'react';
import Avatar from '@atlaskit/avatar';

const Spacer = () => <span style={{ marginRight: 10 }} />;

export default class AvatarExample extends PureComponent {
  render() {
    return (
      <div>
        <Avatar
          src="https://design.atlassian.com/images/avatars/project-128.png"
          presence="online"
          size="large"
        />
        <Spacer />
        <Avatar
          src="https://design.atlassian.com/images/avatars/project-128.png"
          size="medium"
          presence="offline"
        />
        <Spacer />
        <Avatar
          src="https://design.atlassian.com/images/avatars/project-128.png"
          size="small"
        />
      </div>
    );
  }
}
