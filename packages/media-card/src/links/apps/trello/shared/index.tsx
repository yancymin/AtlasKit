import * as React from 'react';
import {Component} from 'react';
import {Wrapper, Avatar} from './styled';

export type MembersList = Array<{avatarUrl: string, username: string}>;

export interface MembersProps {
  members: MembersList;
  limit?: number;
}

export class MemberAvatars extends Component<MembersProps, {}> {
  static defaultProps = {
    limit: 3
  };

  render() {
    const {members} = this.props;
    // explicit cast required as tsc does not pickup on default props
    const limit = this.props.limit as number;

    const memberAvatars = members
      .slice(0, limit)
      .map((m, i) => {
        const offsetRight = i * 17 + 25;
        return <Avatar key={m.username} src={m.avatarUrl} style={{right: `${offsetRight}px`}}/>;
      });

    const additionalMembersCount = members.length - limit > 0 ? `+ ${members.length - limit}` : null;

    return (
      <Wrapper>
        {memberAvatars}
        {additionalMembersCount}
      </Wrapper>
    );
  }
}
