import { MentionDescription } from '@atlaskit/mention';

declare var require: {
    <T>(path: string): T;
};

export type MentionResult = {
    mentions: MentionDescription[];
};

// tslint:disable-next-line:no-var-requires
const mentionData: MentionResult = require('./mention-data.json') as MentionResult;

export const mentionDataSize = mentionData.mentions.length;

export default mentionData;
