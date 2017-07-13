import * as React from 'react';
import {Component} from 'react';
import AkBadge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import {
  Lists,
  Footer,
  Link,
  Header
} from './styled';
import {Wrapper, Details} from '../../../styled';
import {MediaImage} from '../../../../utils';
import {Href} from '../../../../utils/href';
import {MembersList, MemberAvatars} from '../shared';

export interface LinkCardTrelloBoardViewProps {
  linkUrl: string;
  title: string;

  thumbnailUrl?: string;
  iconUrl?: string;
  height?: number;
  width?: number;

  lists: Array<{name: string, count: number}>;
  members: MembersList;

  // TODO implement visual designs for loading state
  loading?: boolean;
  // TODO implement visual designs for error state
  error?: string;
}

export interface LinkCardTrelloBoardViewState {
}

export class LinkCardTrelloBoardView extends Component<LinkCardTrelloBoardViewProps, LinkCardTrelloBoardViewState> {
  static defaultProps = {
    width: 435,
    height: 116
  };

  private handleOpenBoardClick = () => {
    open(this.props.linkUrl, '_blank');
  }

  render() {
    const {linkUrl, title, thumbnailUrl, iconUrl} = this.props;
    const cardStyle = {height: `${this.props.height}px`, width: `${this.props.width}px`};
    const thumbnail = thumbnailUrl ? <MediaImage dataURI={thumbnailUrl} /> : null;
    const icon = iconUrl ? <img src={iconUrl} alt={title} /> : null;
    const lists = this.props.lists.slice(0, 3).map(l => (
      <li key={l.name}>{l.name} <AkBadge value={l.count} appearance="added"/></li>
    ));

    return (
      <Wrapper style={cardStyle}>
        {thumbnail}
        <Details className="details">
          <Header>
            <a href={this.props.linkUrl} target="_blank">{this.props.title}</a>
            <MemberAvatars members={this.props.members}/>
          </Header>
          <Lists>
            Lists: <ul>{lists}</ul>
          </Lists>
          <Footer>
            <Link>
              {icon}
              <Href linkUrl={linkUrl} underline={true}>
                Trello - Board
              </Href>
            </Link>
            <Button onClick={this.handleOpenBoardClick}>Open board</Button>
          </Footer>
        </Details>
      </Wrapper>
    );
  }
}

export default LinkCardTrelloBoardView;
