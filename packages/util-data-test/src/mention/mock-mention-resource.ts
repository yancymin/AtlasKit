import { AbstractMentionResource, MentionDescription, SearchIndex } from '@atlaskit/mention';
import mentionData from './mention-data';

const search = new SearchIndex();

search.indexResults(mentionData.mentions);

class MentionResource extends AbstractMentionResource {

  private config: { minWait: number, maxWait: number, shouldHighlightMention?: (mention: any) => boolean };
  private lastReturnedSearch: number;
  private activeSearches: {};

  constructor(config) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
    this.activeSearches = {};
  }

  shouldHighlightMention(mention: any) {
    if (this.config.shouldHighlightMention) {
      return this.config.shouldHighlightMention(mention);
    }

    return false;
  }

  filter(query: string) {
    const searchTime = Date.now();
    if (query) {
      this.activeSearches[query] = true;
    }

    const notify = (mentions, query) => {
      if (searchTime >= this.lastReturnedSearch) {
        this.lastReturnedSearch = searchTime;
        this._notifyListeners({mentions, query});
      }

      this._notifyAllResultsListeners({mentions, query});
    };

    const notifyErrors = (error, query) => {
      this._notifyErrorListeners(error);
      delete this.activeSearches[query];
    };

    const minWait = this.config.minWait || 0;
    const randomTime = (this.config.maxWait || 0) - minWait;
    const waitTime = (Math.random() * randomTime) + minWait;
    setTimeout(() => {
      let mentions: MentionDescription[] | undefined;
      if (query === 'error') {
        notifyErrors('mock-error', query);
        return;
      } else if (query) {
        search.search(query).then(data => {
          notify(data.mentions, data.query);
          delete this.activeSearches[query];
        });
      } else {
        mentions = mentionData.mentions;
      }

      if (mentions) {
        notify(mentions, query);
      }

    }, waitTime + 1);
  }

  recordMentionSelection(mention: any) {
  }

  isFiltering(query: string) {
    return !!this.activeSearches[query];
  }
}

export default MentionResource;
