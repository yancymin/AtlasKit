import { Search } from 'js-search';
import { MentionSource } from '../src/mention-resource';
import mentionData from './_mention-data';

const search = new Search('id');
search.addIndex(['attributes', 'display_name']);
search.addIndex(['attributes', 'username']);
search.addDocuments(mentionData.results);

export class MockMentionSource implements MentionSource {
  handlers = {};

  query(query: string) {
    if (query && query.length >= 3) {
      const response = { query, results: search.search(query) } ;
      if (this.handlers['respond']) {
        this.handlers['respond'](response);
      }
    }
  }

  on(eventName: string, handler: Function) {
    this.handlers[eventName] = handler;
  }
}
