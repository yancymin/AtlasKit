import { MentionDescription } from '../src/types';

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const resultCraig: MentionDescription[] = require('./_mention-search-result-craig.json') as MentionDescription[];
// tslint:disable-next-line:no-var-requires
export const resultC: MentionDescription[] = require('./_mention-search-result-c.json') as MentionDescription[];
