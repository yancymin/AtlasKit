export interface TrelloList {
    readonly name: string;
    readonly count: number;
}

export interface TrelloMember {
    readonly username: string;
    readonly avatarUrl: string;
}

export interface TrelloBoardLinkApp {
    readonly type: 'trello_board';
    readonly name: string;
    readonly background: string;
    readonly shortUrl: string;
    readonly url: string;
    readonly lists: Array<TrelloList>;
    readonly member: Array<TrelloMember>;
}
