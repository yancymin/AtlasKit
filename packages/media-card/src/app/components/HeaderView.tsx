import * as React from 'react';
import Avatar from '@atlaskit/avatar';
import {AppCardUser} from '../model';
import {Wrapper, User, Title} from '../styled/HeaderView';

export interface HeaderProps {
  title: string;
  user?: AppCardUser;
  isInversed?: boolean;
  contentMaxWidth: number;
  hasSiblings: boolean;
}

export class HeaderView extends React.Component<HeaderProps, {}> {

  renderUser() {
    const {user} = this.props;
    if (!user) {
      return null;
    }
    return (
      <User>
        <Avatar src={user.icon.url} size="small" label={user.icon.label}/>
      </User>
    );
  }

  render() {
    const {title, isInversed, contentMaxWidth, hasSiblings} = this.props;
    return (
      <Wrapper contentMaxWidth={contentMaxWidth} hasSiblings={hasSiblings}>
        {this.renderUser()}
        <Title isInversed={isInversed}>{title}</Title>
      </Wrapper>
    );
  }

}
