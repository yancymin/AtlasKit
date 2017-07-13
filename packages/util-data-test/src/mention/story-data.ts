import MentionResource from './mock-mention-resource';

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
  shouldHighlightMention(mention) {
    return mention.id === '19';
  }
});

export const resourceProvider2 = new MentionResource({
  minWait: 10,
  maxWait: 25,
  shouldHighlightMention(mention) {
    return mention.id === '8';
  }
});
