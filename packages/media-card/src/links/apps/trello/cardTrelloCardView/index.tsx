import * as React from 'react';
import { Component } from 'react';
import ClockIcon from '@atlaskit/icon/glyph/recent';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';
import {MembersList, MemberAvatars} from '../shared';
import {
    Lists,
    Header
} from './styled';
import {Details, Wrapper} from '../../../styled';
import {MediaImage} from '../../../../utils';

export type TrelloList = {
    name: string,
    count: number
};

export type TrelloCard = {
    name: string,
    url: string
};

export type TrelloBoard = {
    name: string,
    url: string
};

export interface LinkCardTrelloCardViewProps {
    linkUrl: string;
    thumbnailUrl?: string;
    iconUrl?: string;
    listName: string;
    card: TrelloCard;
    board: TrelloBoard;
    members: MembersList;
}

export interface LinkCardTrelloCardViewState {
}

export class LinkCardTrelloCardView extends Component<LinkCardTrelloCardViewProps, LinkCardTrelloCardViewState> {

    constructor(props: LinkCardTrelloCardViewProps) {
        super(props);
    }

    renderList(): JSX.Element {
        return (
            <div>
                <span>In list </span>
                <span>{this.props.listName} </span>
                <span>on </span>
                <span><a href={this.props.board.url}>{this.props.board.name}</a></span>
            </div>
        );
    }

    render(): JSX.Element {
        const { card, thumbnailUrl } = this.props;
        const cardStyle = { width: '435px', height: '116px' };

        return (
            <Wrapper style={cardStyle}>
                <MediaImage dataURI={thumbnailUrl || ''} />
                <Details className="details">
                    <Header>
                        <a href={card.url}>{card.name}</a>
                        <MemberAvatars members={this.props.members} />
                    </Header>
                    <Lists>
                        {this.renderList()}
                    </Lists>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ClockIcon
                                label="due"
                                size="small"
                            />
                            <span>Today</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <AttachmentIcon
                                label="attachments"
                                size="small"
                            />
                            <span>2</span>
                        </div>
                    </div>
                </Details>
            </Wrapper>
        );
    }
}

export default LinkCardTrelloCardView;
