import { AbstractMentionResource } from '@atlaskit/editor-core';

export interface MentionSource {
  query(query: string): void;
  on(eventName: string, handler: (response: { query: string, results: Array<{ attributes: { username: string, display_name: string, avatar_url: string, is_teammate?: boolean } }> }) => void);
}

class MentionResource extends AbstractMentionResource {
  private config: any;
  private lastReturnedSearch: any;
  private mentionSource: MentionSource;

  constructor(config: any, mentionSource: MentionSource) {
    super();

    this.config = config;
    this.lastReturnedSearch = 0;
    this.mentionSource = mentionSource;
  }

  filter(query: string) {
    const notify = (mentions: any) => {
      this._notifyListeners(mentions);
    };

    const notifyInfo = (info: string) => {
      this._notifyInfoListeners(info);
    };

    const notifyErrors = (error: any) => {
      this._notifyErrorListeners(error);
    };

    if (this.mentionSource) {
      this.mentionSource.on('respond', (response) => {
        if (response.query !== query) {
          return;
        }

        if (!response.results.length) {
          if (query.length >= 3) {
            notifyInfo(`Found no matches for ${query}`); // TODO: i18n
          } else {
            notifyInfo('Continue typing to search for a user'); // TODO: 18n
          }
          notify({mentions: []});
        } else {
          const allMentions = response.results.map((item, index) => {
            return {
              'id': item.attributes.username,
              'name': item.attributes.display_name,
              'mentionName': item.attributes.username,
              'avatarUrl': item.attributes.avatar_url,
              'lozenge': item.attributes.is_teammate ? 'teammate' : null
            };
          }).sort((itemA, itemB) => itemA.name < itemB.name ? 0 : 1 ); // Sort by name

          // Display teammates first
          const mentions = [
            ...allMentions.filter(item => !!item.lozenge),
            ...allMentions.filter(item => !item.lozenge)
          ];

          notify({ mentions });
        }
      });

      if (query.length < 3) {
        notifyInfo('Continue typing to search for a user'); // TODO: i18n
      }

      this.mentionSource.query(query);
    } else {
      notifyErrors(new Error('No mentions source provided'));
    }
  }

  recordMentionSelection(mention: any) {
  }
}

export { MentionResource };
