import MentionResource from '../src/api/MentionResource';

export const mentionData = {
  id: 'ABCD-ABCD-ABCD',
  text: '@Oscar Wallhult'
};

const mentionResource = new MentionResource({
  url: 'dummyurl',
  securityProvider() {
    return {
      params: {},
      headers: {}
    };
  },
  shouldHighlightMention(mention) {
    return mention.id === 'oscar';
  }
});

export const mentionProvider = Promise.resolve(mentionResource);
