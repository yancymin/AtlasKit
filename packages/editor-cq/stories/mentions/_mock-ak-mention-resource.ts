import { AbstractMentionResource } from '@atlaskit/mention';
import { Search } from 'js-search';
import mentionData from './_mention-data';

const search = new Search('id');
search.addIndex('name');
search.addIndex('mentionName');

search.addDocuments(mentionData.mentions);

class MentionResource extends AbstractMentionResource {

  private config: { minWait: number, maxWait: number, shouldHighlightMention?: (mention: any) => boolean };
  private lastReturnedSearch: number;

  constructor(config) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
  }

  shouldHighlightMention(mention: any) {
    if (this.config.shouldHighlightMention) {
      return this.config.shouldHighlightMention(mention);
    }

    return false;
  }

  filter(query: string) {
    const searchTime = Date.now();
    const notify = (mentions) => {
      if (searchTime >= this.lastReturnedSearch) {
        this.lastReturnedSearch = searchTime;
        this._notifyListeners(mentions);
      }
    };

    const notifyErrors = (error) => {
      this._notifyErrorListeners(error);
    };

    const minWait = this.config.minWait || 0;
    const randomTime = (this.config.maxWait || 0) - minWait;
    const waitTime = (Math.random() * randomTime) + minWait;
    setTimeout(() => {
      let mentions;
      if (query === 'error') {
        notifyErrors('mock-error');
        return;
      } else if (query) {
        mentions = search.search(query);
      } else {
        mentions = mentionData.mentions;
      }
      notify({
        mentions,
      });
    }, waitTime + 1);
  }

  recordMentionSelection(mention: any) {
  }
}

export default MentionResource;
