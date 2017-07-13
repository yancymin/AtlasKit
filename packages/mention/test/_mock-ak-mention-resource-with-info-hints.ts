import { Search } from 'js-search';

import { MentionDescription } from '../src/types';
import debug from '../src/util/logger';
import { AbstractMentionResource } from '../src/api/MentionResource';
import mentionData from './_mention-data';

const search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');
search.addIndex('nickname');

search.addDocuments(mentionData.mentions);

export interface MockMentionConfig {
  minWait?: number;
  maxWait?: number;
}

export default class MockMentionResourceWithInfoHints extends AbstractMentionResource {
  private config: MockMentionConfig;
  private lastReturnedSearch: number;

  constructor(config: MockMentionConfig) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
  }

  filter(query: string): void {
    debug('_mock-ak-mention-resource filter', query);
    const searchTime = Date.now();
    const notify = (mentions) => {
      if (searchTime >= this.lastReturnedSearch) {
        this.lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
      } else {
        const date = new Date(searchTime).toISOString().substr(17, 6);
        debug('Stale search result, skipping', date, query); // eslint-disable-line no-console, max-len
      }
    };
    const notifyInfo = (info) => {
      this._notifyInfoListeners(info);
    };

    const notifyErrors = (error) => {
      this._notifyErrorListeners(error);
    };

    const minWait = this.config.minWait || 0;
    const randomTime = (this.config.maxWait || 0) - minWait;
    const waitTime = (Math.random() * randomTime) + minWait;
    setTimeout(() => {
      let mentions = [];
      if (query === 'error') {
        notifyErrors('mock-error');
        return;
      } else if (query && query.length >= 3) {
        debug('_doing search', query);
        mentions = search.search(query);
        debug('_results', mentions.length);

        if (!mentions.length) {
          notifyInfo(`Found no matches for ${query}`);
        }
      } else {
        notifyInfo('Continue typing to search for a user');
      }
      notify({
        mentions,
      });
    }, waitTime + 1);
  }

  // eslint-disable-next-line class-methods-use-this
  recordMentionSelection(mention: MentionDescription): void {
    debug(`Record mention selection ${mention.id}`);
  }
}
